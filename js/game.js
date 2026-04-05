// ============================================================
//  GAME STATE & SUPABASE INTEGRATION
// ============================================================

let sbClient = null;  // renamed from 'supabase' to avoid collision with Supabase CDN global
let currentUser = null;
let gameState = {
  money: STARTING_MONEY,
  inventory: [],
  stats: {
    casesOpened: 0,
    slotsSpun: 0,
    totalSpent: 0,
    totalEarned: 0,
    dailyStreak: 0,
    lastDailyClaim: null,
    bestItemName: null,
    bestItemValue: 0,
    bestCrashMultiplier: 0,
    bestPlinkoMultiplier: 0,
  }
};

// ============================================================
//  INIT SUPABASE
// ============================================================
function initSupabase() {
  if(SUPABASE_URL === "YOUR_SUPABASE_PROJECT_URL" || SUPABASE_ANON === "YOUR_SUPABASE_ANON_KEY") {
    console.warn("⚠️ Supabase keys not set — running in LOCAL ONLY mode.");
    return false;
  }
  try {
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    return true;
  } catch(e) {
    console.error("Supabase init failed:", e);
    return false;
  }
}

// ============================================================
//  AUTH
// ============================================================
async function signUp(username, password) {
  if(!sbClient) return { error: { message: 'Supabase not configured. Edit config.js first.' }};
  const email = username + "@minecraftcases.game";
  const { data, error } = await sbClient.auth.signUp({
    email, password,
    options: { data: { username } }
  });
  if(!error && data.user) {
    // Update profile with username
    await sbClient.from('profiles').upsert({ id: data.user.id, username, money: STARTING_MONEY });
  }
  return { data, error };
}

async function signIn(username, password) {
  if(!sbClient) {
    // Local mode: just set a fake user
    currentUser = { id: 'local', username };
    loadLocalState();
    return { error: null };
  }
  const email = username + "@minecraftcases.game";
  const { data, error } = await sbClient.auth.signInWithPassword({ email, password });
  if(!error && data.user) {
    currentUser = { ...data.user, username };
    await loadProfile();
  }
  return { data, error };
}

async function signOut() {
  if(sbClient) await sbClient.auth.signOut();
  currentUser = null;
  gameState = { money: STARTING_MONEY, inventory: [], stats: { casesOpened:0, slotsSpun:0, totalSpent:0, totalEarned:0, dailyStreak:0, lastDailyClaim:null, bestItemName:null, bestItemValue:0, bestCrashMultiplier:0, bestPlinkoMultiplier:0 } };
  showScreen('auth');
}

// ============================================================
//  PROFILE LOAD / SAVE
// ============================================================
async function loadProfile() {
  if(!sbClient || !currentUser) { loadLocalState(); return; }
  try {
    const { data: profile } = await sbClient.from('profiles').select('*').eq('id', currentUser.id).single();
    if(profile) {
      currentUser.username = profile.username;
      gameState.money = parseFloat(profile.money) || STARTING_MONEY;
      gameState.stats = {
        casesOpened: profile.cases_opened || 0,
        slotsSpun: profile.slots_spun || 0,
        totalSpent: parseFloat(profile.total_spent) || 0,
        totalEarned: parseFloat(profile.total_earned) || 0,
        dailyStreak: profile.daily_streak || 0,
        lastDailyClaim: profile.last_daily_claim || null,
        bestItemName: profile.best_item_name || null,
        bestItemValue: parseFloat(profile.best_item_value) || 0,
        bestCrashMultiplier: parseFloat(profile.best_crash_multiplier) || 0,
        bestPlinkoMultiplier: parseFloat(profile.best_plinko_multiplier) || 0,
      };
    }
    // Load inventory
    const { data: inv } = await sbClient.from('inventory').select('*').eq('user_id', currentUser.id);
    gameState.inventory = (inv || []).map(row => ({
      id: row.id,
      key: row.item_key,
      name: row.item_name,
      rarity: row.rarity,
      type: row.item_type,
      value: parseFloat(row.value),
      durability: row.durability,
      svg: generateSVG(row.item_type, row.rarity),
    }));
  } catch(e) { console.error('Load profile error:', e); loadLocalState(); }
}

