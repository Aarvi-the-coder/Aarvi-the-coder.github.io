import { useState, useEffect, useRef } from "react";
import profilePhoto from "../imports/image.png";
import aboutPhoto from "../imports/image-1.png";
import roverPhoto from "../imports/image-2.png";
import roboticArmPhoto from "../imports/1000282937.jpg";
import dronePhoto from "../imports/1000282935.jpg";
import { MandalaDecor } from "./components/MandalaDecor";
import { GlitchText } from "./components/GlitchText";
import { PixelBorder } from "./components/PixelBorder";
import {
  Github,
  Mail,
  ExternalLink,
  ChevronDown,
  Terminal,
  Code2,
  Layers,
  Cpu,
  Globe,
} from "lucide-react";

const NAV_ITEMS = [
  "HOME",
  "ABOUT",
  "SKILLS",
  "PROJECTS",
  "CONTACT",
];

const SKILLS = [
  { name: "HTML", level: 90, category: "Frontend" },
  { name: "Javascript", level: 45, category: "Frontend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "CSS", level: 70, category: "Design" },
  { name: "C++", level: 80, category: "Backend" },
];

const PROJECTS = [
  {
    title: "NeuroMap AI",
    desc: "Interactive knowledge graph powered by LLM embeddings — visualize semantic relationships between research papers in real time.",
    tags: ["React", "Python", "OpenAI", "D3.js"],
    color: "cyan" as const,
    icon: <Cpu size={20} />,
    link: "#",
  },
  {
    title: "ChakriPath",
    desc: "Career guidance platform for first-generation college students, combining traditional mentorship models with ML-based skill matching.",
    tags: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
    color: "gold" as const,
    icon: <Globe size={20} />,
    link: "#",
  },
  {
    title: "PixelSynth",
    desc: "Browser-based generative music tool that translates pixel art patterns into MIDI sequences and ambient soundscapes.",
    tags: ["Web Audio API", "Canvas", "Tone.js", "Vite"],
    color: "magenta" as const,
    icon: <Layers size={20} />,
    link: "#",
  },
  {
    title: "Dhruv OS",
    desc: "Linux rice / custom desktop environment theme merging Mughal miniature patterns with a terminal-first workflow interface.",
    tags: ["Shell", "CSS", "Hyprland", "Waybar"],
    color: "cyan" as const,
    icon: <Terminal size={20} />,
    link: "#",
  },
];

const ROBOTICS_PROJECTS = [
  {
    title: "Biped Robot",
    image: roverPhoto,
    tags: ["Arduino", "Servo", "C++"],
    detail:
      "A bipedal robot is a machine designed to walk and balance on two legs, mimicking human locomotion. They excel at navigating environments originally built for humans, such as climbing stairs, stepping over obstacles, and traversing uneven terrain.",
  },
  {
    title: "Robotic Arm",
    image: roboticArmPhoto,
    tags: ["Arduino", "Servo", "C++"],
    detail:
      "A 4-DOF robotic arm works using a concept called kinematics to calculate how it moves through space.",
  },
  {
    title: "Hexapod",
    image: dronePhoto,
    tags: ["Arduino", "Servo", "C++"],
    detail:
      "Inspired by insects, these robots use six legs to traverse uneven, rocky, or soft terrain. They feature high intrinsic stability (they can remain standing even if one or two legs are lifted)",
  },
];

const TIMELINE = [
  {
    year: "2023",
    event:
      "Assembled Climate Clock in World's Largest Global Climate Clock Assembly",
  },
  {
    year: "2023",
    event: "Participated in CBSE tech & science exhibition",
  },
  {
    year: "2022",
    event:
      "Participated in Jaipur TECHFEST conducted by IIT Bombay",
  },
];

/* ─── DotPhoto: greyscale always, dots fade out + brightness lift on hover ─── */
function DotPhoto({ src, alt }: { src: string; alt: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-64 h-72 md:w-80 md:h-96"
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
        border: "2px solid #e8630a",
        boxShadow: hovered
          ? "6px 6px 0 #c0286e, 12px 12px 0 rgba(232,99,10,0.35)"
          : "6px 6px 0 #00b8a9, 12px 12px 0 rgba(192,40,110,0.2)",
        cursor: "crosshair",
        overflow: "hidden",
        transition: "box-shadow 0.5s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Greyscale photo — always visible, brightens on hover */}
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: hovered
            ? "grayscale(100%) brightness(1.05) contrast(1.05)"
            : "grayscale(100%) brightness(0.85) contrast(1.1)",
          transition: "filter 0.55s ease",
        }}
      />

      {/* Dot grid — fades out on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(245,239,230,0.22) 1.2px, transparent 1.2px)",
          backgroundSize: "8px 8px",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.55s ease",
        }}
        aria-hidden="true"
      />

      {/* Warm orange vignette that lifts on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(160deg, rgba(232,99,10,0.12) 0%, transparent 50%, rgba(192,40,110,0.15) 100%)"
            : "linear-gradient(160deg, rgba(232,99,10,0.05) 0%, transparent 60%, rgba(0,0,0,0.18) 100%)",
          transition: "background 0.55s ease",
        }}
        aria-hidden="true"
      />

      {/* Scan-line shimmer on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(232,99,10,0.04) 3px, rgba(232,99,10,0.04) 4px)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      )}

      {/* Default badge */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            color: "rgba(255,255,255,0.85)",
            background: "rgba(26,18,40,0.5)",
            padding: "3px 10px",
            letterSpacing: "0.12em",
          }}
        ></span>
      </div>

      {/* Hover badge */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s 0.15s",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "9px",
            color: "rgba(255,255,255,0.95)",
            background: "rgba(232,99,10,0.75)",
            padding: "3px 10px",
            letterSpacing: "0.12em",
          }}
        >
          AARVI A. GAUR
        </span>
      </div>
    </div>
  );
}

