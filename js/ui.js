// ============================================================
//  UI RENDERING
// ============================================================

let selectedItems = new Set();
let activeTab = 'cases';
let caseOpeningActive = false;

// ============================================================
//  SCREEN MANAGEMENT
// ============================================================
function showScreen(name) {
  document.getElementById('auth-screen').style.display = name==='auth' ? 'flex' : 'none';
  document.getElementById('game-screen').style.display = name==='game' ? 'flex' : 'none';
  if(name==='game') { updateMoneyDisplay(); checkDailyReward(); switchTab('cases'); }
}

function updateMoneyDisplay() {
  const el = document.getElementById('money-display');
  if(el) el.textContent = formatMoney(gameState.money);
  const us = document.getElementById('user-display');
  if(us && currentUser) us.textContent = currentUser.username;
}

// ============================================================
//  TAB SYSTEM
// ============================================================
function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab===tab));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id===tab+'-tab'));
  if(tab==='cases') renderCases();
  else if(tab==='inventory') renderInventory();
  else if(tab==='shop') renderShop();
  else if(tab==='upgrades') renderUpgrades();
  else if(tab==='leaderboard') renderLeaderboard();
  else if(tab==='slots') renderSlots();
  else if(tab==='crash') renderCrash();
  else if(tab==='plinko') renderPlinko();
}

// ============================================================
//  CASES
// ============================================================
function renderCases() {
  const grid = document.getElementById('cases-grid');
  if(!grid) return;
  grid.innerHTML = CASES.map(c => {
    const canAfford = gameState.money >= c.price;
    const items = c.items.slice(0,6).map(key => {
      if(!ALL_ITEMS[key]) return '';
      const r = getRarity(ALL_ITEMS[key].rarity);
      return `<div class="case-preview-item" title="${ALL_ITEMS[key].name}" style="border-color:${r.color}30">${generateSVG(ALL_ITEMS[key].type,ALL_ITEMS[key].rarity)}</div>`;
    }).join('');
    return `
    <div class="case-card${canAfford?'':' case-locked'}" onclick="openCaseModal('${c.id}')">
      <div class="case-icon-wrap">${getCaseIcon(c.id)}</div>
      <div class="case-info">
        <h3 class="case-name">${c.name}</h3>
        <p class="case-desc">${c.desc}</p>
        <div class="case-preview-items">${items}</div>
        <div class="case-price ${canAfford?'':'price-locked'}">${formatMoney(c.price)}</div>
      </div>
    </div>`;
  }).join('');
}

// ============================================================
//  CASE OPENING MODAL
// ============================================================
function openCaseModal(caseId) {
  if(caseOpeningActive) return;
  const caseData = CASES.find(c=>c.id===caseId);
  if(!caseData) return;
  playSound('buttonclicked');
  const modal = document.getElementById('case-modal');
  const modalContent = document.getElementById('case-modal-content');
  modalContent.innerHTML = `
    <div class="modal-case-header">
      <div class="modal-case-icon">${getCaseIcon(caseId)}</div>
      <div class="modal-case-info">
        <h2>${caseData.name}</h2>
        <p>${caseData.desc}</p>
        <p class="modal-case-price">${formatMoney(caseData.price)}</p>
      </div>
    </div>
    <div class="case-items-preview">
      ${caseData.items.map(key=>{
        const def=ALL_ITEMS[key]; if(!def) return '';
        const r=getRarity(def.rarity);
        return `<div class="case-item-preview" style="border-color:${r.color};box-shadow:0 0 12px ${r.glow}">
          <div class="cip-icon">${generateSVG(def.type,def.rarity)}</div>
          <div class="cip-name">${def.name}</div>
          <div class="cip-rarity" style="color:${r.color}">${r.label}</div>
          <div class="cip-price">${formatMoney(def.minPrice)}–${formatMoney(def.maxPrice)}</div>
        </div>`;
      }).join('')}
    </div>
    <div class="modal-actions">
      <button class="btn-primary btn-open" onclick="startCaseOpening('${caseId}')" ${gameState.money<caseData.price?'disabled':''}>
        ${gameState.money<caseData.price?'⛔ Insufficient Funds':'⬛ OPEN CASE'}
      </button>
      <button class="btn-secondary" onclick="closeCaseModal()">Cancel</button>
    </div>
  `;
  modal.classList.add('active');
}

