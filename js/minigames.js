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
//  PLINKO  —  full physics rewrite
// ============================================================

const PLINKO_ROWS      = 14;
const PLINKO_COLS      = PLINKO_ROWS + 1;          // 15 slots at bottom
const PLINKO_MULTS     = [0.2,0.5,1,1.5,2,3,5,10,5,3,2,1.5,1,0.5,0.2];
const PLINKO_BALL_R    = 8;
const PLINKO_PEG_R     = 5;
const GRAVITY          = 0.38;
const BOUNCE           = 0.42;
const FRICTION         = 0.995;

let plinkoRAF          = null;   // requestAnimationFrame handle
let plinkoBalls        = [];     // active physics balls
let plinkoRunning      = false;

// Pre-build peg positions once when the board dimensions are known
function buildPegs(W, H) {
  const SLOT_H  = 52;
  const TOP_PAD = 36;
  const BOT_PAD = SLOT_H + 10;
  const usable  = H - TOP_PAD - BOT_PAD;
  const rowGap  = usable / (PLINKO_ROWS - 1);
  const pegs = [];
  for (let row = 0; row < PLINKO_ROWS; row++) {
    const count  = row + 2;
    const spread = (count - 1) * getPegSpacing(W);
    for (let col = 0; col < count; col++) {
      pegs.push({
        x: W / 2 - spread / 2 + col * getPegSpacing(W),
        y: TOP_PAD + row * rowGap,
        row, col,
      });
    }
  }
  return pegs;
}

function getPegSpacing(W) { return W / (PLINKO_ROWS + 1); }

function slotX(slot, W) {
  const spacing = getPegSpacing(W);
  return W / 2 - (PLINKO_COLS - 1) / 2 * spacing + slot * spacing;
}

// ── draw static board ────────────────────────────────────────
function drawPlinkoBoard(canvas, highlightSlot = -1) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const pegs = buildPegs(W, H);
  const SLOT_H = 52;

  ctx.clearRect(0, 0, W, H);

  // faint grid lines
  ctx.strokeStyle = '#ffffff06';
  ctx.lineWidth = 1;
  pegs.forEach(p => {
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(W/2, H - SLOT_H - 10);
    ctx.stroke();
  });

  // pegs
  pegs.forEach(p => {
    // outer glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, PLINKO_PEG_R + 4, 0, Math.PI * 2);
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, PLINKO_PEG_R + 4);
    grd.addColorStop(0, '#35c89540');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fill();
    // core
    ctx.beginPath();
    ctx.arc(p.x, p.y, PLINKO_PEG_R, 0, Math.PI * 2);
    ctx.fillStyle = '#1e3a30';
    ctx.fill();
    ctx.strokeStyle = '#35c895';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // shine
    ctx.beginPath();
    ctx.arc(p.x - 1.5, p.y - 1.5, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#35c895aa';
    ctx.fill();
  });

  // slot buckets
  const spacing = getPegSpacing(W);
  PLINKO_MULTS.forEach((mult, i) => {
    const cx = slotX(i, W);
    const sx = cx - spacing / 2 + 2;
    const sy = H - SLOT_H;
    const sw = spacing - 4;
    const sh = SLOT_H - 4;

    const big   = mult >= 5;
    const med   = mult >= 2;
    const hue   = big ? 40 : med ? 130 : mult >= 1 ? 210 : 0;
    const light = big ? 55 : med ? 45 : mult >= 1 ? 40 : 30;
    const alpha = (i === highlightSlot) ? 0.9 : 0.35;

    // background
    ctx.fillStyle = `hsla(${hue},80%,${light}%,${alpha})`;
    ctx.beginPath();
    ctx.roundRect(sx, sy, sw, sh, 6);
    ctx.fill();

    // border
    ctx.strokeStyle = `hsl(${hue},80%,${light + 20}%)`;
    ctx.lineWidth = i === highlightSlot ? 2.5 : 1.2;
    ctx.stroke();

    // label
    ctx.fillStyle = `hsl(${hue},90%,${i === highlightSlot ? 95 : 75}%)`;
    ctx.font = `bold ${mult >= 10 ? 11 : 10}px Poppins,sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(mult + 'x', cx, sy + sh / 2);
  });
}

// ── draw all live balls ──────────────────────────────────────
function drawBalls(canvas) {
  const ctx = canvas.getContext('2d');
  plinkoBalls.forEach(b => {
    // trail
    b.trail = b.trail || [];
    b.trail.push({ x: b.x, y: b.y });
    if (b.trail.length > 10) b.trail.shift();
    b.trail.forEach((pt, ti) => {
      const a = (ti / b.trail.length) * 0.3;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, PLINKO_BALL_R * (ti / b.trail.length), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251,191,36,${a})`;
      ctx.fill();
    });
    // glow
    const grd = ctx.createRadialGradient(b.x - 2, b.y - 2, 1, b.x, b.y, PLINKO_BALL_R + 6);
    grd.addColorStop(0, '#fef08a');
    grd.addColorStop(0.5, '#f59e0b');
    grd.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(b.x, b.y, PLINKO_BALL_R + 6, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
    // core
    const core = ctx.createRadialGradient(b.x - 2, b.y - 2, 1, b.x, b.y, PLINKO_BALL_R);
    core.addColorStop(0, '#fff9c4');
    core.addColorStop(0.6, '#fbbf24');
    core.addColorStop(1, '#b45309');
    ctx.beginPath();
    ctx.arc(b.x, b.y, PLINKO_BALL_R, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();
  });
}

