// ============================================================
//  ITEMS & CASES DATABASE
// ============================================================

const RARITY = {
  COMMON:     { id: 0, name: 'Common',     color: '#6b7280', glow: '#6b728060', label: 'COMMON' },
  UNCOMMON:   { id: 1, name: 'Uncommon',   color: '#22c55e', glow: '#22c55e60', label: 'UNCOMMON' },
  RARE:       { id: 2, name: 'Rare',       color: '#3b82f6', glow: '#3b82f660', label: 'RARE' },
  EPIC:       { id: 3, name: 'Epic',       color: '#a855f7', glow: '#a855f760', label: 'EPIC' },
  LEGENDARY:  { id: 4, name: 'Legendary',  color: '#fbbf24', glow: '#fbbf2460', label: 'LEGENDARY' },
  DIVINE:     { id: 5, name: 'Divine',     color: '#06b6d4', glow: '#06b6d460', label: 'DIVINE' },
  INFINITY:   { id: 6, name: 'Infinity',   color: '#ff6ef7', glow: '#ff6ef760', label: '∞ INFINITY' },
};

function getRarity(id) {
  return Object.values(RARITY).find(r => r.id === id) || RARITY.COMMON;
}

// ============================================================
//  SVG ICON GENERATORS
// ============================================================
function generateSVG(type, rarityId) {
  const r = getRarity(rarityId);
  const c = r.color;
  const isInfinity = rarityId === 6;
  const isLegendary = rarityId >= 4;

  const sparkle = isLegendary ? `
    <circle cx="10" cy="10" r="2" fill="${c}" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="54" cy="14" r="1.5" fill="${c}" opacity="0.7">
      <animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.1s" repeatCount="indefinite"/>
    </circle>
    <circle cx="50" cy="52" r="2" fill="${c}" opacity="0.8">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="8" cy="50" r="1.5" fill="${c}" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.4s" repeatCount="indefinite"/>
    </circle>` : '';

  const infinityGrad = isInfinity ? `
    <defs>
      <linearGradient id="infG${type}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff6ef7"/>
        <stop offset="25%" stop-color="#a855f7"/>
        <stop offset="50%" stop-color="#3b82f6"/>
        <stop offset="75%" stop-color="#06b6d4"/>
        <stop offset="100%" stop-color="#22c55e"/>
      </linearGradient>
    </defs>` : '';

  const fillColor = isInfinity ? `url(#infG${type})` : c;

  const types = {
    sword: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <defs>
        <filter id="glow${type}${rarityId}">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="sg${type}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${c}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${c}" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      <filter id="sf${type}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <rect x="30" y="8" width="4" height="36" rx="1" fill="${isInfinity?fillColor:`url(#sg${type})`}" filter="url(#sf${type})"/>
      <rect x="22" y="28" width="20" height="4" rx="1" fill="${fillColor}" opacity="0.9"/>
      <rect x="29" y="44" width="6" height="12" rx="2" fill="${fillColor}" opacity="0.6"/>
      <polygon points="32,8 30,14 34,14" fill="${fillColor}" opacity="0.95"/>
    </svg>`,

    bow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="bf${type}${rarityId}"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <path d="M18,10 Q8,32 18,54" fill="none" stroke="${fillColor}" stroke-width="4" stroke-linecap="round" filter="url(#bf${type}${rarityId})"/>
      <line x1="18" y1="10" x2="18" y2="54" stroke="${fillColor}" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7"/>
      <line x1="32" y1="32" x2="18" y2="32" stroke="${fillColor}" stroke-width="2" opacity="0.8"/>
      <polygon points="32,30 38,32 32,34" fill="${fillColor}"/>
    </svg>`,

    potion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="pf${type}${rarityId}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <rect x="26" y="10" width="12" height="8" rx="2" fill="${fillColor}" opacity="0.8"/>
      <path d="M20,20 Q16,28 16,38 Q16,54 32,54 Q48,54 48,38 Q48,28 44,20 Z" fill="${fillColor}" opacity="0.3" filter="url(#pf${type}${rarityId})"/>
      <path d="M20,20 Q16,28 16,38 Q16,54 32,54 Q48,54 48,38 Q48,28 44,20 Z" fill="none" stroke="${fillColor}" stroke-width="2"/>
      <ellipse cx="32" cy="42" rx="10" ry="6" fill="${fillColor}" opacity="0.6"/>
      <circle cx="26" cy="34" r="3" fill="white" opacity="0.3"/>
    </svg>`,

    armor: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="af${type}${rarityId}"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <path d="M16,16 L32,10 L48,16 L48,36 Q48,52 32,56 Q16,52 16,36 Z" fill="${fillColor}" opacity="0.25" filter="url(#af${type}${rarityId})"/>
      <path d="M16,16 L32,10 L48,16 L48,36 Q48,52 32,56 Q16,52 16,36 Z" fill="none" stroke="${fillColor}" stroke-width="2.5"/>
      <line x1="32" y1="10" x2="32" y2="56" stroke="${fillColor}" stroke-width="1.5" opacity="0.5"/>
      <path d="M16,24 Q32,28 48,24" fill="none" stroke="${fillColor}" stroke-width="1.5" opacity="0.7"/>
    </svg>`,

    food: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="ff${type}${rarityId}"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <circle cx="32" cy="36" r="20" fill="${fillColor}" opacity="0.3" filter="url(#ff${type}${rarityId})"/>
      <circle cx="32" cy="36" r="20" fill="none" stroke="${fillColor}" stroke-width="2.5"/>
      <path d="M28,14 Q32,8 36,14" fill="none" stroke="${fillColor}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="26" cy="30" r="4" fill="${fillColor}" opacity="0.5"/>
      <circle cx="38" cy="36" r="3" fill="${fillColor}" opacity="0.4"/>
    </svg>`,

    block: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="blf${type}${rarityId}"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <polygon points="32,8 56,22 56,42 32,56 8,42 8,22" fill="${fillColor}" opacity="0.2" filter="url(#blf${type}${rarityId})"/>
      <polygon points="32,8 56,22 32,36 8,22" fill="${fillColor}" opacity="0.5"/>
      <polygon points="8,22 32,36 32,56 8,42" fill="${fillColor}" opacity="0.3"/>
      <polygon points="56,22 32,36 32,56 56,42" fill="${fillColor}" opacity="0.4"/>
      <polygon points="32,8 56,22 56,42 32,56 8,42 8,22" fill="none" stroke="${fillColor}" stroke-width="1.5"/>
    </svg>`,

    resource: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="rf${type}${rarityId}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <polygon points="32,8 38,26 56,26 42,38 48,56 32,44 16,56 22,38 8,26 26,26" fill="${fillColor}" opacity="0.3" filter="url(#rf${type}${rarityId})"/>
      <polygon points="32,8 38,26 56,26 42,38 48,56 32,44 16,56 22,38 8,26 26,26" fill="none" stroke="${fillColor}" stroke-width="2"/>
    </svg>`,

    music: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="mf${type}${rarityId}"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <path d="M24,44 L24,22 L48,16 L48,38" stroke="${fillColor}" stroke-width="2.5" fill="none" stroke-linecap="round" filter="url(#mf${type}${rarityId})"/>
      <circle cx="20" cy="46" r="6" fill="${fillColor}" opacity="0.6"/>
      <circle cx="44" cy="40" r="6" fill="${fillColor}" opacity="0.6"/>
      <line x1="34" y1="14" x2="34" y2="34" stroke="${fillColor}" stroke-width="1" opacity="0.5" stroke-dasharray="3,2"/>
    </svg>`,

    tool: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="tf${type}${rarityId}"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <rect x="28" y="28" width="28" height="5" rx="2" transform="rotate(-45,32,32)" fill="${fillColor}" opacity="0.8" filter="url(#tf${type}${rarityId})"/>
      <polygon points="10,10 22,14 18,22 6,18" fill="${fillColor}" opacity="0.9"/>
      <rect x="16" y="16" width="6" height="6" rx="1" fill="${fillColor}" transform="rotate(-45,19,19)" opacity="0.7"/>
    </svg>`,

    gem: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="gf${type}${rarityId}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <polygon points="32,8 52,24 44,56 20,56 12,24" fill="${fillColor}" opacity="0.25" filter="url(#gf${type}${rarityId})"/>
      <polygon points="32,8 52,24 44,56 20,56 12,24" fill="none" stroke="${fillColor}" stroke-width="2.5"/>
      <polygon points="32,8 52,24 32,30 12,24" fill="${fillColor}" opacity="0.5"/>
      <polygon points="32,30 52,24 44,56 20,56 12,24" fill="${fillColor}" opacity="0.2"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke="${fillColor}" stroke-width="1" opacity="0.4"/>
      <ellipse cx="28" cy="20" rx="5" ry="3" fill="white" opacity="0.2" transform="rotate(-20,28,20)"/>
    </svg>`,

    disc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="df${type}${rarityId}"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <circle cx="32" cy="32" r="24" fill="${fillColor}" opacity="0.2" filter="url(#df${type}${rarityId})"/>
      <circle cx="32" cy="32" r="24" fill="none" stroke="${fillColor}" stroke-width="2"/>
      <circle cx="32" cy="32" r="16" fill="none" stroke="${fillColor}" stroke-width="1.5" opacity="0.6"/>
      <circle cx="32" cy="32" r="8" fill="none" stroke="${fillColor}" stroke-width="1.5" opacity="0.4"/>
      <circle cx="32" cy="32" r="3" fill="${fillColor}"/>
    </svg>`,

    trident: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="trf${type}${rarityId}"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <line x1="32" y1="10" x2="32" y2="58" stroke="${fillColor}" stroke-width="3" stroke-linecap="round" filter="url(#trf${type}${rarityId})"/>
      <line x1="22" y1="10" x2="22" y2="28" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="10" x2="42" y2="28" stroke="${fillColor}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M22,28 Q27,34 32,30 Q37,34 42,28" fill="none" stroke="${fillColor}" stroke-width="2"/>
    </svg>`,

    skull: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="skf${type}${rarityId}"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <ellipse cx="32" cy="28" rx="20" ry="22" fill="${fillColor}" opacity="0.25" filter="url(#skf${type}${rarityId})"/>
      <ellipse cx="32" cy="28" rx="20" ry="22" fill="none" stroke="${fillColor}" stroke-width="2.5"/>
      <rect x="20" y="48" width="24" height="8" rx="2" fill="${fillColor}" opacity="0.5"/>
      <circle cx="24" cy="28" r="5" fill="${fillColor}" opacity="0.7"/>
      <circle cx="40" cy="28" r="5" fill="${fillColor}" opacity="0.7"/>
      <rect x="30" y="38" width="4" height="6" rx="1" fill="${fillColor}" opacity="0.6"/>
    </svg>`,

    crystal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      ${infinityGrad}
      <filter id="cf${type}${rarityId}"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      ${sparkle}
      <polygon points="32,6 46,22 40,56 24,56 18,22" fill="${fillColor}" opacity="0.2" filter="url(#cf${type}${rarityId})"/>
      <polygon points="32,6 46,22 40,56 24,56 18,22" fill="none" stroke="${fillColor}" stroke-width="2.5"/>
      <polygon points="32,6 46,22 32,28 18,22" fill="${fillColor}" opacity="0.6"/>
      <line x1="32" y1="6" x2="32" y2="56" stroke="${fillColor}" stroke-width="1" opacity="0.4"/>
      <line x1="18" y1="22" x2="46" y2="22" stroke="${fillColor}" stroke-width="1" opacity="0.4"/>
      <ellipse cx="28" cy="16" rx="4" ry="2.5" fill="white" opacity="0.25" transform="rotate(-20,28,16)"/>
    </svg>`,
  };

  return types[type] || types.gem;
}

// ============================================================
//  ITEM DEFINITIONS
// ============================================================
const ALL_ITEMS = {
  // RESOURCES
  coal:         { name:'Coal',          rarity:0, type:'resource', minPrice:1,    maxPrice:5,    weight:30 },
  iron:         { name:'Iron Ingot',    rarity:0, type:'resource', minPrice:5,    maxPrice:20,   weight:25 },
  redstone:     { name:'Redstone',      rarity:1, type:'resource', minPrice:10,   maxPrice:40,   weight:20 },
  gold_ingot:   { name:'Gold Ingot',    rarity:1, type:'resource', minPrice:20,   maxPrice:60,   weight:18 },
  diamond:      { name:'Diamond',       rarity:2, type:'gem',      minPrice:80,   maxPrice:200,  weight:10 },
  emerald:      { name:'Emerald',       rarity:2, type:'gem',      minPrice:100,  maxPrice:250,  weight:8  },
  nether_star:  { name:'Nether Star',   rarity:4, type:'gem',      minPrice:800,  maxPrice:1800, weight:2  },
  netherite:    { name:'Netherite Ingot',rarity:3,type:'resource', minPrice:300,  maxPrice:700,  weight:5  },

  // FOOD
  bread:        { name:'Bread',         rarity:0, type:'food',     minPrice:2,    maxPrice:8,    weight:30 },
  carrot:       { name:'Carrot',        rarity:0, type:'food',     minPrice:3,    maxPrice:10,   weight:28 },
  chicken:      { name:'Cooked Chicken',rarity:0, type:'food',     minPrice:5,    maxPrice:15,   weight:25 },
  beef:         { name:'Steak',         rarity:1, type:'food',     minPrice:8,    maxPrice:25,   weight:20 },
  pumpkin_pie:  { name:'Pumpkin Pie',   rarity:1, type:'food',     minPrice:12,   maxPrice:35,   weight:15 },
  golden_apple: { name:'Golden Apple',  rarity:3, type:'food',     minPrice:200,  maxPrice:500,  weight:5  },
  enchanted_ga: { name:'Enchanted Apple',rarity:5,type:'food',     minPrice:2000, maxPrice:5000, weight:1  },

  // SWORDS
  wood_sword:   { name:'Wood Sword',    rarity:0, type:'sword',    minPrice:3,    maxPrice:10,   weight:30 },
  stone_sword:  { name:'Stone Sword',   rarity:0, type:'sword',    minPrice:8,    maxPrice:20,   weight:25 },
  iron_sword:   { name:'Iron Sword',    rarity:1, type:'sword',    minPrice:20,   maxPrice:60,   weight:20 },
  gold_sword:   { name:'Gold Sword',    rarity:1, type:'sword',    minPrice:30,   maxPrice:80,   weight:15 },
  diamond_sword:{ name:'Diamond Sword', rarity:2, type:'sword',    minPrice:80,   maxPrice:200,  weight:10 },
  emerald_sword:{ name:'Emerald Sword', rarity:3, type:'sword',    minPrice:250,  maxPrice:600,  weight:5  },
  netherite_sword:{name:'Netherite Sword',rarity:4,type:'sword',   minPrice:700,  maxPrice:1500, weight:2  },
  fire_sword:   { name:'Fire Aspect Sword',rarity:4,type:'sword',  minPrice:900,  maxPrice:2000, weight:2  },
  god_sword:    { name:'God Sword',     rarity:5, type:'sword',    minPrice:5000, maxPrice:12000,weight:1  },
  ultimate_blade:{name:'Ultimate Blade',rarity:5, type:'sword',    minPrice:8000, maxPrice:18000,weight:1  },
  galaxy_sword: { name:'Galaxy Sword',  rarity:6, type:'sword',    minPrice:30000,maxPrice:80000,weight:1  },

  // BOWS / RANGED
  arrow:        { name:'Arrow Bundle',  rarity:0, type:'bow',      minPrice:2,    maxPrice:8,    weight:35 },
  bow:          { name:'Bow',           rarity:1, type:'bow',      minPrice:15,   maxPrice:45,   weight:20 },
  crossbow:     { name:'Crossbow',      rarity:2, type:'bow',      minPrice:50,   maxPrice:130,  weight:12 },
  trident:      { name:'Trident',       rarity:3, type:'trident',  minPrice:200,  maxPrice:500,  weight:5  },
  sniper_bow:   { name:'Sniper Bow',    rarity:4, type:'bow',      minPrice:800,  maxPrice:2000, weight:2  },
  god_bow:      { name:'God Bow',       rarity:5, type:'bow',      minPrice:4000, maxPrice:10000,weight:1  },

  // MUSIC DISCS
  disc_13:      { name:'Disc 13',       rarity:1, type:'disc',     minPrice:20,   maxPrice:60,   weight:18 },
  disc_cat:     { name:'Disc Cat',      rarity:1, type:'disc',     minPrice:20,   maxPrice:60,   weight:18 },
  disc_blocks:  { name:'Disc Blocks',   rarity:2, type:'disc',     minPrice:40,   maxPrice:100,  weight:14 },
  disc_chirp:   { name:'Disc Chirp',    rarity:2, type:'disc',     minPrice:40,   maxPrice:100,  weight:14 },
  disc_far:     { name:'Disc Far',      rarity:2, type:'disc',     minPrice:50,   maxPrice:120,  weight:12 },
  disc_mall:    { name:'Disc Mall',     rarity:2, type:'disc',     minPrice:50,   maxPrice:120,  weight:12 },
  disc_mellohi: { name:'Disc Mellohi',  rarity:3, type:'disc',     minPrice:100,  maxPrice:250,  weight:8  },
  disc_stal:    { name:'Disc Stal',     rarity:3, type:'disc',     minPrice:100,  maxPrice:250,  weight:8  },
  disc_strad:   { name:'Disc Strad',    rarity:3, type:'disc',     minPrice:120,  maxPrice:300,  weight:7  },
  disc_ward:    { name:'Disc Ward',     rarity:3, type:'disc',     minPrice:120,  maxPrice:300,  weight:7  },
  disc_11:      { name:'Disc 11',       rarity:4, type:'disc',     minPrice:400,  maxPrice:900,  weight:3  },
  disc_wait:    { name:'Disc Wait',     rarity:4, type:'disc',     minPrice:400,  maxPrice:900,  weight:3  },
  disc_pigstep: { name:'Disc Pigstep',  rarity:5, type:'disc',     minPrice:2000, maxPrice:5000, weight:1  },

  // ARMOR
  leather_armor:{ name:'Leather Armor', rarity:0, type:'armor',    minPrice:5,    maxPrice:20,   weight:30 },
  iron_armor:   { name:'Iron Armor',    rarity:1, type:'armor',    minPrice:25,   maxPrice:70,   weight:20 },
  gold_armor:   { name:'Gold Armor',    rarity:1, type:'armor',    minPrice:30,   maxPrice:80,   weight:18 },
  diamond_armor:{ name:'Diamond Armor', rarity:2, type:'armor',    minPrice:100,  maxPrice:280,  weight:10 },
  emerald_armor:{ name:'Emerald Armor', rarity:3, type:'armor',    minPrice:350,  maxPrice:800,  weight:5  },
  netherite_armor:{name:'Netherite Armor',rarity:4,type:'armor',   minPrice:900,  maxPrice:2200, weight:2  },
  elytra:       { name:'Elytra',        rarity:4, type:'armor',    minPrice:1200, maxPrice:3000, weight:2  },
  god_armor:    { name:'God Armor Set', rarity:5, type:'armor',    minPrice:6000, maxPrice:15000,weight:1  },

  // BLOCKS
  workbench:    { name:'Workbench',     rarity:0, type:'block',    minPrice:3,    maxPrice:10,   weight:30 },
  chest:        { name:'Chest',         rarity:0, type:'block',    minPrice:5,    maxPrice:15,   weight:28 },
  golden_block: { name:'Gold Block',    rarity:2, type:'block',    minPrice:80,   maxPrice:200,  weight:10 },
  diamond_block:{ name:'Diamond Block', rarity:3, type:'block',    minPrice:300,  maxPrice:700,  weight:5  },
  beacon:       { name:'Beacon',        rarity:4, type:'block',    minPrice:1000, maxPrice:2500, weight:2  },
  command_block:{ name:'Command Block', rarity:5, type:'block',    minPrice:3000, maxPrice:8000, weight:1  },
  ancient_debris:{name:'Ancient Debris',rarity:3, type:'block',    minPrice:400,  maxPrice:900,  weight:4  },
  reinforced_ds:{ name:'Reinforced Deepslate',rarity:5,type:'block',minPrice:4000,maxPrice:10000,weight:1 },

  // POTIONS
  swift_potion: { name:'Swiftness Potion',rarity:1,type:'potion',  minPrice:20,   maxPrice:60,   weight:20 },
  heal_potion:  { name:'Healing Potion', rarity:1, type:'potion',   minPrice:25,   maxPrice:70,   weight:18 },
  regen_potion: { name:'Regeneration Potion',rarity:2,type:'potion',minPrice:60,   maxPrice:150,  weight:12 },
  luck_potion:  { name:'Luck Potion',    rarity:3, type:'potion',   minPrice:200,  maxPrice:500,  weight:6  },
  dragon_breath:{ name:'Dragon Breath',  rarity:4, type:'potion',   minPrice:800,  maxPrice:2000, weight:2  },
  invis_potion: { name:'Invisibility Potion',rarity:2,type:'potion',minPrice:50,   maxPrice:130,  weight:14 },

  // TOOLS
  wood_pick:    { name:'Wood Pickaxe',   rarity:0, type:'tool',    minPrice:3,    maxPrice:10,   weight:30 },
  stone_pick:   { name:'Stone Pickaxe',  rarity:0, type:'tool',    minPrice:6,    maxPrice:18,   weight:25 },
  iron_pick:    { name:'Iron Pickaxe',   rarity:1, type:'tool',    minPrice:20,   maxPrice:55,   weight:20 },
  diamond_pick: { name:'Diamond Pickaxe',rarity:2, type:'tool',    minPrice:80,   maxPrice:200,  weight:10 },
  netherite_pick:{name:'Netherite Pickaxe',rarity:4,type:'tool',   minPrice:700,  maxPrice:1800, weight:2  },
  wood_axe:     { name:'Wood Axe',       rarity:0, type:'tool',    minPrice:3,    maxPrice:10,   weight:28 },
  iron_axe:     { name:'Iron Axe',       rarity:1, type:'tool',    minPrice:18,   maxPrice:50,   weight:20 },
  diamond_axe:  { name:'Diamond Axe',    rarity:2, type:'tool',    minPrice:75,   maxPrice:190,  weight:10 },
  golden_hoe:   { name:'Golden Hoe',     rarity:1, type:'tool',    minPrice:15,   maxPrice:40,   weight:18 },
  builder_wand: { name:'Builder Wand',   rarity:4, type:'tool',    minPrice:1000, maxPrice:2500, weight:2  },
  farmer_tool:  { name:"Farmer's Tool",  rarity:3, type:'tool',    minPrice:300,  maxPrice:700,  weight:5  },

  // GEMS
  quartz:       { name:'Quartz',         rarity:1, type:'gem',     minPrice:15,   maxPrice:45,   weight:22 },
  amethyst:     { name:'Amethyst',       rarity:2, type:'gem',     minPrice:60,   maxPrice:160,  weight:14 },
  ruby:         { name:'Ruby',           rarity:3, type:'gem',     minPrice:250,  maxPrice:600,  weight:6  },
  sapphire:     { name:'Sapphire',       rarity:3, type:'gem',     minPrice:280,  maxPrice:650,  weight:5  },
  black_diamond:{ name:'Black Diamond',  rarity:4, type:'gem',     minPrice:800,  maxPrice:2000, weight:2  },
  dragon_egg:   { name:'Dragon Egg',     rarity:5, type:'gem',     minPrice:5000, maxPrice:12000,weight:1  },
  universe_crystal:{name:'Universe Crystal',rarity:6,type:'crystal',minPrice:50000,maxPrice:120000,weight:1},
  star_fragment:{ name:'Star Fragment',  rarity:5, type:'crystal', minPrice:8000, maxPrice:20000,weight:1  },
  time_core:    { name:'Time Core',      rarity:5, type:'crystal', minPrice:7000, maxPrice:18000,weight:1  },
  void_pearl:   { name:'Void Pearl',     rarity:5, type:'crystal', minPrice:6000, maxPrice:15000,weight:1  },

  // NETHER / END
  netherrack:   { name:'Netherrack',     rarity:0, type:'block',   minPrice:2,    maxPrice:8,    weight:35 },
  soul_sand:    { name:'Soul Sand',      rarity:1, type:'block',   minPrice:10,   maxPrice:30,   weight:22 },
  magma_cream:  { name:'Magma Cream',    rarity:1, type:'resource',minPrice:15,   maxPrice:45,   weight:18 },
  blaze_rod:    { name:'Blaze Rod',      rarity:2, type:'resource',minPrice:50,   maxPrice:130,  weight:12 },
  end_stone:    { name:'End Stone',      rarity:1, type:'block',   minPrice:8,    maxPrice:25,   weight:22 },
  chorus_fruit: { name:'Chorus Fruit',   rarity:1, type:'food',    minPrice:12,   maxPrice:35,   weight:18 },
  ender_pearl:  { name:'Ender Pearl',    rarity:2, type:'resource',minPrice:40,   maxPrice:100,  weight:14 },
  shulker_shell:{ name:'Shulker Shell',  rarity:3, type:'resource',minPrice:200,  maxPrice:500,  weight:6  },
  dragon_head:  { name:'Dragon Head',    rarity:4, type:'armor',   minPrice:1500, maxPrice:4000, weight:2  },

  // ENCHANTED BOOKS
  book_i:       { name:'Enchanted Book I',rarity:1,type:'block',   minPrice:20,   maxPrice:60,   weight:20 },
  book_iii:     { name:'Enchanted Book III',rarity:2,type:'block', minPrice:80,   maxPrice:200,  weight:12 },
  mending:      { name:'Mending Book',   rarity:3, type:'block',   minPrice:300,  maxPrice:700,  weight:5  },
  sharpness_v:  { name:'Sharpness V Book',rarity:3,type:'block',   minPrice:250,  maxPrice:600,  weight:6  },

  // OCEAN
  kelp:         { name:'Kelp',           rarity:0, type:'food',    minPrice:1,    maxPrice:5,    weight:35 },
  tropical_fish:{ name:'Tropical Fish',  rarity:1, type:'food',    minPrice:10,   maxPrice:30,   weight:22 },
  prismarine:   { name:'Prismarine',     rarity:2, type:'block',   minPrice:50,   maxPrice:130,  weight:14 },
  heart_of_sea: { name:'Heart of the Sea',rarity:4,type:'gem',     minPrice:1200, maxPrice:3000, weight:2  },

  // VILLAGE
  hay_bale:     { name:'Hay Bale',       rarity:0, type:'block',   minPrice:2,    maxPrice:8,    weight:32 },
  bell:         { name:'Bell',           rarity:2, type:'block',   minPrice:60,   maxPrice:150,  weight:12 },
  totem:        { name:'Totem of Undying',rarity:4,type:'armor',   minPrice:1200, maxPrice:3000, weight:2  },

  // SPECIAL
  lucky_block:  { name:'Lucky Block',    rarity:3, type:'block',   minPrice:400,  maxPrice:1000, weight:6  },
  golden_lucky: { name:'Golden Lucky Block',rarity:4,type:'block', minPrice:1500, maxPrice:4000, weight:2  },
  rainbow_lucky:{ name:'Rainbow Lucky Block',rarity:5,type:'block',minPrice:5000, maxPrice:12000,weight:1  },
  ancient_crown:{ name:'Ancient Crown',  rarity:5, type:'armor',   minPrice:6000, maxPrice:15000,weight:1  },
  infinity_stone:{name:'Infinity Stone', rarity:6, type:'gem',     minPrice:80000,maxPrice:200000,weight:1 },

  // WIZARD
  wizard_hat:   { name:'Wizard Hat',     rarity:2, type:'armor',   minPrice:70,   maxPrice:180,  weight:14 },
  magic_wand:   { name:'Magic Wand',     rarity:3, type:'tool',    minPrice:250,  maxPrice:600,  weight:6  },
  wizard_staff: { name:'Wizard Staff',   rarity:4, type:'tool',    minPrice:900,  maxPrice:2200, weight:2  },

  // ELEMENTAL
  frozen_heart: { name:'Frozen Heart',   rarity:4, type:'gem',     minPrice:1000, maxPrice:2500, weight:2  },
  fire_gem:     { name:'Inferno Gem',    rarity:4, type:'gem',     minPrice:1100, maxPrice:2800, weight:2  },
  nature_staff: { name:'Nature Staff',   rarity:3, type:'tool',    minPrice:300,  maxPrice:700,  weight:5  },
  ancient_tree: { name:'Ancient Tree',   rarity:4, type:'block',   minPrice:1000, maxPrice:2500, weight:2  },
  sky_crystal:  { name:'Sky Crystal',    rarity:4, type:'crystal', minPrice:1100, maxPrice:2800, weight:2  },
  warden_heart: { name:'Warden Heart',   rarity:5, type:'gem',     minPrice:4000, maxPrice:10000,weight:1  },
  echo_shard:   { name:'Echo Shard',     rarity:4, type:'gem',     minPrice:1200, maxPrice:3000, weight:2  },
  scarab_gem:   { name:'Scarab Gem',     rarity:3, type:'gem',     minPrice:200,  maxPrice:500,  weight:6  },
  jungle_idol:  { name:'Jungle Idol',    rarity:3, type:'gem',     minPrice:250,  maxPrice:600,  weight:5  },
  peak_crystal: { name:'Peak Crystal',   rarity:3, type:'crystal', minPrice:280,  maxPrice:650,  weight:5  },
  cave_crystal: { name:'Cave Crystal',   rarity:3, type:'crystal', minPrice:200,  maxPrice:500,  weight:6  },
  beast_fang:   { name:'Beast Fang',     rarity:2, type:'resource',minPrice:60,   maxPrice:160,  weight:12 },
  shadow_blade: { name:'Shadow Blade',   rarity:5, type:'sword',   minPrice:5000, maxPrice:12000,weight:1  },
  dark_essence: { name:'Dark Essence',   rarity:4, type:'gem',     minPrice:1300, maxPrice:3200, weight:2  },
  mythril_ingot:{ name:'Mythril Ingot',  rarity:5, type:'resource',minPrice:3500, maxPrice:9000, weight:1  },
  phoenix_feather:{name:'Phoenix Feather',rarity:5,type:'resource',minPrice:4000, maxPrice:10000,weight:1  },
  dragon_scale: { name:'Dragon Scale',   rarity:5, type:'resource',minPrice:5000, maxPrice:12000,weight:1  },
  spirit_orb:   { name:'Spirit Orb',     rarity:4, type:'gem',     minPrice:1200, maxPrice:3000, weight:2  },
  ghost_cloak:  { name:'Ghost Cloak',    rarity:4, type:'armor',   minPrice:1400, maxPrice:3500, weight:2  },
  time_fragment:{ name:'Time Fragment',  rarity:4, type:'gem',     minPrice:1500, maxPrice:4000, weight:2  },
  ancient_hourglass:{name:'Ancient Hourglass',rarity:5,type:'tool',minPrice:4500, maxPrice:11000,weight:1  },
  portal_frame: { name:'Portal Frame',   rarity:4, type:'block',   minPrice:1800, maxPrice:4500, weight:2  },
  rift_crystal: { name:'Rift Crystal',   rarity:5, type:'crystal', minPrice:5000, maxPrice:12000,weight:1  },
  dimension_shard:{name:'Dimension Shard',rarity:5,type:'crystal', minPrice:5500, maxPrice:13000,weight:1  },
  creator_tool: { name:"Creator's Tool", rarity:6, type:'tool',    minPrice:150000,maxPrice:350000,weight:1},
  world_seed:   { name:'World Seed',     rarity:6, type:'gem',     minPrice:200000,maxPrice:400000,weight:1},
  reality_gem:  { name:'Reality Gem',    rarity:6, type:'gem',     minPrice:250000,maxPrice:500000,weight:1},
  creation_core:{ name:'Creation Core',  rarity:6, type:'crystal', minPrice:300000,maxPrice:500000,weight:1},
  creators_essence:{name:"Creator's Essence",rarity:6,type:'gem', minPrice:200000,maxPrice:300000,weight:1},
  mystery_box:  { name:'Mystery Box',    rarity:2, type:'block',   minPrice:80,   maxPrice:200,  weight:14 },
  golden_mystery:{name:'Golden Mystery Box',rarity:4,type:'block', minPrice:1200, maxPrice:3000, weight:2  },
  rare_mystery: { name:'Rare Mystery Box',rarity:3,type:'block',   minPrice:400,  maxPrice:1000, weight:5  },
  redstone_torch:{name:'Redstone Torch', rarity:1, type:'block',   minPrice:8,    maxPrice:25,   weight:22 },
  observer:     { name:'Observer',       rarity:2, type:'block',   minPrice:40,   maxPrice:100,  weight:14 },
  piston:       { name:'Piston',         rarity:1, type:'block',   minPrice:12,   maxPrice:35,   weight:20 },
  spawner:      { name:'Spawner',        rarity:3, type:'block',   minPrice:300,  maxPrice:700,  weight:5  },
  dungeon_key:  { name:'Dungeon Key',    rarity:4, type:'gem',     minPrice:1000, maxPrice:2500, weight:2  },
  cloud_fragment:{name:'Cloud Fragment', rarity:2, type:'gem',     minPrice:60,   maxPrice:150,  weight:14 },
  sculk:        { name:'Sculk',          rarity:2, type:'block',   minPrice:50,   maxPrice:130,  weight:12 },
  sculk_sensor: { name:'Sculk Sensor',   rarity:3, type:'block',   minPrice:200,  maxPrice:500,  weight:6  },
  cactus_gem:   { name:'Desert Relic',   rarity:3, type:'gem',     minPrice:200,  maxPrice:500,  weight:6  },
  parrot_feather:{name:'Parrot Feather', rarity:2, type:'resource',minPrice:50,   maxPrice:130,  weight:14 },
  goat_horn:    { name:'Goat Horn',      rarity:2, type:'resource',minPrice:60,   maxPrice:150,  weight:12 },
  bat_wing:     { name:'Bat Wing',       rarity:2, type:'resource',minPrice:40,   maxPrice:100,  weight:14 },
  wheat:        { name:'Wheat',          rarity:0, type:'food',    minPrice:1,    maxPrice:5,    weight:35 },
  golden_carrot:{ name:'Golden Carrot',  rarity:2, type:'food',    minPrice:40,   maxPrice:100,  weight:14 },
  bone:         { name:'Bone',           rarity:0, type:'resource',minPrice:2,    maxPrice:8,    weight:32 },
  rotten_flesh: { name:'Rotten Flesh',   rarity:0, type:'food',    minPrice:1,    maxPrice:4,    weight:35 },
  ender_eye:    { name:'Ender Eye',      rarity:3, type:'gem',     minPrice:200,  maxPrice:500,  weight:6  },
  bowstring:    { name:'Bowstring',      rarity:1, type:'resource',minPrice:10,   maxPrice:30,   weight:22 },
  hunter_knife: { name:'Hunter Knife',   rarity:3, type:'sword',   minPrice:250,  maxPrice:600,  weight:5  },
  brick:        { name:'Bricks',         rarity:0, type:'block',   minPrice:2,    maxPrice:8,    weight:32 },
  glass:        { name:'Glass',          rarity:0, type:'block',   minPrice:2,    maxPrice:7,    weight:33 },
  structure_core:{name:'Structure Core', rarity:5, type:'block',   minPrice:3500, maxPrice:9000, weight:1  },
  dye:          { name:'Dye Bundle',     rarity:0, type:'resource',minPrice:2,    maxPrice:8,    weight:32 },
  rainbow_block:{ name:'Rainbow Block',  rarity:4, type:'block',   minPrice:1000, maxPrice:2500, weight:2  },
  lantern:      { name:'Lantern',        rarity:1, type:'block',   minPrice:8,    maxPrice:25,   weight:22 },
  glowstone:    { name:'Glowstone',      rarity:2, type:'block',   minPrice:50,   maxPrice:130,  weight:14 },
  sea_lantern:  { name:'Sea Lantern',    rarity:2, type:'block',   minPrice:55,   maxPrice:140,  weight:12 },
  light_core:   { name:'Light Core',     rarity:5, type:'gem',     minPrice:3500, maxPrice:9000, weight:1  },
  wither_skull: { name:'Wither Skull',   rarity:4, type:'skull',   minPrice:1200, maxPrice:3000, weight:2  },
  blackstone:   { name:'Blackstone',     rarity:1, type:'block',   minPrice:10,   maxPrice:30,   weight:22 },
  ancient_fragment:{name:'Ancient Fragment',rarity:4,type:'gem',   minPrice:1500, maxPrice:4000, weight:2  },
  ancient_relic:{ name:'Ancient Relic',  rarity:5, type:'gem',     minPrice:4000, maxPrice:10000,weight:1  },
  color_banner:  {name:'Rainbow Banner', rarity:3, type:'block',   minPrice:200,  maxPrice:500,  weight:6  },
  glow_lichen:  { name:'Glow Lichen',    rarity:1, type:'block',   minPrice:8,    maxPrice:25,   weight:22 },
  dripstone:    { name:'Dripstone',      rarity:1, type:'block',   minPrice:8,    maxPrice:25,   weight:22 },
};

// ============================================================
//  CASE DEFINITIONS
// ============================================================
const CASES = [
  {
    id:'resources_case', name:'Resources Case', price:12,
    desc:'Basic mining resources from deep underground',
    items:['coal','iron','redstone','gold_ingot','diamond','emerald','nether_star'],
  },
  {
    id:'food_case', name:'Food Case', price:30,
    desc:'Delicious food items for any adventurer',
    items:['bread','carrot','chicken','beef','pumpkin_pie','golden_apple','enchanted_ga'],
  },
  {
    id:'swords_case', name:'Swords Case', price:35,
    desc:'Blades forged in every material known to Minecraft',
    items:['wood_sword','stone_sword','iron_sword','gold_sword','diamond_sword','emerald_sword','netherite_sword'],
  },
  {
    id:'shooting_case', name:'Shooting Case', price:40,
    desc:'Ranged weapons for expert marksmen',
    items:['arrow','bow','crossbow','trident','sniper_bow','god_bow'],
  },
  {
    id:'music_case', name:'Music Case', price:60,
    desc:'Rare music discs from across all dimensions',
    items:['disc_13','disc_cat','disc_blocks','disc_chirp','disc_far','disc_mall','disc_mellohi','disc_stal','disc_strad','disc_ward','disc_11','disc_wait','disc_pigstep'],
  },
  {
    id:'armor_case', name:'Armor Case', price:110,
    desc:'Protective gear from leather to elytra',
    items:['leather_armor','iron_armor','gold_armor','diamond_armor','emerald_armor','netherite_armor','elytra'],
  },
  {
    id:'blocks_case', name:'Blocks Case', price:150,
    desc:'Rare and precious building blocks',
    items:['workbench','chest','golden_block','diamond_block','beacon','command_block'],
  },
  {
    id:'potion_case', name:'Potion Case', price:350,
    desc:'Magical brews with extraordinary effects',
    items:['swift_potion','heal_potion','regen_potion','invis_potion','luck_potion','dragon_breath'],
  },
  {
    id:'emerald_case', name:'Emerald Case', price:600,
    desc:'All emerald-tier items in one case',
    items:['emerald_sword','emerald_armor','emerald','dragon_egg','god_sword','ancient_crown'],
  },
  {
    id:'super_case', name:'Super Case', price:1000,
    desc:'The ultimate mix of epic and divine treasures',
    items:['netherite_sword','god_sword','ultimate_blade','god_armor','elytra','nether_star','dragon_breath'],
  },
  {
    id:'tools_case', name:'Tools Case', price:75,
    desc:'Mining tools from every era of crafting',
    items:['wood_pick','stone_pick','iron_pick','diamond_pick','netherite_pick','wood_axe','iron_axe','diamond_axe','builder_wand'],
  },
  {
    id:'gems_case', name:'Gems Case', price:200,
    desc:'Crystalline treasures from every biome',
    items:['quartz','amethyst','ruby','sapphire','black_diamond','dragon_egg','universe_crystal'],
  },
  {
    id:'nether_case', name:'Nether Case', price:450,
    desc:'Scorching items from the hellish Nether realm',
    items:['netherrack','soul_sand','magma_cream','blaze_rod','netherite','fire_gem','warden_heart'],
  },
  {
    id:'end_case', name:'End Case', price:800,
    desc:'Mysterious artifacts from The End dimension',
    items:['end_stone','chorus_fruit','ender_pearl','shulker_shell','dragon_head','dragon_egg'],
  },
  {
    id:'enchanted_case', name:'Enchanted Case', price:550,
    desc:'Books imbued with powerful enchantments',
    items:['book_i','book_iii','mending','sharpness_v','luck_potion','dragon_breath'],
  },
  {
    id:'ocean_case', name:'Ocean Case', price:120,
    desc:'Treasures hidden beneath the ocean waves',
    items:['kelp','tropical_fish','prismarine','trident','heart_of_sea'],
  },
  {
    id:'village_case', name:'Village Case', price:90,
    desc:'Items traded and treasured by villagers',
    items:['hay_bale','bell','golden_carrot','mending','totem','builder_wand'],
  },
  {
    id:'rare_blocks_case', name:'Rare Blocks Case', price:380,
    desc:'The rarest blocks in all of Minecraft',
    items:['sculk','ancient_debris','glowstone','beacon','command_block','reinforced_ds'],
  },
  {
    id:'mega_sword_case', name:'Mega Sword Case', price:700,
    desc:'The most powerful blades ever forged',
    items:['netherite_sword','fire_sword','god_sword','ultimate_blade','shadow_blade','galaxy_sword'],
  },
  {
    id:'mega_armor_case', name:'Mega Armor Case', price:850,
    desc:'Legendary armor sets fit for gods',
    items:['netherite_armor','elytra','god_armor','dragon_head','totem','ghost_cloak'],
  },
  {
    id:'lucky_case', name:'Lucky Case', price:1500,
    desc:'Blessed by fortune itself — anything can happen',
    items:['lucky_block','golden_lucky','rainbow_lucky','infinity_stone','universe_crystal'],
  },
  {
    id:'ancient_case', name:'Ancient Case', price:2000,
    desc:'Relics from civilizations long forgotten',
    items:['ancient_debris','ancient_fragment','ancient_relic','ancient_crown','ancient_hourglass'],
  },
  {
    id:'cosmic_case', name:'Cosmic Case', price:3500,
    desc:'Fragments of stars and galaxies themselves',
    items:['star_fragment','galaxy_sword','universe_crystal','sky_crystal','void_pearl','reality_gem'],
  },
  {
    id:'ultimate_case', name:'Ultimate Case', price:5000,
    desc:'Only the absolute rarest items exist here',
    items:['ultimate_blade','god_armor','god_bow','infinity_stone','creation_core','reality_gem'],
  },
  {
    id:'mystery_case', name:'Mystery Case', price:500,
    desc:'What\'s inside? No one knows until you open it',
    items:['mystery_box','rare_mystery','golden_mystery','lucky_block','golden_lucky'],
  },
  {
    id:'wizard_case', name:'Wizard Case', price:650,
    desc:'Magical artifacts from ancient wizard towers',
    items:['wizard_hat','magic_wand','wizard_staff','luck_potion','mending','ancient_crown'],
  },
  {
    id:'ice_case', name:'Ice Case', price:300,
    desc:'Frozen treasures from the coldest peaks',
    items:['diamond','frozen_heart','sky_crystal','star_fragment','universe_crystal'],
  },
  {
    id:'fire_case', name:'Fire Case', price:400,
    desc:'Blazing items forged in lava and flame',
    items:['magma_cream','blaze_rod','fire_gem','fire_sword','netherite','dragon_breath'],
  },
  {
    id:'nature_case', name:'Nature Case', price:250,
    desc:'Natural wonders from ancient forests',
    items:['kelp','wheat','parrot_feather','nature_staff','ancient_tree','jungle_idol'],
  },
  {
    id:'god_case', name:'God Case', price:10000,
    desc:'Reserved for the most powerful beings in existence',
    items:['god_sword','god_armor','god_bow','creators_essence','infinity_stone','creation_core'],
  },
  {
    id:'tech_case', name:'Tech Case', price:1200,
    desc:'Redstone engineering at its finest',
    items:['redstone_torch','observer','piston','command_block','structure_core','builder_wand'],
  },
  {
    id:'dungeon_case', name:'Dungeon Case', price:950,
    desc:'Loot from deep within monster-infested dungeons',
    items:['spawner','ancient_debris','dungeon_key','beast_fang','shadow_blade','warden_heart'],
  },
  {
    id:'sky_case', name:'Sky Case', price:700,
    desc:'High-altitude treasures from the clouds above',
    items:['cloud_fragment','parrot_feather','elytra','sky_crystal','star_fragment'],
  },
  {
    id:'deep_dark_case', name:'Deep Dark Case', price:1800,
    desc:'Horrors and wonders from the abyssal Deep Dark',
    items:['sculk','sculk_sensor','warden_heart','echo_shard','dark_essence','shadow_blade'],
  },
  {
    id:'desert_case', name:'Desert Case', price:220,
    desc:'Ancient relics buried under desert sands',
    items:['bone','glowstone','cactus_gem','scarab_gem','ancient_fragment','totem'],
  },
  {
    id:'jungle_case', name:'Jungle Case', price:260,
    desc:'Exotic artifacts from deep jungle temples',
    items:['wheat','parrot_feather','jungle_idol','emerald','ancient_relic','totem'],
  },
  {
    id:'mountain_case', name:'Mountain Case', price:500,
    desc:'Treasures from the highest peaks in the land',
    items:['iron','diamond','goat_horn','peak_crystal','emerald','star_fragment'],
  },
  {
    id:'cavern_case', name:'Cavern Case', price:650,
    desc:'Glittering crystals from deep underground caverns',
    items:['glow_lichen','dripstone','cave_crystal','bat_wing','amethyst','warden_heart'],
  },
  {
    id:'farming_case', name:'Farming Case', price:140,
    desc:'Tools and crops from the finest farms',
    items:['wheat','carrot','golden_hoe','golden_carrot','farmer_tool','pumpkin_pie'],
  },
  {
    id:'beast_case', name:'Beast Case', price:400,
    desc:'Drops from the most fearsome monsters',
    items:['bone','rotten_flesh','beast_fang','ender_eye','warden_heart','dragon_head'],
  },
  {
    id:'hunter_case', name:'Hunter Case', price:480,
    desc:'Gear for the deadliest hunters in the realm',
    items:['arrow','bowstring','hunter_knife','sniper_bow','god_bow','beast_fang'],
  },
  {
    id:'builder_case', name:'Builder Case', price:300,
    desc:'Essential tools and blocks for master builders',
    items:['brick','glass','golden_block','builder_wand','structure_core','command_block'],
  },
  {
    id:'color_case', name:'Color Case', price:200,
    desc:'Every color of the rainbow in one case',
    items:['dye','glowstone','color_banner','rainbow_block','universe_crystal'],
  },
  {
    id:'light_case', name:'Light Case', price:350,
    desc:'Luminous items that shine in the darkness',
    items:['lantern','glowstone','sea_lantern','light_core','star_fragment','beacon'],
  },
  {
    id:'shadow_case', name:'Shadow Case', price:900,
    desc:'Dark artifacts from shadow realms beyond',
    items:['wither_skull','blackstone','shadow_blade','dark_essence','void_pearl','dimension_shard'],
  },
  {
    id:'mythic_case', name:'Mythic Case', price:2500,
    desc:'Items of mythological power and legend',
    items:['mythril_ingot','phoenix_feather','dragon_scale','ancient_crown','mythology_staff','galaxy_sword'],
  },
  {
    id:'spirit_case', name:'Spirit Case', price:1300,
    desc:'Ethereal items from the spirit world',
    items:['soul_sand','spirit_orb','ghost_cloak','ancient_relic','void_pearl','light_core'],
  },
  {
    id:'time_case', name:'Time Case', price:4000,
    desc:'Artifacts that manipulate the very flow of time',
    items:['time_fragment','ancient_hourglass','time_core','dimension_shard','reality_gem'],
  },
  {
    id:'dimension_case', name:'Dimension Case', price:6000,
    desc:'Relics from dimensions beyond comprehension',
    items:['portal_frame','rift_crystal','void_pearl','dimension_shard','universe_crystal','infinity_stone'],
  },
  {
    id:'creator_case', name:'Creator Case', price:15000,
    desc:'Only the creator of all worlds can unlock these',
    items:['creator_tool','world_seed','reality_gem','creation_core','creators_essence','infinity_stone'],
  },
];

// Fix any item references that don't exist
CASES.forEach(c => {
  c.items = c.items.filter(key => ALL_ITEMS[key]);
  if(c.items.length === 0) c.items = ['diamond','emerald','nether_star'];
});

function generateItem(key) {
  const def = ALL_ITEMS[key];
  if(!def) return null;
  const durability = Math.floor(Math.random() * 100) + 1;
  const value = Math.round(def.minPrice + (def.maxPrice - def.minPrice) * (durability / 100));
  return {
    id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2,9),
    key,
    name: def.name,
    rarity: def.rarity,
    type: def.type,
    minPrice: def.minPrice,
    maxPrice: def.maxPrice,
    value,
    durability,
    svg: generateSVG(def.type, def.rarity),
  };
}

function weightedRandom(items) {
  const pool = items.filter(k => ALL_ITEMS[k]);
  const totalWeight = pool.reduce((s, k) => s + (ALL_ITEMS[k].weight || 1), 0);
  let rand = Math.random() * totalWeight;
  for(const k of pool) {
    rand -= (ALL_ITEMS[k].weight || 1);
    if(rand <= 0) return k;
  }
  return pool[pool.length - 1];
}

function openCase(caseId) {
  const c = CASES.find(x => x.id === caseId);
  if(!c) return null;
  const winnerKey = weightedRandom(c.items);
  const reel = [];
  for(let i=0;i<30;i++) reel.push(generateItem(weightedRandom(c.items)));
  const winner = generateItem(winnerKey);
  reel.push(winner);
  for(let i=0;i<15;i++) reel.push(generateItem(weightedRandom(c.items)));
  return { winner, reel };
}