function closeCaseModal() {
  if(caseOpeningActive) return;
  document.getElementById('case-modal').classList.remove('active');
}

async function startCaseOpening(caseId) {
  if(caseOpeningActive) return;
  const caseData = CASES.find(c=>c.id===caseId);
  if(!caseData || !spendMoney(caseData.price)) { showToast('Not enough money!','error'); return; }

  caseOpeningActive = true;
  gameState.stats.casesOpened++;
  gameState.stats.totalSpent += caseData.price;

  const result = openCase(caseId);
  if(!result) { caseOpeningActive=false; return; }

  const modal = document.getElementById('case-modal');
  const mc = document.getElementById('case-modal-content');
  mc.innerHTML = `
    <div class="case-opening-wrap">
      <div class="case-opening-track-wrap">
        <div class="case-track-pointer"></div>
        <div class="case-track" id="case-track"></div>
      </div>
      <div class="case-opening-footer">Opening ${caseData.name}...</div>
    </div>
  `;

  const track = document.getElementById('case-track');
  track.innerHTML = result.reel.map(item=>{
    const r=getRarity(item.rarity);
    return `<div class="case-track-item" style="border-color:${r.color};box-shadow:inset 0 0 20px ${r.glow}">
      <div class="cti-icon">${item.svg}</div>
      <div class="cti-name">${item.name}</div>
      <div class="cti-rarity" style="color:${r.color}">${r.label}</div>
    </div>`;
  }).join('');

  playSound('spin');

  // Calculate offset to center item #30 (winner)
  const ITEM_W = 160 + 12; // width + gap
  const visibleCenter = 360; // center of track wrap
  const winnerOffset = 30 * ITEM_W;
  const targetX = -(winnerOffset - visibleCenter + ITEM_W/2);

  await new Promise(r=>setTimeout(r,100));
  track.style.transition = 'transform 4s cubic-bezier(0.15,0.85,0.35,1)';
  track.style.transform = `translateX(${targetX}px)`;

  await new Promise(r=>setTimeout(r,4200));

  // Show win
  const winner = result.winner;
  const wr = getRarity(winner.rarity);
  const durColor = winner.durability>70?'#22c55e':winner.durability>30?'#fbbf24':'#ef4444';

  mc.innerHTML = `
    <div class="win-screen" style="--win-color:${wr.color};--win-glow:${wr.glow}">
      <div class="win-glow-bg"></div>
      <div class="win-rarity-label" style="color:${wr.color};text-shadow:0 0 20px ${wr.color}">${wr.label}</div>
      <div class="win-icon">${winner.svg}</div>
      <h2 class="win-name">${winner.name}</h2>
      <div class="win-value">${formatMoney(winner.value)}</div>
      <div class="win-durability">
        <span>Durability</span>
        <div class="dur-bar-wrap">
          <div class="dur-bar" style="width:${winner.durability}%;background:${durColor}"></div>
        </div>
        <span style="color:${durColor}">${winner.durability}%</span>
      </div>
      <div class="win-actions">
        <button class="btn-primary" onclick="keepWinItem()">Keep Item</button>
        <button class="btn-danger" onclick="sellWinItem()">Sell (${formatMoney(winner.value)})</button>
        <button class="btn-secondary" onclick="openCaseAgain('${caseId}')">Open Again</button>
      </div>
    </div>
  `;

  playSound('caseopened');
  window._winItem = winner;
  window._currentCaseId = caseId;
  caseOpeningActive = false;
  saveProfile();
}

async function keepWinItem() {
  await addItemToInventory(window._winItem);
  gameState.stats.totalEarned += window._winItem.value;
  saveProfile();
  closeCaseModal();
  if(activeTab==='inventory') renderInventory();
}

async function sellWinItem() {
  addMoney(window._winItem.value);
  gameState.stats.totalEarned += window._winItem.value;
  saveProfile();
  closeCaseModal();
}

function openCaseAgain(caseId) {
  const caseData = CASES.find(c=>c.id===caseId);
  if(!caseData) return;
  const mc = document.getElementById('case-modal-content');
  mc.innerHTML = '';
  openCaseModal(caseId);
  setTimeout(()=>startCaseOpening(caseId),300);
}

