import { useState, useEffect } from "react";
import { CSSProperties } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "span" | "p";
  style?: CSSProperties;
  italic?: boolean;
}

export function GlitchText({
  text,
  className = "",
  as: Tag = "span",
  style,
  italic = false,
}: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tag
      className={`relative inline-block ${className}`}
      data-text={text}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        // "Press Start 2P" has no italic variant — use skewX to simulate it
        transform: italic ? "skewX(-8deg)" : undefined,
        display: "inline-block",
        ...style,
      }}
    >
      <span className={glitching ? "glitch-active" : ""}>{text}</span>
      {glitching && (
        <>
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              color: "#00b8a9",
              clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
              transform: "translateX(-3px)",
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              color: "#c0286e",
              clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
              transform: "translateX(3px)",
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
