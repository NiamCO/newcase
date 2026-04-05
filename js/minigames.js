// ============================================================
//  MINI GAMES: SLOTS, CRASH, PLINKO
// ============================================================

// ============================================================
//  SLOTS
// ============================================================
const SLOT_SYMBOLS = [
  { key:'coal',   rarity:0, color:'#6b7280', mult:1.2  },
  { key:'iron',   rarity:0, color:'#9ca3af', mult:1.5  },
  { key:'gold_ingot', rarity:1, color:'#fbbf24', mult:2 },
  { key:'redstone',   rarity:1, color:'#ef4444', mult:2.5 },
  { key:'diamond',    rarity:2, color:'#3b82f6', mult:5  },
  { key:'emerald',    rarity:2, color:'#22c55e', mult:6  },
  { key:'amethyst',   rarity:3, color:'#a855f7', mult:10 },
  { key:'ruby',       rarity:3, color:'#dc2626', mult:12 },
  { key:'nether_star',rarity:4, color:'#fbbf24', mult:25 },
  { key:'dragon_egg', rarity:5, color:'#06b6d4', mult:50 },
  { key:'infinity_stone',rarity:6,color:'#ff6ef7',mult:100},
];

const SLOT_WEIGHTS = [20,18,14,12,8,7,5,4,2,1,1];
let slotsSpinning = false;

function getSlotSymbol() {
  const total = SLOT_WEIGHTS.reduce((a,b)=>a+b,0);
  let r = Math.random()*total;
  for(let i=0;i<SLOT_SYMBOLS.length;i++) { r-=SLOT_WEIGHTS[i]; if(r<=0) return SLOT_SYMBOLS[i]; }
  return SLOT_SYMBOLS[0];
}

function renderSlotsReels(reels) {
  const container = document.getElementById('slots-reels');
  if(!container) return;
  container.innerHTML = reels.map((sym,i) => `
    <div class="slot-reel" id="reel-${i}">
      <div class="slot-symbol" style="color:${sym.color};text-shadow:0 0 20px ${sym.color}80">
        ${generateSVG(ALL_ITEMS[sym.key]?.type||'gem', sym.rarity)}
        <span class="slot-sym-name">${ALL_ITEMS[sym.key]?.name||sym.key}</span>
      </div>
    </div>
  `).join('');
}

async function spinSlots(bet) {
  if(slotsSpinning) return;
  if(!spendMoney(bet)) { showToast('Not enough money!','error'); return; }
  slotsSpinning = true;
  gameState.stats.slotsSpun++;
  gameState.stats.totalSpent += bet;
  playSound('spin');

  const spinBtn = document.getElementById('slots-spin-btn');
  if(spinBtn) spinBtn.disabled = true;

  // Animate spinning
  const reelEls = [0,1,2].map(i=>document.getElementById('reel-'+i));
  let frame = 0;
  const spinInterval = setInterval(()=>{
    reelEls.forEach(el => {
      if(!el) return;
      const s = SLOT_SYMBOLS[Math.floor(Math.random()*SLOT_SYMBOLS.length)];
      el.querySelector('.slot-symbol').style.color = s.color;
      el.querySelector('.slot-symbol').style.textShadow = `0 0 20px ${s.color}80`;
      el.querySelector('.slot-sym-name').textContent = ALL_ITEMS[s.key]?.name||s.key;
      el.querySelector('.slot-symbol svg, .slot-symbol > div').innerHTML = generateSVG(ALL_ITEMS[s.key]?.type||'gem',s.rarity);
    });
    frame++;
  }, 60);

  await new Promise(r => setTimeout(r, 2000));
  clearInterval(spinInterval);

  const result = [getSlotSymbol(), getSlotSymbol(), getSlotSymbol()];
  renderSlotsReels(result);

  // Check win
  let mult = 0;
  if(result[0].key === result[1].key && result[1].key === result[2].key) {
    mult = result[0].mult * 3;
  } else if(result[0].key === result[1].key || result[1].key === result[2].key || result[0].key === result[2].key) {
    mult = result[0].mult;
  }

  const winAmt = Math.round(bet * mult);
  if(winAmt > 0) {
    addMoney(winAmt);
    gameState.stats.totalEarned += winAmt;
    showToast(`🎰 ${mult}x WIN! +${formatMoney(winAmt)}`, 'success');
    playSound('caseopened');
  } else {
    showToast('No match. Try again!', 'error');
  }

  document.getElementById('slots-result').textContent = winAmt > 0 ? `+${formatMoney(winAmt)} (${mult}x)` : 'No win';
  document.getElementById('slots-result').style.color = winAmt > 0 ? '#35c895' : '#ef4444';

  saveProfile();
  slotsSpinning = false;
  if(spinBtn) spinBtn.disabled = false;
}

