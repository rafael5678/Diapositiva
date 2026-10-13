import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

export const DefinitionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blueprint line draw
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1,
          },
        });
      }

      // Text line reveals
      gsap.fromTo(
        ".def-reveal-line",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="definition"
      ref={sectionRef}
      className="scene-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* SVG Blueprint decorative technical diagram */}
      <svg
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "90%",
          height: "80%",
          pointerEvents: "none",
          opacity: 0.18,
        }}
        viewBox="0 0 1000 600"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M 50 100 L 400 100 L 550 250 L 950 250 M 550 250 L 550 550 L 800 550"
          stroke="var(--accent-current)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="100" r="4" fill="var(--accent-current)" />
        <circle cx="950" cy="250" r="4" fill="var(--accent-current)" />
        <circle cx="800" cy="550" r="4" fill="var(--accent-current)" />
      </svg>

      {/* Tag */}
      <div
        className="font-mono"
        style={{
          fontSize: "0.85rem",
          letterSpacing: "0.2em",
          color: "var(--accent-current)",
          marginBottom: "2rem",
        }}
      >
        {POVERTY_DATA.definition.tag}
      </div>

      {/* Giant Quote */}
      <div style={{ maxWidth: "1100px", marginBottom: "3rem" }}>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.8rem, 9.5vw, 11rem)",
            lineHeight: 0.88,
            letterSpacing: "-0.01em",
            color: "var(--text-current)",
          }}
        >
          <span className="mask-wrap">
            <span className="def-reveal-line">ES NO PODER</span>
          </span>
          <br />
          <span className="mask-wrap">
            <span className="def-reveal-line" style={{ color: "var(--accent-current)" }}>
              ELEGIR UNA
            </span>
          </span>
          <br />
          <span className="mask-wrap">
            <span className="def-reveal-line">VIDA DIGNA.</span>
          </span>
        </h2>
      </div>

      {/* Description & 5 fundamental pillars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "3rem",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
              lineHeight: 1.6,
              opacity: 0.85,
              fontWeight: 300,
            }}
          >
            {POVERTY_DATA.definition.description}
          </p>
        </div>

        {/* 5 Pillars Badges */}
        <div>
          <div
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              opacity: 0.6,
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Dimensiones vulneradas:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {POVERTY_DATA.definition.pillars.map((pillar, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: "0.6rem 1.2rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  borderLeft: "2px solid var(--accent-current)",
                }}
              >
                {pillar}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
