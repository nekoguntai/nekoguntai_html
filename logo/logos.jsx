// Logo variations for "army of cats" / nekoguntai

// ─────────────────────────────────────────────────────────────
// 01 — GEOMETRIC TRIANGLE CAT
// A cat head reduced to a single isoceles triangle with two ear-notches.
// The face is formed by negative space. Brutally simple.
// ─────────────────────────────────────────────────────────────
function LogoTriangle({ size = 200, color = '#111' }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* triangle silhouette with two V-notches for ears */}
      <path
        d="M 100 30 L 170 160 L 30 160 Z"
        fill={color}
      />
      {/* inner notch cuts — ears */}
      <path
        d="M 75 70 L 100 95 L 125 70 Z"
        fill="#fff"
        style={{ mixBlendMode: 'destination-out' }}
      />
      {/* eyes — two dots */}
      <circle cx="80" cy="115" r="4" fill="#fff" />
      <circle cx="120" cy="115" r="4" fill="#fff" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — CHEVRON / RANK INSIGNIA
// Military chevrons stacked, but the top chevron has cat ears.
// Reads as rank insignia at a glance.
// ─────────────────────────────────────────────────────────────
function LogoChevron({ size = 200, color = '#111' }) {
  const s = 12;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* chevron 1 (top) — with ear notches built in */}
      <path
        d={`
          M 40 90
          L 70 60
          L 80 70
          L 90 55
          L 100 65
          L 110 55
          L 120 70
          L 130 60
          L 160 90
          L 150 100
          L 100 75
          L 50 100 Z
        `}
        fill={color}
      />
      {/* chevron 2 */}
      <path
        d={`M 40 130 L 100 100 L 160 130 L 150 140 L 100 115 L 50 140 Z`}
        fill={color}
      />
      {/* chevron 3 */}
      <path
        d={`M 40 170 L 100 140 L 160 170 L 150 180 L 100 155 L 50 180 Z`}
        fill={color}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — MONOGRAM "N" WITH WHISKERS
// A bold geometric N. Horizontal bar extends left+right as whiskers.
// ─────────────────────────────────────────────────────────────
function LogoMonogram({ size = 200, color = '#111' }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* whiskers — horizontal strokes */}
      <rect x="10" y="96" width="40" height="3" fill={color} />
      <rect x="10" y="104" width="40" height="3" fill={color} />
      <rect x="150" y="96" width="40" height="3" fill={color} />
      <rect x="150" y="104" width="40" height="3" fill={color} />

      {/* N letterform — three thick rects */}
      <rect x="60" y="55" width="16" height="90" fill={color} />
      <rect x="124" y="55" width="16" height="90" fill={color} />
      <path d="M 76 55 L 92 55 L 140 145 L 124 145 Z" fill={color} />

      {/* two ear-triangles on top of the N verticals */}
      <path d="M 60 55 L 76 55 L 68 40 Z" fill={color} />
      <path d="M 124 55 L 140 55 L 132 40 Z" fill={color} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 04 — DOT GRID / PLATOON
// A 3x3 grid of dots. The center dot is a cat-ear shape.
// Reads as "many" — the army.
// ─────────────────────────────────────────────────────────────
function LogoPlatoon({ size = 200, color = '#111' }) {
  const positions = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      positions.push({ x: 50 + c * 50, y: 50 + r * 50, center: r === 1 && c === 1 });
    }
  }
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {positions.map((p, i) =>
        p.center ? (
          // center = cat silhouette (triangle + two ears)
          <g key={i}>
            <circle cx={p.x} cy={p.y + 2} r="14" fill={color} />
            <path d={`M ${p.x - 12} ${p.y - 5} L ${p.x - 6} ${p.y - 18} L ${p.x - 2} ${p.y - 8} Z`} fill={color} />
            <path d={`M ${p.x + 12} ${p.y - 5} L ${p.x + 6} ${p.y - 18} L ${p.x + 2} ${p.y - 8} Z`} fill={color} />
          </g>
        ) : (
          <circle key={i} cx={p.x} cy={p.y} r="8" fill={color} />
        )
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — STAR + EARS
// Five-point star (military/insignia) with cat ears poking up top.
// ─────────────────────────────────────────────────────────────
function LogoStar({ size = 200, color = '#111' }) {
  // 5-pt star centered at 100,110
  const cx = 100, cy = 110, R = 55, r = R * 0.4;
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    pts.push(`${cx + Math.cos(ang) * rad},${cy + Math.sin(ang) * rad}`);
  }
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      {/* ears */}
      <path d="M 72 62 L 80 30 L 96 55 Z" fill={color} />
      <path d="M 128 62 L 120 30 L 104 55 Z" fill={color} />
      <polygon points={pts.join(' ')} fill={color} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — CIRCLE + TWO NOTCHES (abstract)
// A solid circle with two triangular bites taken out of the top.
// Pure abstraction — reads as a cat head only on second look.
// ─────────────────────────────────────────────────────────────
function LogoNotch({ size = 200, color = '#111' }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <defs>
        <mask id="notchMask">
          <rect width="200" height="200" fill="#fff" />
          {/* two triangular notches */}
          <path d="M 70 30 L 85 75 L 55 75 Z" fill="#000" />
          <path d="M 130 30 L 145 75 L 115 75 Z" fill="#000" />
        </mask>
      </defs>
      <circle cx="100" cy="110" r="70" fill={color} mask="url(#notchMask)" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Artboard wrappers — render each logo centered on a tile
// ─────────────────────────────────────────────────────────────
function LogoTile({ Logo, bg = '#fff', fg = '#111', size = 200, w = 280, h = 280 }) {
  return (
    <div style={{
      width: w, height: h, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Logo size={size} color={fg} />
    </div>
  );
}

function LogoWithWordmark({ Logo, bg = '#fff', fg = '#111', w = 420, h = 280, layout = 'stack' }) {
  const isStack = layout === 'stack';
  return (
    <div style={{
      width: w, height: h, background: bg,
      display: 'flex',
      flexDirection: isStack ? 'column' : 'row',
      alignItems: 'center', justifyContent: 'center',
      gap: isStack ? 22 : 24,
      fontFamily: '"Archivo", "Helvetica Neue", Helvetica, sans-serif',
    }}>
      <Logo size={isStack ? 110 : 90} color={fg} />
      <div style={{
        textAlign: isStack ? 'center' : 'left',
      }}>
        <div style={{
          fontSize: isStack ? 22 : 24,
          fontWeight: 800,
          letterSpacing: isStack ? '0.28em' : '0.22em',
          color: fg,
          textTransform: 'uppercase',
        }}>NEKOGUNTAI</div>
        <div style={{
          fontSize: 10,
          letterSpacing: '0.35em',
          color: fg,
          opacity: 0.55,
          marginTop: 6,
          textTransform: 'uppercase',
        }}>Army of Cats · 猫軍隊</div>
      </div>
    </div>
  );
}

Object.assign(window, {
  LogoTriangle, LogoChevron, LogoMonogram, LogoPlatoon, LogoStar, LogoNotch,
  LogoTile, LogoWithWordmark,
});
