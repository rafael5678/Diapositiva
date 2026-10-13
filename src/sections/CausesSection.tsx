import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

export const CausesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate big percentages
      gsap.fromTo(
        ".cause-metric-block",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      // Animate floating tags
      gsap.fromTo(
        ".cause-tag",
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".cause-tags-container",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="causes"
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
          04 // MOTORES ESTRUCTURALES
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          CAUSAS PRINCIPALES
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
          El 65,5% del peso de la pobreza multidimensional en Colombia proviene de solo dos pilares: la educación precaria y la exclusión laboral.
        </p>
      </div>

      {/* Two Giant Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3rem",
          width: "100%",
          maxWidth: "1100px",
          marginBottom: "4rem",
        }}
      >
        {POVERTY_DATA.causes.keyMetrics.map((metric, i) => (
          <div
            key={i}
            className="cause-metric-block glass-panel"
            style={{
              padding: "3.5rem 2.8rem",
              borderRadius: "28px",
              position: "relative",
              overflow: "hidden",
              borderLeft: "4px solid var(--accent-current)",
            }}
          >
            {/* Massive outlined percentage text */}
            <div
              className="font-display"
              style={{
                fontSize: "clamp(5rem, 9.5vw, 11rem)",
                lineHeight: 0.85,
                color: "var(--accent-current)",
                letterSpacing: "-0.03em",
                marginBottom: "1rem",
              }}
            >
              {metric.percentage}
            </div>

            <div
              className="font-heading"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                marginBottom: "0.8rem",
                textTransform: "uppercase",
              }}
            >
              {metric.label}
            </div>

            <p style={{ fontSize: "1.02rem", lineHeight: 1.5, opacity: 0.82 }}>
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Floating Causes Tags */}
      <div style={{ width: "100%", maxWidth: "1100px", textAlign: "center" }}>
        <div
          className="font-mono"
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.15em",
            opacity: 0.6,
            marginBottom: "1.2rem",
            textTransform: "uppercase",
          }}
        >
          Factores agravantes interconectados:
        </div>
        <div
          className="cause-tags-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.9rem",
          }}
        >
          {POVERTY_DATA.causes.tags.map((tag, idx) => (
            <div
              key={idx}
              className="cause-tag glass-panel"
              style={{
                padding: "0.8rem 1.6rem",
                borderRadius: "100px",
                fontSize: "0.95rem",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-current)",
                }}
              />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
