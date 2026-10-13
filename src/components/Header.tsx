import React from "react";
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from "lucide-react";

interface HeaderProps {
  currentSectionIndex: number;
  totalSections: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onPrevSection: () => void;
  onNextSection: () => void;
  onJumpToSection: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSectionIndex,
  totalSections,
  isFullscreen,
  onToggleFullscreen,
  onPrevSection,
  onNextSection,
}) => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.8rem 3rem",
        zIndex: 100,
        pointerEvents: "auto",
      }}
    >
      {/* Brand & DANE label */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-current)",
            boxShadow: "0 0 12px var(--accent-current)",
            transition: "background-color 0.5s ease",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            className="font-display"
            style={{
              fontSize: "1.25rem",
              letterSpacing: "0.08em",
              color: "var(--text-current)",
            }}
          >
            LA POBREZA EN COLOMBIA
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              opacity: 0.6,
              textTransform: "uppercase",
            }}
          >
            DANE 2025 // EDICIÓN CINEMATOGRÁFICA
          </span>
        </div>
      </div>

      {/* Navigation & Presentation Mode Quick Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        {/* Slide Counter badge */}
        <div
          className="glass-panel"
          style={{
            padding: "0.45rem 1rem",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span className="font-mono" style={{ fontSize: "0.78rem", fontWeight: 700 }}>
            {String(currentSectionIndex + 1).padStart(2, "0")}
          </span>
          <span style={{ opacity: 0.3, fontSize: "0.75rem" }}>/</span>
          <span className="font-mono" style={{ fontSize: "0.78rem", opacity: 0.5 }}>
            {String(totalSections).padStart(2, "0")}
          </span>
        </div>

        {/* Prev / Next controls */}
        <div
          className="glass-panel"
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: "100px",
            padding: "0.2rem",
          }}
        >
          <button
            onClick={onPrevSection}
            disabled={currentSectionIndex === 0}
            title="Sección anterior (←)"
            aria-label="Sección anterior"
            style={{
              padding: "0.35rem 0.65rem",
              borderRadius: "100px",
              opacity: currentSectionIndex === 0 ? 0.25 : 0.85,
              transition: "opacity 0.2s, background 0.2s",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onNextSection}
            disabled={currentSectionIndex === totalSections - 1}
            title="Sección siguiente (→ o Espacio)"
            aria-label="Sección siguiente"
            style={{
              padding: "0.35rem 0.65rem",
              borderRadius: "100px",
              opacity: currentSectionIndex === totalSections - 1 ? 0.25 : 0.85,
              transition: "opacity 0.2s, background 0.2s",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Fullscreen Toggle */}
        <button
          onClick={onToggleFullscreen}
          title="Pantalla Completa (F)"
          aria-label="Pantalla Completa"
          className="glass-panel"
          style={{
            padding: "0.55rem 0.85rem",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
            transition: "background 0.2s, transform 0.2s",
          }}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          <span className="font-mono" style={{ display: "none" }}>F</span>
        </button>
      </div>
    </header>
  );
};
