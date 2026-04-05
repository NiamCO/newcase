// ============================================================
//  ADVANCED CASE ICON SVG GENERATORS
//  Each case gets a unique, detailed, cinematic SVG icon
// ============================================================

function getCaseIcon(caseId) {
  const icons = {

resources_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="rc_bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a0a00"/>
      <stop offset="100%" stop-color="#0d0500"/>
    </radialGradient>
    <linearGradient id="rc_diamond" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a8edff"/>
      <stop offset="50%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <filter id="rc_glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#rc_bg)"/>
  <!-- Coal pixel cluster -->
  <rect x="14" y="70" width="10" height="10" rx="2" fill="#374151"/>
  <rect x="16" y="68" width="7" height="7" rx="1" fill="#4b5563"/>
  <!-- Iron ingot -->
  <rect x="30" y="72" width="14" height="10" rx="3" fill="#9ca3af"/>
  <rect x="32" y="70" width="10" height="6" rx="2" fill="#d1d5db"/>
  <rect x="34" y="68" width="6" height="4" rx="1" fill="#e5e7eb"/>
  <!-- Gold ingot -->
  <rect x="50" y="72" width="14" height="10" rx="3" fill="#b45309"/>
  <rect x="52" y="70" width="10" height="6" rx="2" fill="#f59e0b"/>
  <rect x="54" y="68" width="6" height="4" rx="1" fill="#fcd34d"/>
  <!-- Redstone dust -->
  <circle cx="90" cy="78" r="6" fill="#ef4444" opacity="0.8" filter="url(#rc_glow)"/>
  <circle cx="90" cy="78" r="4" fill="#fca5a5"/>
  <!-- BIG Diamond center -->
  <polygon points="60,20 78,38 70,62 50,62 42,38" fill="url(#rc_diamond)" filter="url(#rc_glow)"/>
  <polygon points="60,20 78,38 60,44 42,38" fill="#bfdbfe" opacity="0.7"/>
  <polygon points="60,44 78,38 70,62 50,62 42,38" fill="#3b82f6" opacity="0.5"/>
  <line x1="60" y1="20" x2="60" y2="62" stroke="white" stroke-width="0.8" opacity="0.3"/>
  <!-- Nether star sparkles -->
  <circle cx="20" cy="28" r="2" fill="#fbbf24" opacity="0.9"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="100" cy="22" r="1.5" fill="#06b6d4" opacity="0.8"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="15" cy="50" r="1.5" fill="#22c55e" opacity="0.7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.3s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="55" r="2" fill="#a855f7" opacity="0.8"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.8s" repeatCount="indefinite"/></circle>
  <!-- Emerald -->
  <polygon points="75,26 82,34 79,46 71,46 68,34" fill="#22c55e" opacity="0.9" filter="url(#rc_glow)"/>
  <polygon points="75,26 82,34 75,38 68,34" fill="#86efac" opacity="0.7"/>
</svg>`,

food_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="fc_bg" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#1a0d00"/>
      <stop offset="100%" stop-color="#0a0600"/>
    </radialGradient>
    <filter id="fc_glow"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#fc_bg)"/>
  <!-- Golden Apple (hero) -->
  <circle cx="60" cy="52" r="28" fill="#ca8a04" opacity="0.9" filter="url(#fc_glow)"/>
  <circle cx="60" cy="52" r="25" fill="#fbbf24"/>
  <circle cx="60" cy="52" r="21" fill="#fcd34d"/>
  <ellipse cx="52" cy="42" rx="7" ry="5" fill="#fef08a" opacity="0.5"/>
  <!-- Apple stem -->
  <rect x="58" y="22" width="4" height="8" rx="2" fill="#15803d"/>
  <path d="M62,26 Q68,20 72,24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/>
  <!-- Crown glow -->
  <circle cx="60" cy="52" r="30" fill="none" stroke="#fbbf24" stroke-width="1.5" opacity="0.4" filter="url(#fc_glow)"/>
  <!-- Small items orbiting -->
  <rect x="16" y="60" width="14" height="10" rx="3" fill="#92400e"/>
  <rect x="18" y="58" width="10" height="6" rx="2" fill="#d97706"/>
  <text x="23" y="66" font-size="8" fill="#fcd34d" text-anchor="middle" font-family="monospace">🍞</text>
  <!-- Carrot -->
  <polygon points="94,56 100,70 88,70" fill="#ea580c"/>
  <line x1="94" y1="56" x2="92" y2="50" stroke="#16a34a" stroke-width="1.5"/>
  <line x1="94" y1="56" x2="94" y2="49" stroke="#16a34a" stroke-width="1.5"/>
  <line x1="94" y1="56" x2="96" y2="50" stroke="#16a34a" stroke-width="1.5"/>
  <!-- sparkles -->
  <circle cx="30" cy="30" r="2" fill="#fbbf24"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite"/></circle>
  <circle cx="95" cy="32" r="1.5" fill="#22c55e"><animate attributeName="opacity" values="1;0.1;1" dur="2.2s" repeatCount="indefinite"/></circle>
  <circle cx="20" cy="85" r="1.5" fill="#f97316"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="100" cy="88" r="2" fill="#fbbf24"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite"/></circle>
  <!-- Pumpkin pie bottom -->
  <ellipse cx="60" cy="96" rx="22" ry="8" fill="#b45309" opacity="0.7"/>
  <ellipse cx="60" cy="93" rx="22" ry="8" fill="#d97706" opacity="0.8"/>
  <ellipse cx="60" cy="91" rx="18" ry="5" fill="#f59e0b"/>
</svg>`,

swords_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="sc_blade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0f2fe"/>
      <stop offset="40%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="sc_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c0820"/>
      <stop offset="100%" stop-color="#050412"/>
    </linearGradient>
    <filter id="sc_glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#sc_bg)"/>
  <!-- Background swords (dim) -->
  <rect x="20" y="15" width="5" height="55" rx="2" fill="#6b7280" opacity="0.3" transform="rotate(-20,22,42)"/>
  <rect x="95" y="15" width="5" height="55" rx="2" fill="#22c55e" opacity="0.3" transform="rotate(20,97,42)"/>
  <!-- Main Diamond Sword (hero) -->
  <rect x="56" y="8" width="8" height="65" rx="2" fill="url(#sc_blade)" filter="url(#sc_glow)"/>
  <rect x="56" y="8" width="8" height="65" rx="2" fill="none" stroke="#bfdbfe" stroke-width="1"/>
  <!-- Crossguard -->
  <rect x="38" y="52" width="44" height="8" rx="4" fill="#1d4ed8"/>
  <rect x="40" y="53" width="40" height="5" rx="3" fill="#3b82f6"/>
  <!-- Handle -->
  <rect x="56" y="72" width="8" height="22" rx="3" fill="#78350f"/>
  <rect x="57" y="74" width="6" height="18" rx="2" fill="#92400e"/>
  <!-- Pommel -->
  <circle cx="60" cy="96" r="5" fill="#1d4ed8"/>
  <circle cx="60" cy="96" r="3" fill="#3b82f6"/>
  <!-- Glow aura -->
  <rect x="54" y="6" width="12" height="69" rx="4" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.5" filter="url(#sc_glow)"/>
  <!-- sparkles along blade -->
  <circle cx="60" cy="18" r="2" fill="white"><animate attributeName="opacity" values="1;0.1;1" dur="1.2s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="36" r="1.5" fill="#93c5fd"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.8s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="54" r="1.5" fill="white"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="22" cy="25" r="1.5" fill="#6b7280" opacity="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite"/></circle>
  <circle cx="98" cy="25" r="1.5" fill="#22c55e" opacity="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.1s" repeatCount="indefinite"/></circle>
</svg>`,

shooting_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="shc_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1628"/>
      <stop offset="100%" stop-color="#050d1a"/>
    </linearGradient>
    <filter id="shc_glow"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#shc_bg)"/>
  <!-- Bow (hero) -->
  <path d="M30,15 Q10,60 30,105" fill="none" stroke="#92400e" stroke-width="5" stroke-linecap="round"/>
  <path d="M30,15 Q10,60 30,105" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>
  <!-- Bowstring -->
  <line x1="30" y1="15" x2="30" y2="105" stroke="#e5e7eb" stroke-width="1.5"/>
  <!-- Arrow -->
  <line x1="30" y1="60" x2="100" y2="60" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" filter="url(#shc_glow)"/>
  <polygon points="100,60 88,54 88,66" fill="#fbbf24"/>
  <!-- Arrow feathers -->
  <path d="M34,60 Q38,54 42,56" fill="none" stroke="#ef4444" stroke-width="2"/>
  <path d="M34,60 Q38,66 42,64" fill="none" stroke="#ef4444" stroke-width="2"/>
  <!-- Trident top right -->
  <line x1="95" y1="15" x2="95" y2="55" stroke="#06b6d4" stroke-width="3" stroke-linecap="round" filter="url(#shc_glow)"/>
  <line x1="85" y1="15" x2="85" y2="28" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="105" y1="15" x2="105" y2="28" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M85,28 Q90,36 95,32 Q100,36 105,28" fill="none" stroke="#06b6d4" stroke-width="2"/>
  <!-- Crossbow bottom -->
  <rect x="55" y="85" width="35" height="6" rx="3" fill="#78350f"/>
  <rect x="58" y="82" width="8" height="12" rx="2" fill="#92400e"/>
  <line x1="58" y1="88" x2="90" y2="88" stroke="#d97706" stroke-width="1.5"/>
  <!-- sparkles -->
  <circle cx="65" cy="30" r="2" fill="#fbbf24"><animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <circle cx="50" cy="80" r="1.5" fill="#06b6d4"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite"/></circle>
</svg>`,

music_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="mc_bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0d0820"/>
      <stop offset="100%" stop-color="#060410"/>
    </radialGradient>
    <filter id="mc_glow"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#mc_bg)"/>
  <!-- Big disc (hero) -->
  <circle cx="60" cy="62" r="38" fill="#1e1b4b" filter="url(#mc_glow)"/>
  <circle cx="60" cy="62" r="36" fill="#312e81"/>
  <circle cx="60" cy="62" r="30" fill="#1e1b4b"/>
  <circle cx="60" cy="62" r="24" fill="#4c1d95" opacity="0.8"/>
  <circle cx="60" cy="62" r="18" fill="#1e1b4b"/>
  <circle cx="60" cy="62" r="10" fill="#7c3aed" opacity="0.6"/>
  <circle cx="60" cy="62" r="5" fill="#a855f7"/>
  <circle cx="60" cy="62" r="2" fill="#c084fc"/>
  <!-- Glow ring -->
  <circle cx="60" cy="62" r="38" fill="none" stroke="#a855f7" stroke-width="2" opacity="0.6" filter="url(#mc_glow)"/>
  <!-- Music notes -->
  <text x="32" y="32" font-size="18" fill="#f59e0b" font-family="serif" filter="url(#mc_glow)">♪</text>
  <text x="80" y="28" font-size="14" fill="#22c55e" font-family="serif" filter="url(#mc_glow)">♫</text>
  <text x="18" y="75" font-size="12" fill="#06b6d4" font-family="serif">♩</text>
  <text x="96" y="72" font-size="12" fill="#f97316" font-family="serif">♬</text>
  <!-- sparkles -->
  <circle cx="25" cy="45" r="2" fill="#a855f7"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="97" cy="48" r="1.5" fill="#f59e0b"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.9s" repeatCount="indefinite"/></circle>
  <circle cx="42" cy="108" r="1.5" fill="#22c55e"><animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.3s" repeatCount="indefinite"/></circle>
</svg>`,

armor_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="ac_diamond" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a8edff"/>
      <stop offset="50%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="ac_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0c1020"/>
      <stop offset="100%" stop-color="#060810"/>
    </linearGradient>
    <filter id="ac_glow"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#ac_bg)"/>
  <!-- Chestplate hero -->
  <path d="M25,30 L60,18 L95,30 L95,75 Q95,100 60,108 Q25,100 25,75 Z" fill="url(#ac_diamond)" opacity="0.25" filter="url(#ac_glow)"/>
  <path d="M25,30 L60,18 L95,30 L95,75 Q95,100 60,108 Q25,100 25,75 Z" fill="none" stroke="url(#ac_diamond)" stroke-width="3"/>
  <!-- Shoulder pads -->
  <path d="M25,30 Q15,36 18,48 L28,44 Z" fill="#0ea5e9" opacity="0.7"/>
  <path d="M95,30 Q105,36 102,48 L92,44 Z" fill="#0ea5e9" opacity="0.7"/>
  <!-- Chest detail lines -->
  <line x1="60" y1="18" x2="60" y2="108" stroke="#bfdbfe" stroke-width="1.5" opacity="0.4"/>
  <path d="M30,45 Q60,52 90,45" fill="none" stroke="#60a5fa" stroke-width="1.5" opacity="0.6"/>
  <path d="M28,60 Q60,68 92,60" fill="none" stroke="#60a5fa" stroke-width="1.2" opacity="0.4"/>
  <!-- Center gem -->
  <circle cx="60" cy="64" r="8" fill="#06b6d4" filter="url(#ac_glow)"/>
  <circle cx="60" cy="64" r="5" fill="#a5f3fc"/>
  <!-- Elytra wings hinted -->
  <path d="M25,75 Q8,65 12,90 Q20,100 30,95" fill="#4c1d95" opacity="0.5"/>
  <path d="M95,75 Q112,65 108,90 Q100,100 90,95" fill="#4c1d95" opacity="0.5"/>
  <!-- sparkles -->
  <circle cx="18" cy="25" r="2" fill="#60a5fa"><animate attributeName="opacity" values="1;0.2;1" dur="1.7s" repeatCount="indefinite"/></circle>
  <circle cx="102" cy="25" r="2" fill="#60a5fa"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="2.1s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="12" r="1.5" fill="white"><animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite"/></circle>
</svg>`,

blocks_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bc_gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fcd34d"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <linearGradient id="bc_dia" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a8edff"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="bc_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0d18"/>
      <stop offset="100%" stop-color="#05080f"/>
    </linearGradient>
    <filter id="bc_glow"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#bc_bg)"/>
  <!-- Beacon beam -->
  <rect x="52" y="5" width="16" height="115" fill="#06b6d4" opacity="0.08"/>
  <!-- Diamond Block (hero) -->
  <polygon points="60,22 88,38 88,70 60,86 32,70 32,38" fill="url(#bc_dia)" opacity="0.35" filter="url(#bc_glow)"/>
  <polygon points="60,22 88,38 60,54 32,38" fill="#bfdbfe" opacity="0.5"/>
  <polygon points="32,38 60,54 60,86 32,70" fill="#3b82f6" opacity="0.4"/>
  <polygon points="88,38 60,54 60,86 88,70" fill="#1d4ed8" opacity="0.5"/>
  <polygon points="60,22 88,38 88,70 60,86 32,70 32,38" fill="none" stroke="#93c5fd" stroke-width="2"/>
  <!-- Gold Block (background left) -->
  <polygon points="20,50 36,42 36,62 20,70" fill="url(#bc_gold)" opacity="0.6"/>
  <polygon points="20,50 36,42 28,36 12,44" fill="#fcd34d" opacity="0.5"/>
  <!-- Beacon top right -->
  <rect x="82" y="52" width="20" height="18" rx="2" fill="#374151"/>
  <rect x="84" y="50" width="16" height="6" rx="2" fill="#4b5563"/>
  <rect x="87" y="42" width="10" height="10" rx="1" fill="#06b6d4" filter="url(#bc_glow)"/>
  <!-- Beacon beam glow -->
  <rect x="90" y="5" width="4" height="46" fill="#06b6d4" opacity="0.4" filter="url(#bc_glow)"/>
  <!-- sparkles -->
  <circle cx="15" cy="30" r="2" fill="#fbbf24"><animate attributeName="opacity" values="1;0.2;1" dur="1.8s" repeatCount="indefinite"/></circle>
  <circle cx="108" cy="38" r="1.5" fill="#06b6d4"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="15" r="2" fill="#bfdbfe"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle>
</svg>`,

potion_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="pc_liquid" cx="50%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#4c1d95"/>
    </radialGradient>
    <linearGradient id="pc_bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0820"/>
      <stop offset="100%" stop-color="#060410"/>
    </linearGradient>
    <filter id="pc_glow"><feGaussianBlur stdDeviation="5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#pc_bg)"/>
  <!-- Glow aura -->
  <ellipse cx="60" cy="72" rx="32" ry="32" fill="#7c3aed" opacity="0.15" filter="url(#pc_glow)"/>
  <!-- Potion bottle hero -->
  <rect x="48" y="18" width="24" height="14" rx="4" fill="#374151"/>
  <rect x="50" y="16" width="20" height="8" rx="3" fill="#4b5563"/>
  <rect x="53" y="10" width="14" height="8" rx="3" fill="#6b7280"/>
  <path d="M32,38 Q26,52 26,72 Q26,100 60,100 Q94,100 94,72 Q94,52 88,38 Z" fill="url(#pc_liquid)" opacity="0.9"/>
  <path d="M32,38 Q26,52 26,72 Q26,100 60,100 Q94,100 94,72 Q94,52 88,38 Z" fill="none" stroke="#c084fc" stroke-width="2"/>
  <!-- Liquid surface -->
  <ellipse cx="60" cy="55" rx="24" ry="6" fill="#c084fc" opacity="0.5"/>
  <!-- Bubbles -->
  <circle cx="50" cy="70" r="4" fill="#e9d5ff" opacity="0.4"/>
  <circle cx="70" cy="80" r="3" fill="#e9d5ff" opacity="0.3"/>
  <circle cx="58" cy="85" r="2" fill="#e9d5ff" opacity="0.3"/>
  <!-- Highlight -->
  <ellipse cx="44" cy="62" rx="6" ry="10" fill="white" opacity="0.1"/>
  <!-- Small potions background -->
  <rect x="10" y="55" width="10" height="16" rx="3" fill="#22c55e" opacity="0.5"/>
  <rect x="100" y="55" width="10" height="16" rx="3" fill="#ef4444" opacity="0.5"/>
  <!-- sparkles -->
  <circle cx="20" cy="30" r="2" fill="#a855f7"><animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <circle cx="100" cy="28" r="1.5" fill="#06b6d4"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.1s" repeatCount="indefinite"/></circle>
  <circle cx="15" cy="90" r="1.5" fill="#22c55e"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.9s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="90" r="2" fill="#fbbf24"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.4s" repeatCount="indefinite"/></circle>
</svg>`,

god_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="gc_bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a0a00"/>
      <stop offset="60%" stop-color="#0d0500"/>
      <stop offset="100%" stop-color="#030200"/>
    </radialGradient>
    <radialGradient id="gc_aura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gc_sword" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <filter id="gc_glow"><feGaussianBlur stdDeviation="6"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="gc_glow2"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#gc_bg)"/>
  <!-- Massive aura -->
  <circle cx="60" cy="60" r="55" fill="url(#gc_aura)" filter="url(#gc_glow)"/>
  <!-- God sword hero -->
  <rect x="56" y="6" width="8" height="72" rx="2" fill="url(#gc_sword)" filter="url(#gc_glow)"/>
  <polygon points="60,6 56,18 64,18" fill="#fef9c3"/>
  <!-- Crossguard -->
  <rect x="36" y="55" width="48" height="10" rx="5" fill="#b45309"/>
  <rect x="38" y="56" width="44" height="7" rx="4" fill="#d97706"/>
  <rect x="40" y="57" width="40" height="5" rx="3" fill="#fbbf24"/>
  <!-- Handle -->
  <rect x="56" y="78" width="8" height="26" rx="3" fill="#78350f"/>
  <rect x="57" y="80" width="6" height="22" rx="2" fill="#92400e"/>
  <!-- Pommel -->
  <circle cx="60" cy="106" r="7" fill="#b45309"/>
  <circle cx="60" cy="106" r="4.5" fill="#fbbf24"/>
  <circle cx="60" cy="106" r="2" fill="#fef08a"/>
  <!-- Wing decorations -->
  <path d="M36,60 Q18,50 14,70 Q18,82 30,80" fill="#fbbf24" opacity="0.3" filter="url(#gc_glow2)"/>
  <path d="M84,60 Q102,50 106,70 Q102,82 90,80" fill="#fbbf24" opacity="0.3" filter="url(#gc_glow2)"/>
  <!-- Star burst around sword tip -->
  <circle cx="60" cy="12" r="8" fill="#fbbf24" opacity="0.2" filter="url(#gc_glow)"/>
  <!-- Sparkles (many for god tier) -->
  <circle cx="15" cy="15" r="3" fill="#fbbf24"><animate attributeName="opacity" values="1;0.1;1" dur="1.1s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="15" r="2.5" fill="#fbbf24"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="15" cy="105" r="2" fill="#fbbf24"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.7s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="105" r="3" fill="#fbbf24"><animate attributeName="opacity" values="1;0.2;1" dur="1.3s" repeatCount="indefinite"/></circle>
  <circle cx="20" cy="60" r="2" fill="#fef08a"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="100" cy="60" r="2" fill="#fef08a"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.6s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="16" r="1.5" fill="white"><animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite"/></circle>
</svg>`,

creator_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="cc_bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0a0020"/>
      <stop offset="100%" stop-color="#000010"/>
    </radialGradient>
    <linearGradient id="cc_galaxy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff6ef7"/>
      <stop offset="25%" stop-color="#a855f7"/>
      <stop offset="50%" stop-color="#3b82f6"/>
      <stop offset="75%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <filter id="cc_glow"><feGaussianBlur stdDeviation="6"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#cc_bg)"/>
  <!-- Galaxy swirl background -->
  <circle cx="60" cy="60" r="50" fill="none" stroke="url(#cc_galaxy)" stroke-width="20" opacity="0.08" filter="url(#cc_glow)"/>
  <circle cx="60" cy="60" r="35" fill="none" stroke="url(#cc_galaxy)" stroke-width="12" opacity="0.12" filter="url(#cc_glow)"/>
  <!-- World Seed (diamond sphere) -->
  <circle cx="60" cy="58" r="32" fill="url(#cc_galaxy)" opacity="0.2" filter="url(#cc_glow)"/>
  <circle cx="60" cy="58" r="28" fill="none" stroke="url(#cc_galaxy)" stroke-width="2.5"/>
  <!-- Continent shapes -->
  <path d="M40,48 Q50,42 62,46 Q68,52 64,60 Q56,66 46,62 Z" fill="url(#cc_galaxy)" opacity="0.5"/>
  <path d="M68,50 Q76,46 82,52 Q80,60 74,62 Z" fill="url(#cc_galaxy)" opacity="0.4"/>
  <!-- Orbit rings -->
  <ellipse cx="60" cy="58" rx="42" ry="14" fill="none" stroke="url(#cc_galaxy)" stroke-width="1.5" opacity="0.4" transform="rotate(-20,60,58)"/>
  <ellipse cx="60" cy="58" rx="42" ry="14" fill="none" stroke="url(#cc_galaxy)" stroke-width="1" opacity="0.3" transform="rotate(30,60,58)"/>
  <!-- Orbit dot -->
  <circle cx="102" cy="50" r="4" fill="#ff6ef7" filter="url(#cc_glow)"/>
  <circle cx="18" cy="66" r="3" fill="#06b6d4" filter="url(#cc_glow)"/>
  <!-- Infinity symbol center -->
  <path d="M48,58 Q52,50 60,58 Q68,66 72,58 Q68,50 60,58 Q52,66 48,58 Z" fill="url(#cc_galaxy)" opacity="0.8" filter="url(#cc_glow)"/>
  <!-- Many sparkles for infinity tier -->
  <circle cx="14" cy="14" r="3" fill="#ff6ef7"><animate attributeName="opacity" values="1;0.1;1" dur="0.8s" repeatCount="indefinite"/></circle>
  <circle cx="106" cy="14" r="2.5" fill="#a855f7"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.1s" repeatCount="indefinite"/></circle>
  <circle cx="14" cy="106" r="2" fill="#3b82f6"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="106" cy="106" r="3" fill="#06b6d4"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="10" r="2" fill="#ff6ef7"><animate attributeName="opacity" values="1;0.3;1" dur="0.7s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="110" r="2" fill="#22c55e"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.2s" repeatCount="indefinite"/></circle>
  <circle cx="10" cy="60" r="2.5" fill="#fbbf24"><animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="110" cy="60" r="2" fill="#ff6ef7"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="0.9s" repeatCount="indefinite"/></circle>
</svg>`,

  };

  // Generic fallback icons by price tier
  function getGenericIcon(caseData) {
    const p = caseData.price;
    let color1, color2, symbol;
    if(p >= 10000) { color1='#fbbf24'; color2='#b45309'; symbol='★'; }
    else if(p >= 5000) { color1='#ff6ef7'; color2='#a855f7'; symbol='∞'; }
    else if(p >= 2000) { color1='#06b6d4'; color2='#0e7490'; symbol='◈'; }
    else if(p >= 1000) { color1='#a855f7'; color2='#6d28d9'; symbol='⬡'; }
    else if(p >= 500)  { color1='#fbbf24'; color2='#92400e'; symbol='◆'; }
    else if(p >= 200)  { color1='#3b82f6'; color2='#1d4ed8'; symbol='●'; }
    else if(p >= 100)  { color1='#22c55e'; color2='#15803d'; symbol='◉'; }
    else               { color1='#6b7280'; color2='#374151'; symbol='○'; }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <radialGradient id="gen_bg_${p}" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#0d1020"/>
          <stop offset="100%" stop-color="#060810"/>
        </radialGradient>
        <linearGradient id="gen_g_${p}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}"/>
          <stop offset="100%" stop-color="${color2}"/>
        </linearGradient>
        <filter id="gen_glow_${p}"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="120" height="120" rx="18" fill="url(#gen_bg_${p})"/>
      <circle cx="60" cy="58" r="38" fill="${color1}" opacity="0.1" filter="url(#gen_glow_${p})"/>
      <circle cx="60" cy="58" r="30" fill="none" stroke="url(#gen_g_${p})" stroke-width="2.5"/>
      <circle cx="60" cy="58" r="22" fill="none" stroke="${color1}" stroke-width="1.5" opacity="0.5"/>
      <text x="60" y="68" font-size="28" fill="url(#gen_g_${p})" text-anchor="middle" font-family="serif" filter="url(#gen_glow_${p})">${symbol}</text>
      <circle cx="25" cy="28" r="2.5" fill="${color1}"><animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
      <circle cx="95" cy="28" r="2" fill="${color1}"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite"/></circle>
      <circle cx="25" cy="88" r="1.5" fill="${color1}"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite"/></circle>
      <circle cx="95" cy="88" r="2.5" fill="${color1}"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.4s" repeatCount="indefinite"/></circle>
    </svg>`;
  }

  // Merge in extra icons defined below
  const all = { ...icons, ...EXTRA_ICONS };
  return all[caseId] || getGenericIcon(CASES.find(c=>c.id===caseId)||{price:100});
}

// ============================================================
//  ADDITIONAL CASE ICONS (appended)
// ============================================================
const EXTRA_ICONS = {

tools_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="tc_bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a1020"/><stop offset="100%" stop-color="#050810"/></linearGradient>
    <linearGradient id="tc_g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#9ca3af"/><stop offset="100%" stop-color="#374151"/></linearGradient>
    <filter id="tc_glow"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#tc_bg)"/>
  <!-- Pickaxe hero -->
  <rect x="55" y="30" width="40" height="10" rx="4" fill="url(#tc_g)" transform="rotate(-45,60,60)" filter="url(#tc_glow)"/>
  <polygon points="28,92 20,100 28,100" fill="#9ca3af" transform="rotate(-45,60,60)"/>
  <rect x="56" y="28" width="38" height="14" rx="5" fill="#6b7280" transform="rotate(-45,60,60)"/>
  <rect x="58" y="30" width="34" height="9" rx="4" fill="#9ca3af" transform="rotate(-45,60,60)"/>
  <!-- Axe small -->
  <polygon points="18,20 34,26 28,42 12,36" fill="#d97706" opacity="0.8"/>
  <rect x="28" y="26" width="5" height="50" rx="2" fill="#92400e" transform="rotate(-10,30,50)"/>
  <!-- Netherite pick glow -->
  <circle cx="85" cy="85" r="15" fill="#a855f7" opacity="0.15" filter="url(#tc_glow)"/>
  <circle cx="85" cy="85" r="2" fill="#c084fc"><animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="20" cy="55" r="2" fill="#9ca3af"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite"/></circle>
</svg>`,

gems_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="gmc_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#0d0820"/><stop offset="100%" stop-color="#060412"/></radialGradient>
    <filter id="gmc_glow"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#gmc_bg)"/>
  <!-- Ruby -->
  <polygon points="35,20 50,12 65,20 60,40 40,40" fill="#dc2626" opacity="0.9" filter="url(#gmc_glow)"/>
  <polygon points="35,20 50,12 65,20 50,26" fill="#fca5a5" opacity="0.6"/>
  <!-- Sapphire -->
  <polygon points="20,55 35,47 50,55 45,75 25,75" fill="#3b82f6" opacity="0.9" filter="url(#gmc_glow)"/>
  <polygon points="20,55 35,47 50,55 35,61" fill="#bfdbfe" opacity="0.6"/>
  <!-- Amethyst big -->
  <polygon points="65,50 80,38 95,50 90,78 70,78" fill="#a855f7" opacity="0.9" filter="url(#gmc_glow)"/>
  <polygon points="65,50 80,38 95,50 80,58" fill="#e9d5ff" opacity="0.5"/>
  <!-- Dragon Egg hint -->
  <ellipse cx="50" cy="96" rx="18" ry="14" fill="#06b6d4" opacity="0.3" filter="url(#gmc_glow)"/>
  <ellipse cx="50" cy="96" rx="14" ry="10" fill="none" stroke="#06b6d4" stroke-width="2"/>
  <!-- Sparkles -->
  <circle cx="15" cy="25" r="2" fill="#dc2626"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="30" r="2" fill="#3b82f6"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.8s" repeatCount="indefinite"/></circle>
  <circle cx="100" cy="90" r="2.5" fill="#a855f7"><animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite"/></circle>
</svg>`,

nether_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="nc_bg" cx="50%" cy="60%" r="55%"><stop offset="0%" stop-color="#200a00"/><stop offset="100%" stop-color="#0d0400"/></radialGradient>
    <filter id="nc_glow"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#nc_bg)"/>
  <!-- Lava glow base -->
  <ellipse cx="60" cy="90" rx="50" ry="22" fill="#ef4444" opacity="0.12" filter="url(#nc_glow)"/>
  <!-- Blaze rod hero -->
  <rect x="54" y="16" width="12" height="70" rx="4" fill="#fbbf24" opacity="0.9" filter="url(#nc_glow)"/>
  <rect x="56" y="18" width="8" height="66" rx="3" fill="#fef08a"/>
  <rect x="50" y="30" width="20" height="6" rx="3" fill="#f59e0b"/>
  <rect x="50" y="48" width="20" height="6" rx="3" fill="#f59e0b"/>
  <rect x="50" y="66" width="20" height="6" rx="3" fill="#f59e0b"/>
  <!-- Netherite ingot -->
  <rect x="20" y="70" width="24" height="16" rx="4" fill="#374151"/>
  <rect x="22" y="68" width="20" height="10" rx="3" fill="#4b5563"/>
  <rect x="24" y="66" width="16" height="6" rx="2" fill="#6b7280"/>
  <!-- Fire particles -->
  <circle cx="30" cy="40" r="4" fill="#ef4444" opacity="0.7" filter="url(#nc_glow)"/>
  <circle cx="90" cy="35" r="3" fill="#f97316" opacity="0.8" filter="url(#nc_glow)"/>
  <circle cx="95" cy="70" r="3" fill="#fbbf24" opacity="0.7"><animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.2s" repeatCount="indefinite"/></circle>
  <circle cx="15" cy="60" r="2" fill="#ef4444"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.6s" repeatCount="indefinite"/></circle>
</svg>`,

end_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="ec_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#0a0820"/><stop offset="100%" stop-color="#050412"/></radialGradient>
    <filter id="ec_glow"><feGaussianBlur stdDeviation="5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#ec_bg)"/>
  <!-- Dragon head outline -->
  <ellipse cx="60" cy="48" rx="30" ry="24" fill="#1e1b4b" filter="url(#ec_glow)"/>
  <ellipse cx="60" cy="48" rx="28" ry="22" fill="#312e81"/>
  <!-- Eye -->
  <circle cx="48" cy="44" r="5" fill="#7c3aed"/>
  <circle cx="48" cy="44" r="3" fill="#c084fc"/>
  <circle cx="48" cy="44" r="1.5" fill="white"/>
  <circle cx="72" cy="44" r="5" fill="#7c3aed"/>
  <circle cx="72" cy="44" r="3" fill="#c084fc"/>
  <circle cx="72" cy="44" r="1.5" fill="white"/>
  <!-- Horns -->
  <path d="M44,26 Q38,14 42,10 Q46,18 48,26" fill="#4c1d95"/>
  <path d="M76,26 Q82,14 78,10 Q74,18 72,26" fill="#4c1d95"/>
  <!-- Dragon egg glow -->
  <ellipse cx="60" cy="88" rx="20" ry="24" fill="#06b6d4" opacity="0.3" filter="url(#ec_glow)"/>
  <ellipse cx="60" cy="88" rx="16" ry="20" fill="none" stroke="#06b6d4" stroke-width="2"/>
  <ellipse cx="60" cy="88" rx="8" ry="10" fill="#06b6d4" opacity="0.4"/>
  <!-- sparkles -->
  <circle cx="15" cy="20" r="2" fill="#7c3aed"><animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="20" r="2" fill="#06b6d4"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite"/></circle>
  <circle cx="15" cy="95" r="1.5" fill="#a855f7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.4s" repeatCount="indefinite"/></circle>
</svg>`,

lucky_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="lc_bg" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#1a1200"/><stop offset="100%" stop-color="#0d0900"/></radialGradient>
    <filter id="lc_glow"><feGaussianBlur stdDeviation="5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#lc_bg)"/>
  <!-- Lucky block hero -->
  <polygon points="60,14 92,32 92,68 60,86 28,68 28,32" fill="#fbbf24" opacity="0.3" filter="url(#lc_glow)"/>
  <polygon points="60,14 92,32 60,50 28,32" fill="#fcd34d" opacity="0.7"/>
  <polygon points="28,32 60,50 60,86 28,68" fill="#b45309" opacity="0.6"/>
  <polygon points="92,32 60,50 60,86 92,68" fill="#d97706" opacity="0.7"/>
  <polygon points="60,14 92,32 92,68 60,86 28,68 28,32" fill="none" stroke="#fbbf24" stroke-width="2"/>
  <!-- Question mark on face -->
  <text x="60" y="56" font-size="22" fill="#fef08a" text-anchor="middle" font-family="serif" font-weight="bold" filter="url(#lc_glow)">?</text>
  <!-- Rainbow aura -->
  <circle cx="60" cy="50" r="42" fill="none" stroke="#ff6ef7" stroke-width="1.5" opacity="0.3" filter="url(#lc_glow)"/>
  <!-- sparkle burst -->
  <circle cx="20" cy="18" r="3" fill="#fbbf24"><animate attributeName="opacity" values="1;0.1;1" dur="1.1s" repeatCount="indefinite"/></circle>
  <circle cx="100" cy="18" r="2.5" fill="#22c55e"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="20" cy="100" r="2" fill="#ef4444"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.7s" repeatCount="indefinite"/></circle>
  <circle cx="100" cy="100" r="2.5" fill="#3b82f6"><animate attributeName="opacity" values="1;0.1;1" dur="1.3s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="108" r="2" fill="#a855f7"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.8s" repeatCount="indefinite"/></circle>
</svg>`,

cosmic_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="coc_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#06001a"/><stop offset="100%" stop-color="#020010"/></radialGradient>
    <linearGradient id="coc_g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="50%" stop-color="#a855f7"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
    <filter id="coc_glow"><feGaussianBlur stdDeviation="5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#coc_bg)"/>
  <!-- Nebula clouds -->
  <ellipse cx="40" cy="40" rx="28" ry="20" fill="#a855f7" opacity="0.08" filter="url(#coc_glow)"/>
  <ellipse cx="80" cy="70" rx="24" ry="18" fill="#06b6d4" opacity="0.1" filter="url(#coc_glow)"/>
  <!-- Star fragment hero -->
  <polygon points="60,14 66,34 86,34 70,46 76,66 60,54 44,66 50,46 34,34 54,34" fill="url(#coc_g)" filter="url(#coc_glow)"/>
  <polygon points="60,14 66,34 86,34 70,46 76,66 60,54 44,66 50,46 34,34 54,34" fill="none" stroke="#bfdbfe" stroke-width="1.5" opacity="0.6"/>
  <!-- Galaxy swirl hint -->
  <circle cx="60" cy="40" r="30" fill="none" stroke="url(#coc_g)" stroke-width="1" opacity="0.2" filter="url(#coc_glow)"/>
  <!-- Orbit dots -->
  <circle cx="90" cy="40" r="3" fill="#06b6d4" filter="url(#coc_glow)"/>
  <circle cx="30" cy="60" r="2.5" fill="#a855f7" filter="url(#coc_glow)"/>
  <!-- Many sparkles -->
  <circle cx="14" cy="14" r="2" fill="#06b6d4"><animate attributeName="opacity" values="1;0.1;1" dur="1.2s" repeatCount="indefinite"/></circle>
  <circle cx="106" cy="14" r="2" fill="#a855f7"><animate attributeName="opacity" values="0.9;0.1;0.9" dur="1.5s" repeatCount="indefinite"/></circle>
  <circle cx="14" cy="106" r="2" fill="#3b82f6"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.8s" repeatCount="indefinite"/></circle>
  <circle cx="106" cy="106" r="2" fill="#06b6d4"><animate attributeName="opacity" values="1;0.1;1" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="108" r="1.5" fill="#ff6ef7"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.1s" repeatCount="indefinite"/></circle>
</svg>`,

shadow_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="shc_bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#080810"/><stop offset="100%" stop-color="#030308"/></radialGradient>
    <filter id="shc_glow"><feGaussianBlur stdDeviation="4"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#shc_bg)"/>
  <!-- Wither skull -->
  <ellipse cx="60" cy="40" rx="26" ry="24" fill="#1f2937" filter="url(#shc_glow)"/>
  <ellipse cx="60" cy="40" rx="24" ry="22" fill="#111827"/>
  <ellipse cx="60" cy="40" rx="22" ry="20" fill="#1f2937"/>
  <!-- Eye sockets -->
  <ellipse cx="50" cy="38" rx="5" ry="6" fill="#000"/>
  <ellipse cx="70" cy="38" rx="5" ry="6" fill="#000"/>
  <!-- Glowing eyes -->
  <ellipse cx="50" cy="38" rx="3" ry="4" fill="#7c3aed" filter="url(#shc_glow)"/>
  <ellipse cx="70" cy="38" rx="3" ry="4" fill="#7c3aed" filter="url(#shc_glow)"/>
  <!-- Shadow blade -->
  <rect x="56" y="60" width="8" height="46" rx="2" fill="#4b5563" filter="url(#shc_glow)"/>
  <polygon points="60,60 56,72 64,72" fill="#6b7280"/>
  <rect x="46" y="70" width="28" height="6" rx="3" fill="#374151"/>
  <!-- Dark essence particles -->
  <circle cx="20" cy="30" r="3" fill="#7c3aed" opacity="0.6" filter="url(#shc_glow)"/>
  <circle cx="100" cy="28" r="2.5" fill="#4c1d95" opacity="0.7" filter="url(#shc_glow)"/>
  <circle cx="15" cy="80" r="2" fill="#7c3aed"><animate attributeName="opacity" values="0.7;0.1;0.7" dur="1.6s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="78" r="2" fill="#6d28d9"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite"/></circle>
</svg>`,

deep_dark_case: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="ddc_bg" cx="50%" cy="70%" r="55%"><stop offset="0%" stop-color="#001810"/><stop offset="100%" stop-color="#000c08"/></radialGradient>
    <filter id="ddc_glow"><feGaussianBlur stdDeviation="5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="120" height="120" rx="18" fill="url(#ddc_bg)"/>
  <!-- Sculk veins -->
  <path d="M10,80 Q30,70 50,78 Q70,86 90,76 Q110,66 115,80" fill="none" stroke="#06b6d4" stroke-width="2" opacity="0.4"/>
  <path d="M10,90 Q35,82 60,88 Q85,94 115,88" fill="none" stroke="#06b6d4" stroke-width="1.5" opacity="0.3"/>
  <!-- Warden heart hero -->
  <path d="M60,30 Q48,18 36,28 Q24,38 36,52 L60,74 L84,52 Q96,38 84,28 Q72,18 60,30 Z" fill="#06b6d4" opacity="0.3" filter="url(#ddc_glow)"/>
  <path d="M60,30 Q48,18 36,28 Q24,38 36,52 L60,74 L84,52 Q96,38 84,28 Q72,18 60,30 Z" fill="none" stroke="#06b6d4" stroke-width="2.5"/>
  <path d="M60,30 Q52,22 44,28 Q38,36 44,46 L60,62 L76,46 Q82,36 76,28 Q68,22 60,30 Z" fill="#06b6d4" opacity="0.4"/>
  <!-- Echo shard -->
  <polygon points="60,14 68,24 64,36 56,36 52,24" fill="#06b6d4" opacity="0.7" filter="url(#ddc_glow)"/>
  <!-- Sparkles -->
  <circle cx="15" cy="30" r="2" fill="#06b6d4"><animate attributeName="opacity" values="1;0.2;1" dur="1.4s" repeatCount="indefinite"/></circle>
  <circle cx="105" cy="30" r="2" fill="#06b6d4"><animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.9s" repeatCount="indefinite"/></circle>
  <circle cx="20" cy="60" r="1.5" fill="#0891b2"><animate attributeName="opacity" values="0.7;0.1;0.7" dur="2.2s" repeatCount="indefinite"/></circle>
</svg>`,

};

// EXTRA_ICONS is merged inside getCaseIcon above via spread — no override needed