// ============================================================
//  INVENTORY
// ============================================================
function renderInventory() {
  selectedItems.clear();
  const grid = document.getElementById('inventory-grid');
  const sellBar = document.getElementById('sell-bar');
  if(!grid) return;

  if(!gameState.inventory.length) {
    grid.innerHTML = '<div class="empty-state">🎒 Your inventory is empty.<br>Open some cases to get started!</div>';
    if(sellBar) sellBar.style.display='none';
    return;
  }

  grid.innerHTML = gameState.inventory.map(item=>{
    const r=getRarity(item.rarity);
    const durColor=item.durability>70?'#22c55e':item.durability>30?'#fbbf24':'#ef4444';
    return `<div class="inv-item" id="inv-${item.id}" data-id="${item.id}" onclick="toggleSelectItem('${item.id}')" style="border-color:${r.color}40">
      <div class="inv-item-icon" style="box-shadow:0 0 20px ${r.glow}">${item.svg}</div>
      <div class="inv-item-info">
        <div class="inv-item-name">${item.name}</div>
        <div class="inv-item-rarity" style="color:${r.color}">${r.label}</div>
        <div class="inv-item-value">${formatMoney(item.value)}</div>
        <div class="inv-dur-bar-wrap">
          <div class="inv-dur-bar" style="width:${item.durability}%;background:${durColor}"></div>
        </div>
      </div>
    </div>`;
  }).join('');

  if(sellBar) sellBar.style.display='none';
}

function toggleSelectItem(id) {
  playSound('itemselected');
  const el = document.getElementById('inv-'+id);
  if(selectedItems.has(id)) { selectedItems.delete(id); el?.classList.remove('selected'); }
  else { selectedItems.add(id); el?.classList.add('selected'); }
  updateSellBar();
}

function selectAllItems() {
  gameState.inventory.forEach(item=>{
    selectedItems.add(item.id);
    document.getElementById('inv-'+item.id)?.classList.add('selected');
  });
  updateSellBar();
}

function updateSellBar() {
  const sellBar = document.getElementById('sell-bar');
  if(!sellBar) return;
  if(selectedItems.size===0) { sellBar.style.display='none'; return; }
  const total = gameState.inventory.filter(i=>selectedItems.has(i.id)).reduce((s,i)=>s+i.value,0);
  sellBar.style.display='flex';
  document.getElementById('sell-count').textContent = selectedItems.size;
  document.getElementById('sell-total').textContent = formatMoney(total);
}

async function sellSelectedItems() {
  if(!selectedItems.size) return;
  const total = gameState.inventory.filter(i=>selectedItems.has(i.id)).reduce((s,i)=>s+i.value,0);
  const ids = [...selectedItems];
  await removeItemsFromInventory(ids);
  addMoney(total);
  gameState.stats.totalEarned += total;
  saveProfile();
  selectedItems.clear();
  renderInventory();
  showToast(`💰 Sold ${ids.length} item(s) for ${formatMoney(total)}`, 'success');
  playSound('itemssold');
}

// ============================================================
//  SHOP
// ============================================================
function renderShop() {
  if(!loadShopFromStorage()) generateShop();
  const grid = document.getElementById('shop-grid');
  if(!grid) return;
  const now = Date.now();
  const timeLeft = Math.max(0, shopExpiry - now);
  const hours = Math.floor(timeLeft/3600000);
  const mins = Math.floor((timeLeft%3600000)/60000);
  document.getElementById('shop-timer').textContent = `Refreshes in: ${hours}h ${mins}m`;

  grid.innerHTML = shopItems.map((item,i)=>{
    const r=getRarity(item.rarity);
    const canAfford = gameState.money >= item.price;
    return `<div class="shop-item" style="border-color:${r.color}40;box-shadow:0 0 20px ${r.glow}">
      <div class="shop-item-icon">${item.svg}</div>
      <div class="shop-item-info">
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-rarity" style="color:${r.color}">${r.label}</div>
      </div>
      <div class="shop-item-price">${formatMoney(item.price)}</div>
      <button class="btn-shop-buy${canAfford?'':' disabled'}" onclick="buyShopItem(${i})" ${canAfford?'':'disabled'}>BUY</button>
    </div>`;
  }).join('');
}