async function saveProfile() {
  saveLocalState();
  if(!sbClient || !currentUser || currentUser.id === 'local') return;
  try {
    await sbClient.from('profiles').upsert({
      id: currentUser.id,
      username: currentUser.username,
      money: gameState.money,
      cases_opened: gameState.stats.casesOpened,
      slots_spun: gameState.stats.slotsSpun,
      total_spent: gameState.stats.totalSpent,
      total_earned: gameState.stats.totalEarned,
      daily_streak: gameState.stats.dailyStreak,
      last_daily_claim: gameState.stats.lastDailyClaim,
      best_item_name: gameState.stats.bestItemName,
      best_item_value: gameState.stats.bestItemValue,
      best_crash_multiplier: gameState.stats.bestCrashMultiplier,
      best_plinko_multiplier: gameState.stats.bestPlinkoMultiplier,
    });
  } catch(e) { console.error('Save profile error:', e); }
}

async function addItemToInventory(item) {
  gameState.inventory.push(item);
  if(item.value > gameState.stats.bestItemValue) {
    gameState.stats.bestItemValue = item.value;
    gameState.stats.bestItemName = item.name;
  }
  if(sbClient && currentUser && currentUser.id !== 'local') {
    try {
      await sbClient.from('inventory').insert({
        id: item.id,
        user_id: currentUser.id,
        item_key: item.key,
        item_name: item.name,
        rarity: item.rarity,
        item_type: item.type,
        value: item.value,
        durability: item.durability,
      });
    } catch(e) { console.error('Add item error:', e); }
  }
}

async function removeItemsFromInventory(ids) {
  gameState.inventory = gameState.inventory.filter(i => !ids.includes(i.id));
  if(sbClient && currentUser && currentUser.id !== 'local') {
    try {
      await sbClient.from('inventory').delete().in('id', ids);
    } catch(e) { console.error('Remove items error:', e); }
  }
}

// ============================================================
//  LOCAL STORAGE FALLBACK
// ============================================================
function saveLocalState() {
  try {
    localStorage.setItem('mc_state', JSON.stringify({ money: gameState.money, inventory: gameState.inventory, stats: gameState.stats }));
  } catch(e) {}
}
function loadLocalState() {
  try {
    const s = localStorage.getItem('mc_state');
    if(s) {
      const d = JSON.parse(s);
      gameState.money = d.money ?? STARTING_MONEY;
      gameState.inventory = (d.inventory || []).map(item => ({ ...item, svg: generateSVG(item.type, item.rarity) }));
      gameState.stats = { ...gameState.stats, ...(d.stats || {}) };
    }
  } catch(e) {}
}

// ============================================================
//  MONEY HELPERS
// ============================================================
function formatMoney(n) {
  if(n >= 1e9) return '$' + (n/1e9).toFixed(2) + 'B';
  if(n >= 1e6) return '$' + (n/1e6).toFixed(2) + 'M';
  if(n >= 1e3) return '$' + (n/1e3).toFixed(1) + 'K';
  return '$' + Math.floor(n).toLocaleString();
}

function addMoney(amount) {
  gameState.money = Math.max(0, gameState.money + amount);
  updateMoneyDisplay();
  saveProfile();
}

function spendMoney(amount) {
  if(gameState.money < amount) return false;
  gameState.money -= amount;
  gameState.stats.totalSpent += amount;
  updateMoneyDisplay();
  return true;
}

// ============================================================
//  DAILY REWARD
// ============================================================
function checkDailyReward() {
  const today = new Date().toDateString();
  const last = gameState.stats.lastDailyClaim;
  const canClaim = !last || new Date(last).toDateString() !== today;
  const btn = document.getElementById('daily-btn');
  if(btn) {
    btn.style.display = canClaim ? 'flex' : 'none';
    if(canClaim) {
      btn.querySelector('.daily-reward-amt').textContent = formatMoney(gameState.stats.dailyStreak * 100 + 100);
    }
  }
}

