import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

export const ConclusionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal kinetic marquee parallax
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Stats cards entrance
      gsap.fromTo(
        ".conclusion-stat-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
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

  const { headline, metrics, brandWord, sourceCredits } = POVERTY_DATA.conclusions;

  return (
    <section
      id="conclusions"
      ref={sectionRef}
      className="scene-section"
      style={{
        minHeight: "120vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#141210",
        position: "relative",
        paddingTop: "6vw",
        paddingBottom: "8vw",
      }}
    >
      {/* Eyebrow */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            color: "#C85A17",
            marginBottom: "0.8rem",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          10 // SÍNTESIS FINAL
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.5rem, 8.5vw, 9.5rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.01em",
            color: "#141210",
            maxWidth: "1100px",
          }}
        >
          {headline}
        </h2>
      </div>

      {/* 3 Core Synthesis Metrics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
          width: "100%",
          maxWidth: "1150px",
          marginBottom: "6rem",
        }}
      >
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="conclusion-stat-card glass-panel-light"
            style={{
              padding: "3rem 2.4rem",
              borderRadius: "24px",
              border: "1px solid rgba(20, 18, 16, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="font-display"
              style={{
                fontSize: "clamp(4.2rem, 7vw, 7rem)",
                lineHeight: 0.85,
                color: "#C85A17",
                marginBottom: "1rem",
              }}
            >
              {m.value}
            </div>

            <div
              className="font-heading"
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                color: "#141210",
                marginBottom: "0.6rem",
                lineHeight: 1.2,
              }}
            >
              {m.label}
            </div>

            <p style={{ fontSize: "0.92rem", lineHeight: 1.5, opacity: 0.75, color: "#333" }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* GIANT BRAND WORD MARQUEE (Awwwards Oryzo Style) */}
      <div
        style={{
          width: "100vw",
          overflow: "hidden",
          marginBlock: "3rem",
          userSelect: "none",
        }}
      >
        <div
          ref={marqueeRef}
          className="marquee-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4rem",
          }}
        >
          {Array(8)
            .fill(brandWord)
            .map((word, i) => (
              <span
                key={i}
                className="font-display"
                style={{
                  fontSize: "clamp(6rem, 16vw, 18rem)",
                  lineHeight: 0.8,
                  letterSpacing: "-0.02em",
                  color: i % 2 === 0 ? "#141210" : "transparent",
                  WebkitTextStroke: i % 2 !== 0 ? "2px #141210" : undefined,
                  display: "inline-block",
                }}
              >
                {word} •
              </span>
            ))}
        </div>
      </div>

      {/* Official DANE Source and Credits footer */}
      <div
        style={{
          maxWidth: "800px",
          textAlign: "center",
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(20, 18, 16, 0.12)",
        }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: "0.82rem",
            opacity: 0.75,
            lineHeight: 1.6,
            color: "#141210",
            marginBottom: "1rem",
          }}
        >
          {sourceCredits}
        </p>
        <span
          className="font-mono"
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            opacity: 0.5,
            textTransform: "uppercase",
            color: "#141210",
          }}
        >
          COLOMBIA 2025 // DESARROLLO CREATIVO FRONT-END CINEMATOGRÁFICO
        </span>
      </div>
    </section>
  );
};
