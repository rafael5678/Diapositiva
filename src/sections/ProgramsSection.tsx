import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ProgramsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row by row reveal
      gsap.fromTo(
        ".program-row",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="scene-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            color: "var(--accent-current)",
            marginBottom: "0.8rem",
            textTransform: "uppercase",
          }}
        >
          08 // RED DE PROTECCIÓN SOCIAL
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 8.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          PROGRAMAS DEL ESTADO
        </h2>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.1rem",
            opacity: 0.75,
            maxWidth: "680px",
            marginInline: "auto",
          }}
        >
          Las principales transferencias monetarias y subsidios coordinados por el Departamento de Prosperidad Social (DPS).
        </p>
      </div>

      {/* Vertical list revealed row by row */}
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
        }}
      >
        {POVERTY_DATA.programs.map((prog, index) => (
          <div
            key={index}
            className="program-row glass-panel interactive"
            style={{
              padding: "1.8rem 2.4rem",
              borderRadius: "20px",
              display: "grid",
              gridTemplateColumns: "minmax(220px, 1.2fr) minmax(260px, 2fr) auto",
              alignItems: "center",
              gap: "2rem",
              transition: "transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(12px)";
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0px)";
              e.currentTarget.style.backgroundColor = "";
            }}
          >
            {/* Program Name & Number */}
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.15em",
                  color: "var(--accent-current)",
                  marginBottom: "0.3rem",
                }}
              >
                0{index + 1} // SUBSIDIO
              </div>
              <h3
                className="font-heading"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                {prog.name}
              </h3>
            </div>

            {/* Description & Target */}
            <div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.45, opacity: 0.85, marginBottom: "0.4rem" }}>
                {prog.description}
              </p>
              <div
                className="font-mono"
                style={{ fontSize: "0.75rem", opacity: 0.55 }}
              >
                Población objetivo: {prog.coverage}
              </div>
            </div>

            {/* Focus Chip & Arrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span
                className="font-mono"
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: "100px",
                  backgroundColor: "rgba(0, 180, 216, 0.15)",
                  color: "#00b4d8",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {prog.focus}
              </span>
              <ArrowUpRight size={18} style={{ opacity: 0.4 }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