// ============================================================
//  UPGRADES
// ============================================================
function renderUpgrades() {
  const grid = document.getElementById('craft-grid');
  if(!grid) return;
  grid.innerHTML = craftSlots.map((item,i)=>{
    if(!item) return `<div class="craft-slot empty" onclick="openCraftItemPicker(${i})"><span>+</span></div>`;
    const r=getRarity(item.rarity);
    return `<div class="craft-slot filled" style="border-color:${r.color}">
      <div class="craft-slot-icon">${item.svg}</div>
      <button class="craft-remove" onclick="removeCraftItem(${i},event)">×</button>
    </div>`;
  }).join('');

  const rate = getCraftSuccessRate();
  const rateEl = document.getElementById('craft-rate');
  if(rateEl) { rateEl.textContent = `Success Rate: ${rate}%`; rateEl.style.color = rate>50?'#22c55e':rate>25?'#fbbf24':'#ef4444'; }
}

function removeCraftItem(slotIdx, e) {
  e.stopPropagation();
  craftSlots[slotIdx] = null;
  renderUpgrades();
}

function openCraftItemPicker(slotIdx) {
  const picker = document.getElementById('craft-picker');
  const list = document.getElementById('craft-picker-list');
  if(!picker||!list) return;
  list.innerHTML = gameState.inventory.filter(item=>!craftSlots.includes(item)).map(item=>{
    const r=getRarity(item.rarity);
    return `<div class="picker-item" onclick="placeCraftItem(${slotIdx},'${item.id}')">
      <div class="picker-icon">${item.svg}</div>
      <div>
        <div class="picker-name">${item.name}</div>
        <div class="picker-rarity" style="color:${r.color}">${r.label}</div>
      </div>
      <div class="picker-val">${formatMoney(item.value)}</div>
    </div>`;
  }).join('') || '<div class="empty-state">No items available</div>';
  picker.classList.add('active');
}

function placeCraftItem(slotIdx, itemId) {
  const item = gameState.inventory.find(i=>i.id===itemId);
  if(item) { craftSlots[slotIdx]=item; }
  document.getElementById('craft-picker')?.classList.remove('active');
  renderUpgrades();
}

// ============================================================
//  LEADERBOARD
// ============================================================
let lbSort = 'inventory_value';
function renderLeaderboard() { loadLeaderboard(lbSort); }

// ============================================================
//  SLOTS
// ============================================================
function renderSlots() {
  const initial = [SLOT_SYMBOLS[4],SLOT_SYMBOLS[5],SLOT_SYMBOLS[2]];
  renderSlotsReels(initial);
}

// ============================================================
//  CRASH
// ============================================================
function renderCrash() {
  const el = document.getElementById('crash-multiplier');
  if(el) { el.textContent = '1.00x'; el.style.color = '#22c55e'; }
  const cashoutBtn = document.getElementById('crash-cashout');
  const startBtn = document.getElementById('crash-start');
  if(cashoutBtn) cashoutBtn.disabled = true;
  if(startBtn) startBtn.disabled = false;
}

// ============================================================
//  PLINKO
// ============================================================
function renderPlinko() {
  const canvas = document.getElementById('plinko-canvas');
  if (!canvas) return;
  drawPlinkoBoard(canvas); // uses physics engine from minigames.js
}

// ============================================================
//  STATS MODAL
// ============================================================
function showStatsModal() {
  const modal = document.getElementById('stats-modal');
  const invValue = gameState.inventory.reduce((s,i)=>s+i.value,0);
  document.getElementById('stat-cases').textContent = gameState.stats.casesOpened;
  document.getElementById('stat-slots').textContent = gameState.stats.slotsSpun;
  document.getElementById('stat-plinko').textContent = gameState.stats.bestPlinkoMultiplier.toFixed(2)+'x';
  document.getElementById('stat-crash').textContent = gameState.stats.bestCrashMultiplier.toFixed(2)+'x';
  document.getElementById('stat-spent').textContent = formatMoney(gameState.stats.totalSpent);
  document.getElementById('stat-earned').textContent = formatMoney(gameState.stats.totalEarned);
  document.getElementById('stat-streak').textContent = gameState.stats.dailyStreak + ' days';
  document.getElementById('stat-inv').textContent = formatMoney(invValue);
  document.getElementById('stat-bestitem').textContent = gameState.stats.bestItemName ? `${gameState.stats.bestItemName} (${formatMoney(gameState.stats.bestItemValue)})` : 'None yet';
  modal.classList.add('active');
}

// ============================================================
//  TOAST
// ============================================================
function showToast(msg, type='info') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  document.getElementById('toasts').appendChild(t);
  setTimeout(()=>t.classList.add('show'),10);
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),400); },3500);
}
