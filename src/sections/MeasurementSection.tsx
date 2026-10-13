import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";

gsap.registerPlugin(ScrollTrigger);

export const MeasurementSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [monetariaVal, setMonetariaVal] = useState("0,0%");
  const [multiVal, setMultiVal] = useState("0,0%");
  const [giniVal, setGiniVal] = useState("0,000");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation object
      const obj = { val1: 0, val2: 0, val3: 0 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val1: 28.0,
            val2: 9.9,
            val3: 0.531,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => {
              setMonetariaVal(obj.val1.toFixed(1).replace(".", ",") + "%");
              setMultiVal(obj.val2.toFixed(1).replace(".", ",") + "%");
              setGiniVal(obj.val3.toFixed(3).replace(".", ","));
            },
          });
        },
      });

      gsap.fromTo(
        ".measure-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [monetariaVal, multiVal, giniVal];

  return (
    <section
      id="measurement"
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
      {/* Eyebrow and Section Title */}
      <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
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
          03 // METODOLOGÍA DANE
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(3.5rem, 8vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          CÓMO SE MIDE
        </h2>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.1rem",
            opacity: 0.75,
            maxWidth: "650px",
            marginInline: "auto",
          }}
        >
          Las tres métricas oficiales que radiografían el bienestar económico y la concentración de la riqueza en el país.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "2.5rem",
          width: "100%",
          maxWidth: "1150px",
        }}
      >
        {POVERTY_DATA.measurement.map((item, idx) => (
          <div
            key={item.id}
            className="measure-card glass-panel"
            style={{
              padding: "3rem 2.2rem",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderTop: "3px solid var(--accent-current)",
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  opacity: 0.6,
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                {item.label}
              </div>

              {/* Huge animated counter */}
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(4.2rem, 6.8vw, 7.5rem)",
                  lineHeight: 0.88,
                  color: "var(--accent-current)",
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {values[idx]}
              </div>

              <p
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.5,
                  opacity: 0.85,
                  marginBottom: "1.2rem",
                }}
              >
                {item.description}
              </p>
            </div>

            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                opacity: 0.55,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "1rem",
                lineHeight: 1.4,
              }}
            >
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