function claimDailyReward() {
  const today = new Date().toDateString();
  if(gameState.stats.lastDailyClaim && new Date(gameState.stats.lastDailyClaim).toDateString() === today) return;
  const reward = (gameState.stats.dailyStreak + 1) * 100;
  gameState.stats.dailyStreak++;
  gameState.stats.lastDailyClaim = today;
  addMoney(reward);
  gameState.stats.totalEarned += reward;
  checkDailyReward();
  saveProfile();
  showToast(`🎁 Daily Reward! +${formatMoney(reward)} (Streak: ${gameState.stats.dailyStreak})`, 'success');
  playSound('buttonclicked');
}

// ============================================================
//  LEADERBOARD
// ============================================================
async function loadLeaderboard(sortBy = 'inventory_value') {
  const board = document.getElementById('leaderboard-list');
  if(!board) return;
  board.innerHTML = '<div class="lb-loading">Loading...</div>';

  let rows = [];
  if(sbClient) {
    try {
      const { data } = await sbClient.from('leaderboard').select('*');
      if(data) rows = data;
    } catch(e) {}
  }

  if(rows.length === 0) {
    // Local demo
    rows = [{ username: currentUser?.username || 'You', money: gameState.money, inventory_value: gameState.inventory.reduce((s,i)=>s+i.value,0), cases_opened: gameState.stats.casesOpened }];
  }

  rows.sort((a,b) => {
    if(sortBy === 'money') return b.money - a.money;
    if(sortBy === 'cases_opened') return b.cases_opened - a.cases_opened;
    return (b.inventory_value||0) - (a.inventory_value||0);
  });

  board.innerHTML = rows.slice(0,10).map((row,i) => {
    const val = sortBy === 'money' ? formatMoney(row.money) :
                sortBy === 'cases_opened' ? row.cases_opened + ' cases' :
                formatMoney(row.inventory_value||0);
    const isMe = row.username === currentUser?.username;
    const medal = i===0?'🥇':i===1?'🥈':i===2?'🥉':'';
    return `<div class="lb-row${isMe?' lb-me':''} rank-${i+1}">
      <span class="lb-rank">${medal||('#'+(i+1))}</span>
      <span class="lb-name">${row.username}</span>
      <span class="lb-val">${val}</span>
    </div>`;
  }).join('');
}

// ============================================================
//  SHOP SYSTEM
// ============================================================
let shopItems = [];
let shopExpiry = 0;

function generateShop() {
  const now = Date.now();
  if(now < shopExpiry && shopItems.length) return;
  shopItems = [];
  const eligibleKeys = Object.keys(ALL_ITEMS).filter(k => ALL_ITEMS[k].rarity >= 2);
  const shuffled = eligibleKeys.sort(() => Math.random()-0.5).slice(0,8);
  shopItems = shuffled.map(key => {
    const def = ALL_ITEMS[key];
    return {
      key, name: def.name, rarity: def.rarity, type: def.type,
      price: Math.round(def.maxPrice * 1.5),
      maxPrice: def.maxPrice,
      svg: generateSVG(def.type, def.rarity),
    };
  });
  shopExpiry = now + 24*60*60*1000;
  localStorage.setItem('mc_shop', JSON.stringify({ items: shopItems, expiry: shopExpiry }));
}

function loadShopFromStorage() {
  try {
    const s = localStorage.getItem('mc_shop');
    if(s) { const d = JSON.parse(s); if(d.expiry > Date.now()) { shopItems = d.items; shopExpiry = d.expiry; return true; } }
  } catch(e) {}
  return false;
}

