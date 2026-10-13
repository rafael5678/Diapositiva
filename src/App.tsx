import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SECTIONS } from "./animationConfig";
import { Canvas3D, type Canvas3DHandle } from "./components/Canvas3D";
import { CustomCursor } from "./components/CustomCursor";
import { Header } from "./components/Header";
import { ProgressNav } from "./components/ProgressNav";

import { HeroSection } from "./sections/HeroSection";
import { DefinitionSection } from "./sections/DefinitionSection";
import { TypesSection } from "./sections/TypesSection";
import { MeasurementSection } from "./sections/MeasurementSection";
import { CausesSection } from "./sections/CausesSection";
import { ConsequencesSection } from "./sections/ConsequencesSection";
import { RuralUrbanSection } from "./sections/RuralUrbanSection";
import { ColombiaSection } from "./sections/ColombiaSection";
import { ProgramsSection } from "./sections/ProgramsSection";
import { SolutionsSection } from "./sections/SolutionsSection";
import { ConclusionSection } from "./sections/ConclusionSection";

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvas3DHandleRef = useRef<Canvas3DHandle | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Jump to specific section
  const jumpToSection = useCallback((index: number) => {
    const targetSection = SECTIONS[index];
    if (!targetSection) return;
    const el = document.getElementById(targetSection.id);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handlePrevSection = useCallback(() => {
    if (currentSectionIndex > 0) {
      jumpToSection(currentSectionIndex - 1);
    }
  }, [currentSectionIndex, jumpToSection]);

  const handleNextSection = useCallback(() => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      jumpToSection(currentSectionIndex + 1);
    }
  }, [currentSectionIndex, jumpToSection]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.code === "Space") {
        e.preventDefault();
        handleNextSection();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSection();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextSection, handlePrevSection, toggleFullscreen]);

  // Lenis Smooth Scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Set up 3D Object waypoints & Background transitions
  useEffect(() => {
    // Wait for DOM to settle
    const timer = setTimeout(() => {
      SECTIONS.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => {
            setCurrentSectionIndex(index);
            applyTheme(section);
          },
          onEnterBack: () => {
            setCurrentSectionIndex(index);
            applyTheme(section);
          },
        });
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const applyTheme = (section: (typeof SECTIONS)[0]) => {
    const root = document.documentElement;
    root.style.setProperty("--bg-current", section.bgColor);
    root.style.setProperty("--bg-gradient-current", section.bgGradient);
    root.style.setProperty("--text-current", section.textColor);
    root.style.setProperty("--accent-current", section.accentColor);

    if (canvas3DHandleRef.current) {
      const { position, rotation, scale, lightColor } = section.object3D;
      canvas3DHandleRef.current.updateTransform(
        position,
        rotation,
        scale,
        lightColor
      );
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Film Grain & Peripheral Vignette */}
      <div className="film-grain" />
      <div className="vignette" />

      {/* Interactive Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Central 3D Coaster / Disc Canvas */}
      <Canvas3D
        onReady={(handle) => {
          canvas3DHandleRef.current = handle;
        }}
      />

      {/* Minimal Top Editorial Header */}
      <Header
        currentSectionIndex={currentSectionIndex}
        totalSections={SECTIONS.length}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onPrevSection={handlePrevSection}
        onNextSection={handleNextSection}
        onJumpToSection={jumpToSection}
      />

      {/* Right Progress Line and Presentation Counter */}
      <ProgressNav
        currentSectionIndex={currentSectionIndex}
        onJumpToSection={jumpToSection}
      />

      {/* 11 Cinematic Sections */}
      <main>
        <HeroSection />
        <DefinitionSection />
        <TypesSection />
        <MeasurementSection />
        <CausesSection />
        <ConsequencesSection />
        <RuralUrbanSection />
        <ColombiaSection />
        <ProgramsSection />
        <SolutionsSection />
        <ConclusionSection />
      </main>
    </div>
  );
};

export default App;
