import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

export const TypesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".fan-card");

      // Initial state
      gsap.set(cards, {
        y: 100,
        opacity: 0,
        scale: 0.85,
      });

      // Responsive calculations
      const isDesktop = window.innerWidth > 960;
      const rotations = isDesktop ? [-10, -3, 3, 10] : [-6, -2, 2, 6];
      const xOffsets = isDesktop
        ? [-440, -150, 150, 440]
        : [-240, -80, 80, 240];
      const yOffsets = [24, 0, 0, 24];

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "top 15%",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          cards.forEach((card, i) => {
            gsap.to(card, {
              y: yOffsets[i] + (1 - progress) * 120,
              x: xOffsets[i] * progress,
              rotateZ: rotations[i] * progress,
              opacity: Math.min(1, progress * 1.6),
              scale: 0.88 + progress * 0.12,
              overwrite: "auto",
              duration: 0.35,
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="types"
      ref={sectionRef}
      className="scene-section"
      style={{
        minHeight: "125vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        paddingBottom: "8vh",
      }}
    >
      {/* Title & Eyebrow */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem", zIndex: 20 }}>
        <div
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            color: "var(--accent-current)",
            marginBottom: "0.8rem",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          02 // CLASIFICACIÓN TÉCNICA
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.8rem, 8.5vw, 9.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          TIPOS DE POBREZA
        </h2>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.05rem",
            opacity: 0.8,
            maxWidth: "680px",
            marginInline: "auto",
            lineHeight: 1.5,
          }}
        >
          Cuatro manifestaciones distintas de la precariedad en Colombia, desde el umbral calórico hasta la vulnerabilidad no captada por las estadísticas.
        </p>
      </div>

      {/* Fan-Out Cards Container */}
      <div
        ref={cardsContainerRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1350px",
          height: "520px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        {POVERTY_DATA.types.map((item, index) => {
          const isSelected = activeCard === index;
          const isDimmed = activeCard !== null && !isSelected;

          return (
            <div
              key={item.id}
              className="fan-card glass-panel"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                position: "absolute",
                width: "min(300px, 82vw)",
                minHeight: "440px",
                padding: "2.4rem 2rem",
                borderRadius: "24px",
                backgroundColor: isSelected
                  ? "rgba(22, 16, 32, 0.96)"
                  : "rgba(14, 12, 22, 0.88)",
                border: isSelected
                  ? `2px solid ${item.accent}`
                  : "1px solid rgba(255, 255, 255, 0.14)",
                boxShadow: isSelected
                  ? `0 25px 60px -10px ${item.accent}66, 0 0 30px ${item.accent}33`
                  : "0 18px 40px rgba(0,0,0,0.55)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                transition:
                  "border 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                transform: isSelected
                  ? "translateY(-35px) rotateZ(0deg) scale(1.08) !important"
                  : undefined,
                opacity: isDimmed ? 0.55 : 1,
                zIndex: isSelected ? 50 : index + 5,
              }}
            >
              <div>
                {/* Badge */}
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: item.accent,
                    marginBottom: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {item.badge}
                </div>

                {/* Title */}
                <h3
                  className="font-heading"
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: "1.1rem",
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>

                {/* Amount if monetary */}
                {item.amount && (
                  <div style={{ marginBottom: "1.2rem" }}>
                    <div
                      className="font-display"
                      style={{
                        fontSize: "2.7rem",
                        lineHeight: 1,
                        color: item.accent,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.amount}
                    </div>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: "0.68rem",
                        opacity: 0.65,
                        letterSpacing: "0.1em",
                        fontWeight: 500,
                        textTransform: "uppercase",
                      }}
                    >
                      COP / PERSONA / MES
                    </span>
                  </div>
                )}

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.94rem",
                    lineHeight: 1.5,
                    opacity: 0.88,
                    marginBottom: "1.2rem",
                    fontWeight: 300,
                  }}
                >
                  {item.description}
                </p>
              </div>

              {/* Detail bottom */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.09)",
                  paddingTop: "1rem",
                  fontSize: "0.78rem",
                  opacity: 0.7,
                  fontFamily: "var(--font-mono)",
                  lineHeight: 1.45,
                }}
              >
                {item.details}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