/* ─── RoboticsCard ─────────────────────────────────────────────── */
function RoboticsCard({
  project,
}: {
  project: (typeof ROBOTICS_PROJECTS)[0];
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{
          width: "clamp(240px, 30%, 300px)",
          border: "1.5px solid #00b8a9",
          boxShadow: hovered
            ? "0 8px 32px rgba(0,184,169,0.25), 4px 4px 0 #e8630a"
            : "0 2px 12px rgba(0,184,169,0.1)",
          clipPath:
            "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))",
          transition: "box-shadow 0.3s, transform 0.3s",
          transform: hovered ? "translateY(-4px)" : "none",
          background: "#fff",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
      >
        <div
          className="relative overflow-hidden"
          style={{ height: "180px" }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: hovered
                ? "saturate(1.15) brightness(1.05)"
                : "saturate(0.7) brightness(0.9)",
              transition: "filter 0.4s, transform 0.4s",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: hovered
                ? "linear-gradient(180deg, transparent 40%, rgba(0,184,169,0.3) 100%)"
                : "linear-gradient(180deg, transparent 40%, rgba(26,18,40,0.5) 100%)",
              transition: "background 0.4s",
            }}
          />
          {hovered && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "7px",
                  color: "#fff",
                  background: "rgba(0,184,169,0.85)",
                  padding: "6px 10px",
                  letterSpacing: "0.1em",
                }}
              >
                CLICK FOR DETAILS
              </span>
            </div>
          )}
        </div>
        <div className="p-4 relative">
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              color: "#00b8a9",
              marginBottom: "10px",
            }}
          >
            {project.title}
          </div>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "10px",
                  color: "#8a7898",
                  background: "#f0ece8",
                  border: "1px solid rgba(0,0,0,0.07)",
                  padding: "2px 7px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div
            className="absolute bottom-2 right-2 pointer-events-none opacity-10"
            aria-hidden="true"
          >
            <MandalaDecor
              size={48}
              opacity={1}
              color="#00b8a9"
            />
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(26,18,40,0.75)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-md w-full mx-4 overflow-hidden"
            style={{
              background: "#fefaf5",
              border: "2px solid #00b8a9",
              boxShadow: "8px 8px 0 #e8630a",
              clipPath:
                "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div className="p-6">
              <div className="absolute top-4 right-4 pointer-events-none">
                <MandalaDecor
                  size={70}
                  opacity={0.12}
                  color="#00b8a9"
                />
              </div>
              <div
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "10px",
                  color: "#00b8a9",
                  marginBottom: "12px",
                }}
              >
                {project.title}
              </div>
              <p
                style={{
                  color: "#3a2c48",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "16px",
                }}
              >
                {project.detail}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily:
                        "'Share Tech Mono', monospace",
                      fontSize: "11px",
                      color: "#00b8a9",
                      border: "1px solid #00b8a9",
                      padding: "2px 8px",
                      background: "rgba(0,184,169,0.07)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "7px",
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, #00b8a9, #007a72)",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                  clipPath:
                    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}
              >
                ✕ CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* Ikat-inspired SVG pattern tile */
