import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { POVERTY_DATA } from "../data";
import { ArrowDown } from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-mask-char",
        { y: "120%", opacity: 0, rotateZ: 4 },
        { y: "0%", opacity: 1, rotateZ: 0, duration: 1.4, stagger: 0.04, delay: 0.3 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          "-=0.8"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleLetters = POVERTY_DATA.hero.title.split("");

  return (
    <section
      id="hero"
      ref={containerRef}
      className="scene-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Top category eyebrow */}
      <div
        ref={metaRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.25em",
            color: "var(--accent-current)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {POVERTY_DATA.hero.year}
        </span>
        <span style={{ opacity: 0.3 }}>|</span>
        <span
          className="font-mono"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            opacity: 0.7,
            textTransform: "uppercase",
          }}
        >
          {POVERTY_DATA.hero.source}
        </span>
      </div>

      {/* Monumental Title with character masks */}
      <h1
        ref={titleRef}
        className="font-display"
        style={{
          fontSize: "clamp(5rem, 16vw, 19rem)",
          lineHeight: 0.82,
          letterSpacing: "-0.01em",
          color: "var(--text-current)",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          whiteSpace: "pre",
        }}
      >
        {titleLetters.map((char, i) => (
          <span
            key={i}
            className="mask-wrap"
            style={{ overflow: "hidden", display: "inline-block" }}
          >
            <span
              className="hero-mask-char"
              style={{
                display: "inline-block",
                willChange: "transform, opacity",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        style={{
          maxWidth: "680px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <p
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
            fontWeight: 300,
            lineHeight: 1.5,
            opacity: 0.85,
          }}
        >
          {POVERTY_DATA.hero.subtitle}
        </p>

        {/* Scroll down prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            marginTop: "1.5rem",
            opacity: 0.6,
          }}
        >
          <span className="font-mono" style={{ fontSize: "0.75rem", letterSpacing: "0.15em" }}>
            HAZ SCROLL PARA EXPLORAR
          </span>
          <ArrowDown size={14} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
};