function buyShopItem(idx) {
  const item = shopItems[idx];
  if(!item) return;
  if(!spendMoney(item.price)) { showToast('Not enough money!', 'error'); return; }
  const newItem = { ...generateItem(item.key), durability: 100, value: item.maxPrice };
  newItem.svg = generateSVG(newItem.type, newItem.rarity);
  addItemToInventory(newItem);
  gameState.stats.totalEarned += newItem.value;
  saveProfile();
  renderShop();
  renderInventory();
  showToast(`✅ Bought ${item.name}!`, 'success');
  playSound('buttonclicked');
}

// ============================================================
//  UPGRADES SYSTEM
// ============================================================
let craftSlots = new Array(9).fill(null);

function getCraftSuccessRate() {
  const filled = craftSlots.filter(Boolean);
  if(!filled.length) return 0;
  const avgRarity = filled.reduce((s,i)=>s+i.rarity,0) / filled.length;
  const rate = 70 - (avgRarity * 10) - (filled.length * 2);
  return Math.max(10, Math.min(90, Math.round(rate)));
}

async function attemptUpgrade() {
  const filled = craftSlots.filter(Boolean);
  if(filled.length === 0) { showToast('Add items to the crafting grid!', 'error'); return; }
  const rate = getCraftSuccessRate();
  const success = Math.random() * 100 < rate;
  const avgRarity = filled.reduce((s,i)=>s+i.rarity,0) / filled.length;
  const ids = filled.map(i=>i.id);
  await removeItemsFromInventory(ids);
  craftSlots = new Array(9).fill(null);
  if(success) {
    const newRarity = Math.min(6, Math.ceil(avgRarity) + 1);
    const eligibleKeys = Object.keys(ALL_ITEMS).filter(k => ALL_ITEMS[k].rarity === newRarity);
    const key = eligibleKeys.length ? eligibleKeys[Math.floor(Math.random()*eligibleKeys.length)] : Object.keys(ALL_ITEMS)[0];
    const newItem = generateItem(key);
    newItem.svg = generateSVG(newItem.type, newItem.rarity);
    await addItemToInventory(newItem);
    gameState.stats.totalEarned += newItem.value;
    saveProfile();
    showToast(`✨ Upgrade SUCCESS! Got ${newItem.name}!`, 'success');
    playSound('caseopened');
  } else {
    showToast('💥 Upgrade FAILED! Items destroyed.', 'error');
    playSound('itemssold');
  }
  renderUpgrades();
  renderInventory();
}

// ============================================================
//  SOUND SYSTEM
// ============================================================
const sounds = {};
const SOUND_FILES = ['spin','caseopened','buttonclicked','itemselected','itemssold'];
function loadSounds() {
  SOUND_FILES.forEach(name => {
    try {
      sounds[name] = new Audio(`media/${name}.webm`);
      sounds[name].preload = 'auto';
    } catch(e) {}
  });
}
function playSound(name) {
  try {
    const s = sounds[name];
    if(s) { s.currentTime = 0; s.play().catch(()=>{}); }
  } catch(e) {}
}

// ============================================================
//  CONSOLE COMMANDS
// ============================================================
window.giveMoney = function(amount) {
  addMoney(amount);
  console.log(`💰 Added ${formatMoney(amount)}. Total: ${formatMoney(gameState.money)}`);
};
window.setMoney = function(amount) {
  gameState.money = amount;
  updateMoneyDisplay();
  saveProfile();
  console.log(`💰 Money set to ${formatMoney(amount)}`);
};
window.resetProgress = function() {
  if(confirm('Reset ALL progress? This cannot be undone!')) {
    localStorage.clear();
    if(sbClient && currentUser && currentUser.id !== 'local') {
      sbClient.from('inventory').delete().eq('user_id', currentUser.id);
      sbClient.from('profiles').update({ money: STARTING_MONEY, cases_opened:0, slots_spun:0, total_spent:0, total_earned:0, daily_streak:0, last_daily_claim:null, best_item_name:null, best_item_value:0 }).eq('id', currentUser.id);
    }
    location.reload();
  }
};