// ============================================================
//  CRASH
// ============================================================
let crashMultiplier = 1.0;
let crashInterval = null;
let crashBet = 0;
let crashActive = false;
let crashCrashPoint = 1.0;
let crashCashedOut = false;

function generateCrashPoint() {
  const r = Math.random();
  if(r < 0.01) return 1.0 + Math.random() * 0.5;
  return Math.max(1.01, 1 / (1 - Math.random()) * 0.9);
}

function startCrash(bet) {
  if(crashActive) return;
  if(!spendMoney(bet)) { showToast('Not enough money!','error'); return; }
  crashBet = bet;
  crashActive = true;
  crashCashedOut = false;
  crashMultiplier = 1.0;
  crashCrashPoint = generateCrashPoint();
  gameState.stats.totalSpent += bet;

  const multEl = document.getElementById('crash-multiplier');
  const cashoutBtn = document.getElementById('crash-cashout');
  const startBtn = document.getElementById('crash-start');
  if(cashoutBtn) cashoutBtn.disabled = false;
  if(startBtn) startBtn.disabled = true;

  playSound('spin');

  crashInterval = setInterval(()=>{
    crashMultiplier += crashMultiplier * 0.035;
    if(multEl) {
      multEl.textContent = crashMultiplier.toFixed(2) + 'x';
      const hue = Math.max(0, 120 - (crashMultiplier-1)*15);
      multEl.style.color = `hsl(${hue},100%,60%)`;
    }

    if(crashMultiplier >= crashCrashPoint) {
      clearInterval(crashInterval);
      crashActive = false;
      if(!crashCashedOut) {
        if(multEl) { multEl.textContent = '💥 CRASH!'; multEl.style.color = '#ef4444'; }
        showToast(`💥 Crashed at ${crashCrashPoint.toFixed(2)}x! Lost ${formatMoney(crashBet)}`, 'error');
        playSound('itemssold');
      }
      if(cashoutBtn) cashoutBtn.disabled = true;
      if(startBtn) startBtn.disabled = false;
      saveProfile();
    }
  }, 80);
}

function cashOutCrash() {
  if(!crashActive || crashCashedOut) return;
  crashCashedOut = true;
  clearInterval(crashInterval);
  crashActive = false;
  const win = Math.round(crashBet * crashMultiplier);
  addMoney(win);
  gameState.stats.totalEarned += win;
  if(crashMultiplier > gameState.stats.bestCrashMultiplier) {
    gameState.stats.bestCrashMultiplier = crashMultiplier;
  }
  saveProfile();
  showToast(`✅ Cashed out at ${crashMultiplier.toFixed(2)}x! +${formatMoney(win)}`, 'success');
  playSound('caseopened');
  const cashoutBtn = document.getElementById('crash-cashout');
  const startBtn = document.getElementById('crash-start');
  if(cashoutBtn) cashoutBtn.disabled = true;
  if(startBtn) startBtn.disabled = false;
}

// ============================================================
//  PLINKO
// ============================================================
const PLINKO_MULTIPLIERS = [0.2, 0.5, 1, 1.5, 2, 3, 5, 10, 5, 3, 2, 1.5, 1, 0.5, 0.2];
const PLINKO_ROWS = 12;

