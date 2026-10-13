import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";
import { RotateCw, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ConsequencesSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 200;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${totalScroll * 1.5}`,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="consequences"
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Pinned Section Header */}
      <div
        style={{
          position: "absolute",
          top: "4.5rem",
          left: "6vw",
          zIndex: 30,
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            color: "var(--accent-current)",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }}
        >
          05 // LA TRAMPA INTERGENERACIONAL
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 6.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          EL CICLO VICIOSO DE LA POBREZA
        </h2>
      </div>

      {/* Horizontal scrolling track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "3rem",
          paddingLeft: "6vw",
          paddingRight: "15vw",
          marginTop: "6rem",
          willChange: "transform",
        }}
      >
        {POVERTY_DATA.consequences.map((step, idx) => (
          <div
            key={idx}
            className="glass-panel"
            style={{
              flex: "0 0 min(440px, 80vw)",
              minHeight: "360px",
              padding: "3rem 2.5rem",
              borderRadius: "28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderTop: "3px solid var(--accent-current)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              position: "relative",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: "3rem",
                    lineHeight: 1,
                    color: "var(--accent-current)",
                  }}
                >
                  {step.step}
                </span>
                {idx < POVERTY_DATA.consequences.length - 1 ? (
                  <ArrowRight size={22} style={{ opacity: 0.4 }} />
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-current)" }}>
                    <RotateCw size={18} />
                    <span className="font-mono" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>REINICIO</span>
                  </div>
                )}
              </div>

              <h3
                className="font-heading"
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>

              <p style={{ fontSize: "1.02rem", lineHeight: 1.5, opacity: 0.85 }}>
                {step.desc}
              </p>
            </div>

            <div
              className="font-mono"
              style={{
                fontSize: "0.8rem",
                opacity: 0.6,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "1.2rem",
                lineHeight: 1.4,
              }}
            >
              {step.impact}
            </div>
          </div>
        ))}

        {/* Closing summary card */}
        <div
          className="glass-panel"
          style={{
            flex: "0 0 min(400px, 80vw)",
            minHeight: "360px",
            padding: "3rem 2.5rem",
            borderRadius: "28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "rgba(181, 23, 158, 0.12)",
            border: "2px dashed var(--accent-current)",
          }}
        >
          <RotateCw size={42} style={{ marginInline: "auto", marginBottom: "1.5rem", color: "var(--accent-current)" }} />
          <h4 className="font-display" style={{ fontSize: "2.4rem", marginBottom: "1rem", lineHeight: 1 }}>
            EL CICLO SE PERPETÚA
          </h4>
          <p style={{ fontSize: "0.95rem", opacity: 0.8, lineHeight: 1.5 }}>
            Sin intervención estatal estructural en educación y empleo decente, una familia colombiana tarda en promedio más de 11 generaciones en salir de la pobreza extrema.
          </p>
        </div>
      </div>
    </section>
  );
};