function IkatPattern({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="ikat"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond grid */}
          <path
            d="M30 0 L60 30 L30 60 L0 30 Z"
            fill="none"
            stroke="#e8630a"
            strokeWidth="1"
          />
          <path
            d="M30 10 L50 30 L30 50 L10 30 Z"
            fill="none"
            stroke="#e8630a"
            strokeWidth="0.5"
          />
          {/* Flower petals */}
          {[0, 90, 180, 270].map((r) => (
            <ellipse
              key={r}
              cx={30 + Math.cos((r * Math.PI) / 180) * 12}
              cy={30 + Math.sin((r * Math.PI) / 180) * 12}
              rx="5"
              ry="3"
              fill="none"
              stroke="#c0286e"
              strokeWidth="0.7"
              transform={`rotate(${r}, ${30 + Math.cos((r * Math.PI) / 180) * 12}, ${30 + Math.sin((r * Math.PI) / 180) * 12})`}
            />
          ))}
          {/* Center dot */}
          <circle cx="30" cy="30" r="2.5" fill="#00b8a9" />
          <circle
            cx="30"
            cy="30"
            r="5"
            fill="none"
            stroke="#00b8a9"
            strokeWidth="0.5"
          />
          {/* Corner motifs */}
          {[
            [0, 0],
            [60, 0],
            [0, 60],
            [60, 60],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="none"
              stroke="#e8630a"
              strokeWidth="0.7"
            />
          ))}
        </pattern>
      </defs>
      <rect width="60" height="60" fill="url(#ikat)" />
    </svg>
  );
}