function dropPlinko(bet) {
  if(!spendMoney(bet)) { showToast('Not enough money!','error'); return; }
  gameState.stats.totalSpent += bet;

  // Simulate ball path
  let pos = 7; // center slot (out of 15)
  const moves = [];
  for(let i=0;i<PLINKO_ROWS;i++) {
    const dir = Math.random() < 0.5 ? -1 : 1;
    pos = Math.max(0, Math.min(14, pos + dir));
    moves.push({ row:i, pos, dir });
  }

  animatePlinkoBall(moves, bet, pos);
}

function animatePlinkoBall(moves, bet, finalSlot) {
  const canvas = document.getElementById('plinko-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  let step = 0;
  const cellW = W / 15;

  function draw() {
    ctx.clearRect(0,0,W,H);

    // Draw pegs
    for(let row=0;row<PLINKO_ROWS;row++) {
      const pegsInRow = row + 2;
      for(let peg=0;peg<pegsInRow;peg++) {
        const px = W/2 - ((pegsInRow-1)/2 - peg) * cellW;
        const py = 40 + row * ((H-120)/PLINKO_ROWS);
        ctx.beginPath();
        ctx.arc(px,py,5,0,Math.PI*2);
        ctx.fillStyle = '#35c895';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#35c895';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Draw multiplier slots
    PLINKO_MULTIPLIERS.forEach((mult,i)=>{
      const sx = i * cellW;
      const sy = H - 50;
      const hue = mult >= 5 ? 45 : mult >= 2 ? 120 : mult >= 1 ? 200 : 0;
      ctx.fillStyle = `hsl(${hue},80%,30%)`;
      ctx.strokeStyle = `hsl(${hue},80%,60%)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(sx+2,sy,cellW-4,40,4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = `hsl(${hue},80%,80%)`;
      ctx.font = 'bold 9px Poppins';
      ctx.textAlign = 'center';
      ctx.fillText(mult+'x', sx+cellW/2, sy+25);
    });

    // Ball position
    if(step < moves.length) {
      const m = moves[step];
      const bx = W/2 - ((PLINKO_ROWS+1)/2 - m.pos) * cellW/2 * (m.row/PLINKO_ROWS + 0.1);
      const by = 40 + m.row * ((H-120)/PLINKO_ROWS);
      ctx.beginPath();
      ctx.arc(bx,by,10,0,Math.PI*2);
      const gradient = ctx.createRadialGradient(bx-3,by-3,1,bx,by,10);
      gradient.addColorStop(0,'#fef08a');
      gradient.addColorStop(1,'#f59e0b');
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      // Final position
      const bx = finalSlot * cellW + cellW/2;
      const by = H - 50;
      ctx.beginPath();
      ctx.arc(bx,by-15,12,0,Math.PI*2);
      const gradient = ctx.createRadialGradient(bx-3,by-18,1,bx,by-15,12);
      gradient.addColorStop(0,'#fef08a');
      gradient.addColorStop(1,'#f59e0b');
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
    }
  }

  const timer = setInterval(()=>{
    draw();
    step++;
    if(step > moves.length) {
      clearInterval(timer);
      const mult = PLINKO_MULTIPLIERS[finalSlot];
      const win = Math.round(bet * mult);
      addMoney(win);
      gameState.stats.totalEarned += win;
      if(mult > gameState.stats.bestPlinkoMultiplier) gameState.stats.bestPlinkoMultiplier = mult;
      saveProfile();
      const result = document.getElementById('plinko-result');
      if(result) {
        result.textContent = `${mult}x = ${formatMoney(win)}`;
        result.style.color = mult >= 1 ? '#35c895' : '#ef4444';
      }
      if(win >= bet) { showToast(`🎯 Plinko ${mult}x! +${formatMoney(win)}`,'success'); playSound('caseopened'); }
      else { showToast(`Plinko ${mult}x — ${formatMoney(win)}`,'error'); }
      const dropBtn = document.getElementById('plinko-drop-btn');
      if(dropBtn) dropBtn.disabled = false;
    }
  }, 80);
}