// ── physics tick ─────────────────────────────────────────────
function tickPlinko(canvas, pegs, onSettle) {
  const W = canvas.width, H = canvas.height;
  const SLOT_H  = 52;
  const FLOOR_Y = H - SLOT_H + PLINKO_BALL_R + 2;

  plinkoBalls.forEach(b => {
    if (b.settled) return;

    b.vy += GRAVITY;
    b.vx *= FRICTION;
    b.x  += b.vx;
    b.y  += b.vy;

    // peg collisions
    pegs.forEach(p => {
      const dx = b.x - p.x;
      const dy = b.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minD = PLINKO_BALL_R + PLINKO_PEG_R;
      if (dist < minD && dist > 0) {
        const nx = dx / dist, ny = dy / dist;
        // push out
        b.x = p.x + nx * (minD + 0.5);
        b.y = p.y + ny * (minD + 0.5);
        // reflect velocity
        const dot = b.vx * nx + b.vy * ny;
        b.vx = (b.vx - 2 * dot * nx) * BOUNCE + (Math.random() - 0.5) * 0.8;
        b.vy = (b.vy - 2 * dot * ny) * BOUNCE;
        if (b.vy < 0.5) b.vy = 0.5;
      }
    });

    // wall collisions
    if (b.x < PLINKO_BALL_R)       { b.x = PLINKO_BALL_R;      b.vx = Math.abs(b.vx) * BOUNCE; }
    if (b.x > W - PLINKO_BALL_R)   { b.x = W - PLINKO_BALL_R;  b.vx = -Math.abs(b.vx) * BOUNCE; }

    // floor
    if (b.y >= FLOOR_Y) {
      b.y  = FLOOR_Y;
      b.vy = -b.vy * 0.25;
      b.vx *=  0.6;
      if (Math.abs(b.vy) < 0.8) {
        b.vy = 0;
        b.settled = true;
        // find closest slot
        const spacing = getPegSpacing(W);
        let best = 0, bestD = Infinity;
        PLINKO_MULTS.forEach((_, i) => {
          const d = Math.abs(b.x - slotX(i, W));
          if (d < bestD) { bestD = d; best = i; }
        });
        b.slot = best;
        onSettle(b);
      }
    }
  });
}

// ── main loop ────────────────────────────────────────────────
function plinkoLoop(canvas, pegs, onSettle) {
  drawPlinkoBoard(canvas);
  tickPlinko(canvas, pegs, onSettle);
  drawBalls(canvas);
  if (plinkoBalls.some(b => !b.settled)) {
    plinkoRAF = requestAnimationFrame(() => plinkoLoop(canvas, pegs, onSettle));
  } else {
    plinkoRunning = false;
  }
}

// ── public API ───────────────────────────────────────────────
function dropPlinko(bet) {
  if (!spendMoney(bet)) { showToast('Not enough money!', 'error'); return; }
  gameState.stats.totalSpent += bet;

  const canvas = document.getElementById('plinko-canvas');
  if (!canvas) return;

  // cancel any running animation
  if (plinkoRAF) { cancelAnimationFrame(plinkoRAF); plinkoRAF = null; }

  const pegs = buildPegs(canvas.width, canvas.height);
  const spacing = getPegSpacing(canvas.width);

  // slight random offset from center so ball doesn't fall straight
  const ball = {
    x:  canvas.width / 2 + (Math.random() - 0.5) * spacing * 0.6,
    y:  10,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 1.5,
    trail: [],
    settled: false,
    slot: -1,
    bet,
  };

  plinkoBalls = [ball];
  plinkoRunning = true;

  plinkoLoop(canvas, pegs, (settled) => {
    // flash winning slot
    const flashCanvas = document.getElementById('plinko-canvas');
    let flashes = 0;
    const flashTimer = setInterval(() => {
      drawPlinkoBoard(flashCanvas, flashes % 2 === 0 ? settled.slot : -1);
      drawBalls(flashCanvas);
      flashes++;
      if (flashes > 7) {
        clearInterval(flashTimer);
        drawPlinkoBoard(flashCanvas, settled.slot);
        drawBalls(flashCanvas);
        // payout
        const mult = PLINKO_MULTS[settled.slot];
        const win  = Math.round(settled.bet * mult);
        addMoney(win);
        gameState.stats.totalEarned += win;
        if (mult > gameState.stats.bestPlinkoMultiplier) gameState.stats.bestPlinkoMultiplier = mult;
        saveProfile();
        const resultEl = document.getElementById('plinko-result');
        if (resultEl) {
          resultEl.textContent = `${mult}x  →  ${formatMoney(win)}`;
          resultEl.style.color = mult >= 1 ? '#35c895' : '#ef4444';
        }
        if (win >= settled.bet) { showToast(`🎯 ${mult}x! You won ${formatMoney(win)}`, 'success'); playSound('caseopened'); }
        else                    { showToast(`${mult}x — ${formatMoney(win)}`, 'error'); }
        const btn = document.getElementById('plinko-drop-btn');
        if (btn) btn.disabled = false;
      }
    }, 90);
  });
}