/* Geometric yantra-inspired divider — SVG, no image needed */
function FabricStrip({
  color = "#e8630a",
  flip = false,
}: {
  color?: string;
  flip?: boolean;
}) {
  const c2 =
    color === "#e8630a"
      ? "#00b8a9"
      : color === "#00b8a9"
        ? "#c0286e"
        : "#e8630a";
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        height: "48px",
        position: "relative",
        transform: flip ? "scaleY(-1)" : undefined,
        background: "#1a1228",
      }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="48"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        {/* Base band */}
        <rect width="1200" height="48" fill="#1a1228" />

        {/* Top & bottom edge lines */}
        <line
          x1="0"
          y1="1"
          x2="1200"
          y2="1"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="0"
          y1="47"
          x2="1200"
          y2="47"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* Repeating diamond chain */}
        {Array.from({ length: 30 }).map((_, i) => {
          const cx = i * 40 + 20;
          return (
            <g key={i}>
              {/* Diamond */}
              <polygon
                points={`${cx},6 ${cx + 14},24 ${cx},42 ${cx - 14},24`}
                fill="none"
                stroke={i % 2 === 0 ? color : c2}
                strokeWidth="1"
                opacity="0.65"
              />
              {/* Inner small diamond */}
              <polygon
                points={`${cx},14 ${cx + 6},24 ${cx},34 ${cx - 6},24`}
                fill={i % 2 === 0 ? color : c2}
                opacity="0.18"
              />
              {/* Centre dot */}
              <circle
                cx={cx}
                cy={24}
                r="1.8"
                fill={i % 2 === 0 ? color : c2}
                opacity="0.7"
              />
              {/* Connecting horizontal bar between diamonds */}
              {i < 29 && (
                <line
                  x1={cx + 14}
                  y1={24}
                  x2={cx + 26}
                  y2={24}
                  stroke={color}
                  strokeWidth="0.8"
                  opacity="0.35"
                />
              )}
            </g>
          );
        })}

        {/* Lotus petal row — small repeated motif along centre */}
        {Array.from({ length: 60 }).map((_, i) => {
          const x = i * 20 + 10;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={24}
              rx="5"
              ry="2.5"
              fill="none"
              stroke={i % 3 === 0 ? c2 : color}
              strokeWidth="0.5"
              opacity="0.2"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("HOME");
  const [hoveredProject, setHoveredProject] = useState<
    number | null
  >(null);

  const scrollTo = (id: string) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background: "#f5efe6",
        fontFamily: "'Rajdhani', sans-serif",
        color: "#1a1228",
      }}
    >
      {/* Subtle pixel grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,184,169,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,169,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Ikat tiled background layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23e8630a' stroke-width='0.6' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Background mandala decorations */}
      <div
        className="fixed top-[-60px] right-[-60px] pointer-events-none z-0"
        aria-hidden="true"
      >
        <MandalaDecor
          size={320}
          opacity={0.1}
          color="#e8630a"
        />
      </div>
      <div
        className="fixed bottom-[-80px] left-[-80px] pointer-events-none z-0"
        aria-hidden="true"
      >
        <MandalaDecor
          size={360}
          opacity={0.08}
          color="#00b8a9"
        />
      </div>

      {/* ─── NAV ────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3"
        style={{
          background: "rgba(245,239,230,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(232,99,10,0.18)",
          boxShadow: "0 2px 20px rgba(232,99,10,0.06)",
        }}
      >
        <button
          onClick={() => scrollTo("HOME")}
          className="flex items-center gap-2"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "9px",
            color: "#1a1228",
          }}
        >
          <span style={{ color: "#e8630a" }}>◈</span>
          <span>AARVI.DEV</span>
        </button>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item)}
                className="transition-all duration-200"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "7px",
                  color:
                    activeSection === item
                      ? "#e8630a"
                      : "#6b5f7a",
                  letterSpacing: "0.05em",
                  borderBottom:
                    activeSection === item
                      ? "1.5px solid #e8630a"
                      : "1.5px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="mailto:aarvi@example.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 transition-all duration-200 hover:brightness-110"
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "7px",
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #e8630a, #c0286e)",
            clipPath:
              "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
        >
          Coming soon!
        </a>
      </nav>

      {/* ─── HERO ──────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center px-6 md:px-16 pt-20"
      >
        {/* Fabric strip top accent */}
        <div className="absolute top-[64px] left-0 right-0 z-10">
          <FabricStrip color="#e8630a" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center py-20">
          {/* LEFT — Name & intro */}
          <div>
            {/* Top ornament */}
            <div className="flex items-center gap-3 mb-6">
              <div
                style={{
                  height: "1px",
                  width: "40px",
                  background:
                    "linear-gradient(90deg, transparent, #e8630a)",
                }}
              />
              <span
                style={{ color: "#e8630a", fontSize: "14px" }}
              >
                ❖
              </span>
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "11px",
                  color: "#c0286e",
                  letterSpacing: "0.25em",
                }}
              >
                STUDENT · BUILDER · CREATOR
              </span>
            </div>

            <GlitchText
              text="AARVI"
              as="h1"
              italic
              className="block mb-1"
              style={
                {
                  fontSize: "clamp(40px, 7vw, 72px)",
                  color: "#1a1228",
                  lineHeight: 1.1,
                } as React.CSSProperties
              }
            />
            <GlitchText
              text="A. GAUR"
              as="h1"
              italic
              className="block mb-6"
              style={
                {
                  fontSize: "clamp(40px, 7vw, 72px)",
                  color: "#e8630a",
                  lineHeight: 1.1,
                } as React.CSSProperties
              }
            />

            <p
              className="mb-8 leading-relaxed max-w-md"
              style={{
                color: "#6b5f7a",
                fontSize: "17px",
                fontWeight: 400,
              }}
            >
              Student innovator exploring{" "}
              <span
                style={{ color: "#00b8a9", fontWeight: 600 }}
              >
                Artificial Intelligence, Robotics, and
                Automation
              </span>{" "}
              through hands-on projects and competitions.
              Passionate about creating technology that solves
              real-world problems.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => scrollTo("PROJECTS")}
                className="flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "8px",
                  color: "#ffffff",
                  background:
                    "linear-gradient(135deg, #00b8a9, #007a72)",
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  boxShadow: "0 4px 20px rgba(0,184,169,0.35)",
                }}
              >
                <Code2 size={13} />
                VIEW WORK
              </button>
              <button
                onClick={() => scrollTo("CONTACT")}
                className="flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:bg-orange-50"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "8px",
                  color: "#e8630a",
                  border: "1.5px solid #e8630a",
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                <Mail size={13} />
                CONTACT
              </button>
            </div>

            {/* Scroll cue */}
            <div className="flex items-center gap-3 animate-bounce">
              <ChevronDown
                size={16}
                style={{ color: "#c0286e" }}
              />
              <span
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "10px",
                  color: "#a09090",
                }}
              >
                scroll to explore
              </span>
            </div>
          </div>

          {/* RIGHT — Photo frame */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Outer fabric-patterned ring */}
              <div
                className="absolute -inset-5 rounded-none pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23e8630a' stroke-width='1' opacity='0.35'/%3E%3Ccircle cx='30' cy='30' r='3' fill='%23c0286e' opacity='0.3'/%3E%3C/svg%3E\")",
                  backgroundSize: "30px 30px",
                  border: "2px solid rgba(232,99,10,0.25)",
                  clipPath:
                    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                }}
                aria-hidden="true"
              />

              {/* Mandala behind photo */}
              <div
                className="absolute -inset-2 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <MandalaDecor
                  size={380}
                  opacity={0.18}
                  color="#c0286e"
                />
              </div>

              {/* Interactive dot photo */}
              <DotPhoto
                src={profilePhoto}
                alt="Aarvi A. Gaur"
              />

              {/* Corner tag */}
              <div
                className="absolute -bottom-3 -right-3 px-3 py-1"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "10px",
                  color: "#ffffff",
                  background: "#e8630a",
                  letterSpacing: "0.1em",
                }}
              >
                Namaste!
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fabric strip */}
        <div className="absolute bottom-0 left-0 right-0">
          <FabricStrip color="#00b8a9" flip />
        </div>
      </section>

      {/* ─── ABOUT ─────────────────────────────────── */}
      <section
        id="about"
        className="relative py-24 px-6"
        style={{ background: "#fefaf5" }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="ABOUT ME" index="01" />

          <div className="grid md:grid-cols-2 gap-12 mt-16 items-start">
            {/* About photo */}
            <div className="relative flex justify-center">
              <div
                className="relative"
                style={{ width: "clamp(220px, 100%, 320px)" }}
              >
                {/* Mandala behind */}
                <div
                  className="absolute -inset-4 flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <MandalaDecor
                    size={360}
                    opacity={0.13}
                    color="#e8630a"
                  />
                </div>

                {/* Photo */}
                <div
                  style={{
                    border: "2px solid #e8630a",
                    clipPath:
                      "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))",
                    boxShadow:
                      "6px 6px 0 #00b8a9, 0 20px 48px rgba(26,18,40,0.28), 0 4px 16px rgba(232,99,10,0.18)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={aboutPhoto}
                    alt="Robot and guitar — Aarvi's two passions"
                    style={{
                      width: "100%",
                      display: "block",
                      objectFit: "cover",
                      filter: "saturate(1.1) brightness(0.97)",
                    }}
                  />
                  {/* Subtle warm overlay at bottom */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, transparent 55%, rgba(26,18,40,0.22) 100%)",
                      pointerEvents: "none",
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Corner tag */}
                <div
                  className="absolute -bottom-3 -right-3 px-3 py-1"
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: "9px",
                    color: "#ffffff",
                    background: "#00b8a9",
                    letterSpacing: "0.1em",
                  }}
                >
                  ROBOTS · GUITARS
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <p
                className="mb-6 leading-relaxed text-lg"
                style={{ color: "#3a2c48" }}
              >
                Namaste! I'm an AI & Robotics enthusiast with a
                deep love for the craft of software.
              </p>
              <p
                className="mb-8 leading-relaxed"
                style={{ color: "#6b5f7a", fontSize: "15px" }}
              >
                I build full-stack web applications,mini robots
                and experiment with generative AI. Outside of
                code, I'm obsessed with the intersection of
                Indian Philosophy and computational thinking,
                along with playing guitar.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: "12+", label: "Projects" },
                  {
                    value: "3",
                    label: "STEM Competition Recognitions",
                  },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="p-4 text-center"
                    style={{
                      border: "1.5px solid #e8630a",
                      background:
                        "linear-gradient(135deg, #fff8f2, #fef3e2)",
                      clipPath:
                        "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                    }}
                  >
                    <div
                      style={{
                        fontFamily:
                          "'Press Start 2P', monospace",
                        fontSize: "16px",
                        color: "#e8630a",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        color: "#6b5f7a",
                        fontSize: "12px",
                        marginTop: "6px",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start"
                  >
                    <span
                      style={{
                        fontFamily:
                          "'Share Tech Mono', monospace",
                        fontSize: "11px",
                        color: item.active
                          ? "#00b8a9"
                          : "#e8630a",
                        minWidth: "40px",
                        paddingTop: "2px",
                      }}
                    >
                      {item.year}
                    </span>
                    <div
                      style={{
                        width: "1px",
                        background: item.active
                          ? "#00b8a9"
                          : "rgba(232,99,10,0.3)",
                        marginTop: "6px",
                        alignSelf: "stretch",
                        minHeight: "20px",
                      }}
                    />
                    <p
                      style={{
                        color: item.active
                          ? "#1a1228"
                          : "#8a7898",
                        fontSize: "14px",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric divider */}
      <FabricStrip color="#c0286e" />

      {/* ─── SKILLS ────────────────────────────────── */}
      <section
        id="skills"
        className="relative py-24 px-6"
        style={{ background: "#f5efe6" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 60% 40%, rgba(0,184,169,0.07) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto relative">
          <SectionHeader label="SKILL MATRIX" index="02" />

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {SKILLS.map((skill, i) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={i}
              />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            {["Git", "Linux", "Figma", "Vercel"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 transition-all duration-200 hover:bg-[#e8630a] hover:text-white cursor-default"
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "12px",
                  color: "#e8630a",
                  border: "1px solid rgba(232,99,10,0.4)",
                  letterSpacing: "0.05em",
                  background: "rgba(232,99,10,0.05)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Fabric divider */}
      <FabricStrip color="#e8630a" />

      {/* ─── PROJECTS ──────────────────────────────── */}
      <section
        id="projects"
        className="relative py-24 px-6"
        style={{ background: "#fefaf5" }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeader label="PROJECT CODEX" index="03" />

          <div className="mt-16 flex flex-col items-center justify-center py-16 gap-6">
            <MandalaDecor
              size={80}
              opacity={0.18}
              color="#e8630a"
            />
            <div
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(10px, 2vw, 14px)",
                color: "#e8630a",
                letterSpacing: "0.15em",
                textAlign: "center",
              }}
            >
              UPDATING SOON...
            </div>
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "13px",
                color: "#a09090",
                letterSpacing: "0.08em",
              }}
            >
              [ projects in progress — check back later ]
            </p>
          </div>

          <div className="text-center mt-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-[#1a1228]"
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: "13px",
                color: "#6b5f7a",
                borderBottom: "1px solid rgba(107,95,122,0.3)",
                paddingBottom: "2px",
              }}
            >
              <Github size={15} />
              See all projects on GitHub
            </a>
          </div>
          {/* ── Robotics Projects ── */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <div
                style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "10px",
                  color: "#c0b8c8",
                  letterSpacing: "0.2em",
                  marginBottom: "8px",
                }}
              >
                [HARDWARE]
              </div>
              <GlitchText
                text="ROBOTICS PROJECTS"
                as="h2"
                className="inline-block"
                style={
                  {
                    fontSize: "clamp(16px, 3vw, 24px)",
                    color: "#1a1228",
                  } as React.CSSProperties
                }
              />
              <div className="flex items-center justify-center gap-4 mt-4">
                <div
                  style={{
                    height: "1.5px",
                    flex: 1,
                    maxWidth: "80px",
                    background:
                      "linear-gradient(90deg, transparent, #00b8a9)",
                  }}
                />
                <span
                  style={{ color: "#00b8a9", fontSize: "10px" }}
                >
                  ◈
                </span>
                <div
                  style={{
                    height: "1.5px",
                    flex: 1,
                    maxWidth: "80px",
                    background:
                      "linear-gradient(90deg, #00b8a9, transparent)",
                  }}
                />
              </div>
              <p
                className="mt-4 text-sm"
                style={{
                  color: "#8a7898",
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: "11px",
                }}
              >
                hover to preview · click for details
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">
              {ROBOTICS_PROJECTS.map((project) => (
                <RoboticsCard
                  key={project.title}
                  project={project}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fabric divider */}
      <FabricStrip color="#00b8a9" />

      {/* ─── CONTACT ───────────────────────────────── */}
      <section
        id="contact"
        className="relative py-24 px-6"
        style={{ background: "#f5efe6" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 100%, rgba(232,99,10,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="max-w-3xl mx-auto relative">
          <SectionHeader label="SEND A SIGNAL" index="04" />

          <div className="mt-16">
            <PixelBorder
              color="gold"
              className="p-8 md:p-10"
              style={{ background: "#ffffff" }}
            >
              <div
                className="absolute top-4 right-4 pointer-events-none"
                aria-hidden="true"
              >
                <MandalaDecor
                  size={100}
                  opacity={0.12}
                  color="#e8630a"
                />
              </div>

              <p
                className="mb-8 text-lg leading-relaxed"
                style={{ color: "#6b5f7a" }}
              >
                Whether you want to collaborate, have an
                opportunity, or just want to say नमस्ते — my
                inbox is always open.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    label="NAME"
                    placeholder="Your name"
                    type="text"
                  />
                  <FormField
                    label="EMAIL"
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>
                <FormField
                  label="SUBJECT"
                  placeholder="Project idea / Opportunity / Hello"
                  type="text"
                />
                <div>
                  <label
                    className="block mb-2 tracking-widest"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "7px",
                      color: "#8a7898",
                    }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me something interesting..."
                    className="w-full resize-none outline-none transition-colors focus:border-[#e8630a]"
                    style={{
                      background: "#fef7f0",
                      border:
                        "1.5px solid rgba(232,99,10,0.25)",
                      color: "#1a1228",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontFamily: "'Rajdhani', sans-serif",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 transition-all duration-300 hover:brightness-110 hover:scale-[1.01]"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "9px",
                    color: "#ffffff",
                    background:
                      "linear-gradient(135deg, #e8630a, #c0286e)",
                    boxShadow: "0 4px 20px rgba(232,99,10,0.3)",
                    clipPath:
                      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  }}
                >
                  ❖ TRANSMIT MESSAGE ❖
                </button>
              </form>

              <div
                className="flex items-center justify-center gap-6 mt-8 pt-8"
                style={{
                  borderTop: "1px solid rgba(26,18,40,0.08)",
                }}
              >
                {[
                  {
                    icon: <Github size={20} />,
                    label: "GitHub",
                    href: "#",
                  },
                  {
                    icon: <Mail size={20} />,
                    label: "Email",
                    href: "mailto:aarvi@example.com",
                  },
                  {
                    icon: <ExternalLink size={20} />,
                    label: "LinkedIn",
                    href: "#",
                  },
                ].map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex flex-col items-center gap-2 transition-colors hover:text-[#e8630a] group"
                    style={{ color: "#8a7898" }}
                    aria-label={label}
                  >
                    <span className="group-hover:scale-110 transition-transform">
                      {icon}
                    </span>
                    <span
                      style={{
                        fontFamily:
                          "'Share Tech Mono', monospace",
                        fontSize: "10px",
                      }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </PixelBorder>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────── */}
      <FabricStrip color="#e8630a" />
      <footer
        className="py-8 px-6 text-center"
        style={{ background: "#1a1228" }}
      >
        <div
          className="flex items-center justify-center gap-3 mb-3"
          aria-hidden="true"
        >
          <div
            style={{
              height: "1px",
              width: "40px",
              background:
                "linear-gradient(90deg, transparent, rgba(232,99,10,0.5))",
            }}
          />
          <span style={{ color: "#e8630a", fontSize: "12px" }}>
            ❖
          </span>
          <div
            style={{
              height: "1px",
              width: "40px",
              background:
                "linear-gradient(90deg, rgba(232,99,10,0.5), transparent)",
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "11px",
            color: "#4a3f5a",
          }}
        >
          © 2026 Aarvi A. Gaur · Built with love · Inspired by
          Yantra geometry
        </p>
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "10px",
            color: "#3a2f48",
            marginTop: "4px",
          }}
        >
          सत्यमेव जयते &nbsp;·&nbsp; Truth alone triumphs
        </p>
      </footer>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────── */

function SectionHeader({
  label,
  index,
}: {
  label: string;
  index: string;
}) {
  return (
    <div className="text-center">
      <p
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "10px",
          color: "#c0b8c8",
          letterSpacing: "0.2em",
          marginBottom: "8px",
        }}
      >
        [{index}]
      </p>
      <GlitchText
        text={label}
        as="h2"
        className="inline-block"
        style={
          {
            fontSize: "clamp(18px, 4vw, 28px)",
            color: "#1a1228",
          } as React.CSSProperties
        }
      />
      <div className="flex items-center justify-center gap-4 mt-4">
        <div
          style={{
            height: "1.5px",
            flex: 1,
            maxWidth: "80px",
            background:
              "linear-gradient(90deg, transparent, #e8630a)",
          }}
        />
        <span style={{ color: "#e8630a", fontSize: "10px" }}>
          ◈
        </span>
        <div
          style={{
            height: "1.5px",
            flex: 1,
            maxWidth: "80px",
            background:
              "linear-gradient(90deg, #e8630a, transparent)",
          }}
        />
      </div>
    </div>
  );
}

function SkillBar({
  skill,
  index,
}: {
  skill: (typeof SKILLS)[0];
  index: number;
}) {
  const catColor: Record<string, string> = {
    Frontend: "#00b8a9",
    Backend: "#e8630a",
    Design: "#c0286e",
    DevOps: "#8a7898",
  };
  const color = catColor[skill.category] || "#00b8a9";
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "13px",
            color: "#3a2c48",
          }}
        >
          {skill.name}
        </span>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "6px",
              color,
              border: `1px solid ${color}`,
              padding: "2px 5px",
              background: `${color}12`,
            }}
          >
            {skill.category}
          </span>
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "11px",
              color: "#8a7898",
            }}
          >
            {skill.level}%
          </span>
        </div>
      </div>
      <div
        className="h-2 w-full relative"
        style={{
          background: "rgba(26,18,40,0.06)",
          border: "1px solid rgba(26,18,40,0.08)",
        }}
      >
        <div
          className="h-full"
          style={{
            width: animated ? `${skill.level}%` : "0%",
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            transition: animated
              ? `width 0.9s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`
              : "none",
          }}
        />
        {[25, 50, 75].map((tick) => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${tick}%`,
              background: "rgba(26,18,40,0.1)",
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

function FormField({
  label,
  placeholder,
  type,
}: {
  label: string;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label
        className="block mb-2 tracking-widest"
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "7px",
          color: "#8a7898",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full outline-none transition-colors focus:border-[#e8630a]"
        style={{
          background: "#fef7f0",
          border: "1.5px solid rgba(232,99,10,0.25)",
          color: "#1a1228",
          padding: "10px 16px",
          fontSize: "14px",
          fontFamily: "'Rajdhani', sans-serif",
        }}
      />
    </div>
  );
}