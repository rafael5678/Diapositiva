import React from "react";
import { SECTIONS } from "../animationConfig";

interface ProgressNavProps {
  currentSectionIndex: number;
  onJumpToSection: (index: number) => void;
}

export const ProgressNav: React.FC<ProgressNavProps> = ({
  currentSectionIndex,
  onJumpToSection,
}) => {
  return (
    <>
      {/* Bottom Left: Huge Cinematic Presentation Counter & Shortcuts HUD */}
      <div
        style={{
          position: "fixed",
          bottom: "2.4rem",
          left: "3rem",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span
            className="font-display"
            style={{
              fontSize: "3.2rem",
              lineHeight: 0.9,
              color: "var(--accent-current)",
              letterSpacing: "0.02em",
              transition: "color 0.5s ease",
            }}
          >
            {String(currentSectionIndex + 1).padStart(2, "0")}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "1.1rem",
              opacity: 0.35,
              fontWeight: 600,
            }}
          >
            / {String(SECTIONS.length).padStart(2, "0")}
          </span>
          <span
            className="font-mono"
            style={{
              marginLeft: "1rem",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              opacity: 0.7,
              textTransform: "uppercase",
            }}
          >
            {SECTIONS[currentSectionIndex]?.name}
          </span>
        </div>

        <div
          className="font-mono"
          style={{
            fontSize: "0.65rem",
            opacity: 0.45,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          [← / → / Espacio] Navegar • [F] Pantalla completa
        </div>
      </div>

      {/* Right-edge vertical progress line & section indicators */}
      <div
        style={{
          position: "fixed",
          right: "2.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          pointerEvents: "auto",
        }}
      >
        {SECTIONS.map((sec, idx) => {
          const isActive = idx === currentSectionIndex;
          return (
            <button
              key={sec.id}
              onClick={() => onJumpToSection(idx)}
              title={`${sec.number}. ${sec.name}`}
              aria-label={`Ir a sección ${sec.name}`}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                padding: 0,
              }}
            >
              <div
                style={{
                  width: isActive ? "8px" : "4px",
                  height: isActive ? "8px" : "4px",
                  borderRadius: "50%",
                  backgroundColor: isActive
                    ? "var(--accent-current)"
                    : "rgba(255, 255, 255, 0.3)",
                  boxShadow: isActive ? "0 0 10px var(--accent-current)" : "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isActive ? "scale(1.4)" : "scale(1)",
                }}
              />
            </button>
          );
        })}
      </div>
    </>
  );
};
