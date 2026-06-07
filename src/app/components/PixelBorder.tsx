import { ReactNode, MouseEventHandler, CSSProperties } from "react";

interface PixelBorderProps {
  children: ReactNode;
  className?: string;
  color?: "cyan" | "gold" | "magenta";
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

const colorMap = {
  cyan: { border: "#00b8a9", glow: "0 2px 16px rgba(0,184,169,0.18)" },
  gold: { border: "#e8630a", glow: "0 2px 16px rgba(232,99,10,0.18)" },
  magenta: { border: "#c0286e", glow: "0 2px 16px rgba(192,40,110,0.18)" },
};

export function PixelBorder({ children, className = "", color = "cyan", onMouseEnter, onMouseLeave, style }: PixelBorderProps) {
  const { border, glow } = colorMap[color];
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        border: `1.5px solid ${border}`,
        boxShadow: glow,
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
        background: "#ffffff",
        ...style,
      }}
    >
      {/* Corner ornaments */}
      <span
        className="absolute top-0 left-0 w-3 h-3 pointer-events-none"
        style={{ borderTop: `2px solid ${border}`, borderLeft: `2px solid ${border}` }}
        aria-hidden="true"
      />
      <span
        className="absolute top-0 right-0 w-3 h-3 pointer-events-none"
        style={{ borderTop: `2px solid ${border}`, borderRight: `2px solid ${border}` }}
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none"
        style={{ borderBottom: `2px solid ${border}`, borderLeft: `2px solid ${border}` }}
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none"
        style={{ borderBottom: `2px solid ${border}`, borderRight: `2px solid ${border}` }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
