import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";
import {
  Briefcase,
  GraduationCap,
  Sprout,
  Coins,
  Droplets,
  Scale,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={28} />,
  GraduationCap: <GraduationCap size={28} />,
  Sprout: <Sprout size={28} />,
  Coins: <Coins size={28} />,
  Droplets: <Droplets size={28} />,
  Scale: <Scale size={28} />,
};

export const SolutionsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered grid entrance
      gsap.fromTo(
        ".solution-card",
        { y: 60, opacity: 0, rotateY: 20 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.12,
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

  const toggleFlip = (id: string) => {
    setFlippedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="solutions"
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
          09 // HOJA DE RUTA TRANSFORMADORA
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 8.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          POSIBLES SOLUCIONES
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
          Seis transformaciones estructurales para superar las trampas de pobreza. Haz clic en las tarjetas para descubrir la acción prioritaria.
        </p>
      </div>

      {/* 6 Cards 3D Perspective Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2rem",
          width: "100%",
          maxWidth: "1150px",
          perspective: "1200px",
        }}
      >
        {POVERTY_DATA.solutions.map((sol) => {
          const isFlipped = flippedCard === sol.id;
          return (
            <div
              key={sol.id}
              onClick={() => toggleFlip(sol.id)}
              className="solution-card glass-panel interactive"
              style={{
                minHeight: "260px",
                padding: "2.4rem 2rem",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, background 0.3s ease",
                transform: isFlipped ? "rotateY(8deg) scale(1.03)" : "none",
                backgroundColor: isFlipped
                  ? "rgba(87, 204, 153, 0.15)"
                  : "rgba(255, 255, 255, 0.03)",
                border: isFlipped
                  ? "1.5px solid var(--accent-current)"
                  : "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: isFlipped
                  ? "0 20px 40px -10px rgba(87, 204, 153, 0.3)"
                  : "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={{ color: "var(--accent-current)" }}>
                    {iconMap[sol.icon] || <Sparkles size={28} />}
                  </div>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.68rem",
                      letterSpacing: "0.15em",
                      opacity: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {isFlipped ? "ACCIÓN CLAVE" : "CLICK PARA EXPANDIR"}
                  </span>
                </div>

                <h3
                  className="font-heading"
                  style={{
                    fontSize: "1.55rem",
                    fontWeight: 700,
                    marginBottom: "0.8rem",
                    lineHeight: 1.15,
                  }}
                >
                  {sol.title}
                </h3>

                <p style={{ fontSize: "0.94rem", lineHeight: 1.5, opacity: 0.85 }}>
                  {sol.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--accent-current)",
                    fontWeight: 600,
                  }}
                >
                  {sol.action}
                </span>
                <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
