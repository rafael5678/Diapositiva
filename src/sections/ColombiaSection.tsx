import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { POVERTY_DATA } from "../data";
import { TrendingDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const ColombiaSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayNumber, setDisplayNumber] = useState("31,8%");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter dropping from 31.8% to 28.0%
      const valObj = { val: 31.8 };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        once: true,
        onEnter: () => {
          gsap.to(valObj, {
            val: 28.0,
            duration: 2.4,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayNumber(valObj.val.toFixed(1).replace(".", ",") + "%");
            },
          });
        },
      });

      // Animate city comparison
      gsap.fromTo(
        ".city-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cities-container",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { extreme, multidimensional, cities } = POVERTY_DATA.colombia;

  return (
    <section
      id="colombia"
      ref={sectionRef}
      className="scene-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Eyebrow */}
      <div
        className="font-mono"
        style={{
          fontSize: "0.85rem",
          letterSpacing: "0.2em",
          color: "var(--accent-current)",
          marginBottom: "1rem",
          textTransform: "uppercase",
        }}
      >
        07 // PANORAMA NACIONAL
      </div>

      <h2
        className="font-display"
        style={{
          fontSize: "clamp(3.5rem, 8vw, 8.5rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.01em",
          marginBottom: "1.5rem",
        }}
      >
        LA POBREZA EN COLOMBIA
      </h2>

      {/* Main Dropping Percentage block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "3.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div
            className="font-display"
            style={{
              fontSize: "clamp(6rem, 16vw, 18rem)",
              lineHeight: 0.8,
              color: "var(--accent-current)",
              letterSpacing: "-0.02em",
            }}
          >
            {displayNumber}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "0.4rem",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.9rem",
                backgroundColor: "rgba(42, 157, 143, 0.2)",
                color: "#2a9d8f",
                borderRadius: "100px",
                fontSize: "0.85rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
              }}
            >
              <TrendingDown size={16} />
              -3,8 pp
            </div>
            <span
              className="font-mono"
              style={{ fontSize: "0.75rem", opacity: 0.6, letterSpacing: "0.08em" }}
            >
              FRENTE AL 31,8% EN 2024
            </span>
          </div>
        </div>

        <p style={{ maxWidth: "600px", fontSize: "1.1rem", opacity: 0.85, marginTop: "1rem" }}>
          Tasa nacional de pobreza monetaria certificada por el DANE para el periodo 2024-2025.
        </p>
      </div>

      {/* Secondary Metrics */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2.5rem",
          marginBottom: "4rem",
        }}
      >
        <div className="glass-panel" style={{ padding: "1.5rem 2.8rem", borderRadius: "100px" }}>
          <span className="font-mono" style={{ fontSize: "0.75rem", opacity: 0.6, marginRight: "0.8rem" }}>
            POBREZA EXTREMA:
          </span>
          <span className="font-display" style={{ fontSize: "2rem", color: "#E63946" }}>
            {extreme}%
          </span>
        </div>

        <div className="glass-panel" style={{ padding: "1.5rem 2.8rem", borderRadius: "100px" }}>
          <span className="font-mono" style={{ fontSize: "0.75rem", opacity: 0.6, marginRight: "0.8rem" }}>
            MULTIDIMENSIONAL (IPM):
          </span>
          <span className="font-display" style={{ fontSize: "2rem", color: "#4CC98C" }}>
            {multidimensional}%
          </span>
        </div>
      </div>

      {/* City Comparison (Quibdó vs Manizales) */}
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <div
          className="font-mono"
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.15em",
            opacity: 0.6,
            marginBottom: "1.5rem",
            textTransform: "uppercase",
          }}
        >
          Extremos de disparidad urbana (Pobreza Monetaria):
        </div>

        <div
          className="cities-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Quibdo */}
          <div
            className="city-card glass-panel"
            style={{
              padding: "2.2rem",
              borderRadius: "20px",
              borderLeft: "4px solid #E63946",
              textAlign: "left",
            }}
          >
            <div className="font-mono" style={{ fontSize: "0.75rem", opacity: 0.6, marginBottom: "0.4rem" }}>
              CIUDAD CON MAYOR INCIDENCIA
            </div>
            <div className="font-heading" style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              {cities.high.name}
            </div>
            <div className="font-display" style={{ fontSize: "3.8rem", color: "#E63946", lineHeight: 1 }}>
              {cities.high.value}%
            </div>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.6rem" }}>
              Más de 6 de cada 10 habitantes no alcanzan la canasta básica.
            </p>
          </div>

          {/* Manizales */}
          <div
            className="city-card glass-panel"
            style={{
              padding: "2.2rem",
              borderRadius: "20px",
              borderLeft: "4px solid #2A9D8F",
              textAlign: "left",
            }}
          >
            <div className="font-mono" style={{ fontSize: "0.75rem", opacity: 0.6, marginBottom: "0.4rem" }}>
              CIUDAD CON MENOR INCIDENCIA
            </div>
            <div className="font-heading" style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              {cities.low.name}
            </div>
            <div className="font-display" style={{ fontSize: "3.8rem", color: "#2A9D8F", lineHeight: 1 }}>
              {cities.low.value}%
            </div>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.6rem" }}>
              La capital de Caldas registra la menor tasa de pobreza monetaria de Colombia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
