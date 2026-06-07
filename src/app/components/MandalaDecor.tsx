export function MandalaDecor({ size = 300, opacity = 0.15, color = "#00ffe0" }: { size?: number; opacity?: number; color?: string }) {
  const cx = size / 2;
  const r = size / 2;

  const petalCount = 12;
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (i * 360) / petalCount;
    return angle;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity }} aria-hidden="true">
      {/* Outer pixel ring */}
      <circle cx={cx} cy={cx} r={r - 4} fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx={cx} cy={cx} r={r * 0.82} fill="none" stroke={color} strokeWidth="0.5" />

      {/* Geometric petals */}
      {petals.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * r * 0.55;
        const y1 = cx + Math.sin(rad) * r * 0.55;
        const x2 = cx + Math.cos(rad + 0.4) * r * 0.35;
        const y2 = cx + Math.sin(rad + 0.4) * r * 0.35;
        const x3 = cx + Math.cos(rad - 0.4) * r * 0.35;
        const y3 = cx + Math.sin(rad - 0.4) * r * 0.35;
        return (
          <polygon
            key={i}
            points={`${x1},${y1} ${x2},${y2} ${cx},${cx} ${x3},${y3}`}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
          />
        );
      })}

      {/* Inner lotus */}
      {petals.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * r * 0.28;
        const y1 = cx + Math.sin(rad) * r * 0.28;
        const x2 = cx + Math.cos(rad + 0.6) * r * 0.16;
        const y2 = cx + Math.sin(rad + 0.6) * r * 0.16;
        const x3 = cx + Math.cos(rad - 0.6) * r * 0.16;
        const y3 = cx + Math.sin(rad - 0.6) * r * 0.16;
        return (
          <polygon
            key={`inner-${i}`}
            points={`${x1},${y1} ${x2},${y2} ${cx},${cx} ${x3},${y3}`}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        );
      })}

      {/* Center dot */}
      <circle cx={cx} cy={cx} r={4} fill={color} opacity={0.8} />
      <circle cx={cx} cy={cx} r={8} fill="none" stroke={color} strokeWidth="0.5" />
      <circle cx={cx} cy={cx} r={12} fill="none" stroke={color} strokeWidth="0.3" strokeDasharray="2 3" />

      {/* Corner pixel diamonds */}
      {[45, 135, 225, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dx = cx + Math.cos(rad) * r * 0.7;
        const dy = cx + Math.sin(rad) * r * 0.7;
        return (
          <rect
            key={`diamond-${i}`}
            x={dx - 4}
            y={dy - 4}
            width={8}
            height={8}
            fill="none"
            stroke={color}
            strokeWidth="0.8"
            transform={`rotate(45, ${dx}, ${dy})`}
          />
        );
      })}
    </svg>
  );
}
