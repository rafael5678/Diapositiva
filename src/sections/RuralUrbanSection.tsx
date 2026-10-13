import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

export const RuralUrbanSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bars growth animation
      gsap.fromTo(
        ".bar-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.4,
          stagger: 0.1,
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

  const { urban, rural } = POVERTY_DATA.ruralUrban;

  return (
    <section
      id="ruralUrban"
      ref={sectionRef}
      className="scene-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4vw 6vw",
      }}
    >
      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
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
          06 // LA GRAN BRECHA TERRITORIAL
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.2rem, 7vw, 8rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          POBREZA RURAL VS. URBANA
        </h2>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.05rem",
            opacity: 0.75,
            maxWidth: "650px",
            marginInline: "auto",
          }}
        >
          En el campo colombiano, la pobreza monetaria es 1,6 veces mayor y la pobreza extrema casi se triplica frente a las cabeceras urbanas.
        </p>
      </div>

      {/* Split Dual Comparison Container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "2.5rem",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {/* URBAN HALF */}
        <div
          className="glass-panel"
          style={{
            padding: "3rem 2.5rem",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(18, 18, 24, 0.65)",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              opacity: 0.6,
              textTransform: "uppercase",
              marginBottom: "0.5rem",
            }}
          >
            CABECERAS MUNICIPALES
          </div>
          <h3
            className="font-display"
            style={{
              fontSize: "3.5rem",
              lineHeight: 1,
              marginBottom: "2.5rem",
              color: "#cad2c5",
            }}
          >
            ZONA URBANA
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Metric 1 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.95rem", opacity: 0.85 }}>Pobreza Monetaria</span>
                <span className="font-mono" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  24,6%
                </span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                <div
                  className="bar-fill"
                  style={{ width: `${(urban.monetary / 50) * 100}%`, height: "100%", backgroundColor: "#94d2bd", borderRadius: "10px" }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.95rem", opacity: 0.85 }}>Pobreza Extrema</span>
                <span className="font-mono" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  6,9%
                </span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                <div
                  className="bar-fill"
                  style={{ width: `${(urban.extreme / 50) * 100}%`, height: "100%", backgroundColor: "#48cae4", borderRadius: "10px" }}
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.95rem", opacity: 0.85 }}>Multidimensional (IPM)</span>
                <span className="font-mono" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  6,3%
                </span>
              </div>
              <div style={{ width: "100%", height: "10px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                <div
                  className="bar-fill"
                  style={{ width: `${(urban.multidimensional / 50) * 100}%`, height: "100%", backgroundColor: "#8338ec", borderRadius: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RURAL HALF (HIGHLIGHTED IN WARM ORANGE) */}
        <div
          className="glass-panel"
          style={{
            padding: "3rem 2.5rem",
            borderRadius: "28px",
            border: "2px solid #E27B38",
            backgroundColor: "rgba(35, 18, 8, 0.75)",
            boxShadow: "0 20px 50px -10px rgba(226, 123, 56, 0.25)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1.8rem",
              right: "2rem",
              padding: "0.3rem 0.8rem",
              backgroundColor: "#E27B38",
              color: "#fff",
              borderRadius: "100px",
              fontSize: "0.68rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            ZONA CRÍTICA
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              color: "#E27B38",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
              fontWeight: 600,
            }}
          >
            CENTROS POBLADOS Y RURAL DISPERSO
          </div>
          <h3
            className="font-display"
            style={{
              fontSize: "3.5rem",
              lineHeight: 1,
              marginBottom: "2.5rem",
              color: "#E27B38",
            }}
          >
            ZONA RURAL
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Metric 1 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.95rem", opacity: 0.9 }}>Pobreza Monetaria</span>
                <span className="font-mono" style={{ fontWeight: 800, fontSize: "1.25rem", color: "#E27B38" }}>
                  39,5%
                </span>
              </div>
              <div style={{ width: "100%", height: "12px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                <div
                  className="bar-fill"
                  style={{ width: `${(rural.monetary / 50) * 100}%`, height: "100%", backgroundColor: "#E27B38", borderRadius: "10px" }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.95rem", opacity: 0.9 }}>Pobreza Extrema</span>
                <span className="font-mono" style={{ fontWeight: 800, fontSize: "1.25rem", color: "#E63946" }}>
                  19,1%
                </span>
              </div>
              <div style={{ width: "100%", height: "12px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                <div
                  className="bar-fill"
                  style={{ width: `${(rural.extreme / 50) * 100}%`, height: "100%", backgroundColor: "#E63946", borderRadius: "10px" }}
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                <span style={{ fontSize: "0.95rem", opacity: 0.9 }}>Multidimensional (IPM)</span>
                <span className="font-mono" style={{ fontWeight: 800, fontSize: "1.25rem", color: "#F77F00" }}>
                  22,4%
                </span>
              </div>
              <div style={{ width: "100%", height: "12px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "10px", overflow: "hidden" }}>
                <div
                  className="bar-fill"
                  style={{ width: `${(rural.multidimensional / 50) * 100}%`, height: "100%", backgroundColor: "#F77F00", borderRadius: "10px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
