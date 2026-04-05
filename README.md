# ⬛ Minecraft Case Simulator

A fully-featured browser-based case opening simulator with Supabase backend.

---

## 🚀 Setup (3 Steps)

### 1. Add Your Supabase Keys
Open `config.js` and replace the placeholder values:

```js
const SUPABASE_URL  = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON = "eyYOUR_ANON_KEY_HERE";
```

### 2. Run the Supabase SQL
In your Supabase dashboard → SQL Editor, run the SQL from the previous setup step.

### 3. Open the Game
Open `index.html` in a browser — or deploy to any static host (Netlify, GitHub Pages, Vercel).

> **No account?** Click "Play Locally" — all progress saves to localStorage.

---

## 📁 File Structure

```
minecraft-cases/
├── index.html          ← Main HTML shell
├── config.js           ← 🔑 YOUR KEYS GO HERE
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── items.js        ← All 200+ items & 50 cases
│   ├── caseicons.js    ← SVG case art
│   ├── game.js         ← Supabase, state, auth
│   ├── minigames.js    ← Slots, Crash, Plinko
│   └── ui.js           ← All rendering
└── media/              ← Sound files (optional)
    ├── spin.webm
    ├── caseopened.webm
    ├── buttonclicked.webm
    ├── itemselected.webm
    └── itemssold.webm
```

---

## 🎮 Features

- **50 Cases** from $12 to $15,000
- **200+ Items** across 7 rarity tiers (Common → ∞ Infinity)
- **Case Opening** with animated roulette spin
- **Inventory** with multi-select selling
- **Daily Shop** (8 items, refreshes every 24h)
- **Crafting Upgrades** (Minecraft-style 3x3 grid)
- **Leaderboard** (top 10, sortable)
- **Slots** (weighted rarity symbols, multipliers)
- **Crash** (real-time multiplier, cash out mechanic)
- **Plinko** (canvas-animated ball drop)
- **Daily Rewards** (streak multiplier)
- **Stats Modal** (full player history)

---

## 🕹️ Console Commands (Testing)

Open browser DevTools console:

```js
giveMoney(10000)      // Add $10,000
setMoney(1000000)     // Set to $1,000,000
resetProgress()       // Reset all data (asks for confirmation)
```

---

## 🔊 Sound Files

The game looks for `.webm` audio files in `/media/`. 
The game works silently without them — just drop in files named:
- `spin.webm`
- `caseopened.webm`
- `buttonclicked.webm`
- `itemselected.webm`
- `itemssold.webm`

---

## 🌐 Deploying

Any static host works:
- **Netlify**: Drag-and-drop the folder
- **GitHub Pages**: Push to a repo, enable Pages
- **Vercel**: `vercel --prod` in the folder

Remember to update your Supabase **Site URL** in Authentication settings after deploying.
