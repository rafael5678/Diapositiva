import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface Canvas3DHandle {
  updateTransform: (
    pos: [number, number, number],
    rot: [number, number, number],
    scale: number,
    lightColor?: string
  ) => void;
}

interface Canvas3DProps {
  onReady?: (handle: Canvas3DHandle) => void;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({ onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Target values controlled by GSAP
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const targetRot = useRef<THREE.Euler>(new THREE.Euler(0.3, 0.6, 0));
  const targetScale = useRef<number>(1.15);
  const targetLightHex = useRef<string>("#ffa25f");

  // Mouse tilt offsets
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. SCENE & CAMERA ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // --- 2. RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- 3. PROCEDURAL TEXTURE FOR CORK / CERAMIC MATTE ---
    const texCanvas = document.createElement("canvas");
    texCanvas.width = 512;
    texCanvas.height = 512;
    const ctx = texCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#E07A38";
      ctx.fillRect(0, 0, 512, 512);

      // Micro flecks and grain
      for (let i = 0; i < 18000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 1.5;
        const alpha = Math.random() * 0.15;
        ctx.fillStyle = Math.random() > 0.4 ? `rgba(255, 230, 200, ${alpha})` : `rgba(80, 30, 10, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle concentric grooves like a turned ceramic coaster
      ctx.lineWidth = 1.2;
      for (let r = 40; r < 240; r += 28) {
        ctx.strokeStyle = "rgba(100, 35, 10, 0.08)";
        ctx.beginPath();
        ctx.arc(256, 256, r, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    const texture = new THREE.CanvasTexture(texCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    // --- 4. 3D OBJECT (COASTER / ROUND CERAMIC DISC) ---
    const group = new THREE.Group();

    // Main Disc with beveled rim
    const discRadius = 2.0;
    const discHeight = 0.28;
    const discGeometry = new THREE.CylinderGeometry(
      discRadius,
      discRadius * 0.98,
      discHeight,
      64,
      4
    );

    const discMaterial = new THREE.MeshPhysicalMaterial({
      map: texture,
      color: 0xe27b38,
      roughness: 0.32,
      metalness: 0.08,
      clearcoat: 0.45,
      clearcoatRoughness: 0.25,
      reflectivity: 0.6,
    });

    const discMesh = new THREE.Mesh(discGeometry, discMaterial);
    discMesh.rotation.x = Math.PI / 2; // Flat coaster orientation
    group.add(discMesh);

    // Inner Embossed Ring (product detail like Oryzo coaster)
    const ringGeo = new THREE.TorusGeometry(1.35, 0.04, 24, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xb8551d,
      roughness: 0.4,
      metalness: 0.2,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.position.z = discHeight / 2 + 0.005;
    group.add(ringMesh1);

    const ringMesh2 = ringMesh1.clone();
    ringMesh2.position.z = -discHeight / 2 - 0.005;
    group.add(ringMesh2);

    // Subtle edge rim accent
    const outerRingGeo = new THREE.TorusGeometry(discRadius * 0.97, 0.03, 16, 64);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0xffa463,
      roughness: 0.2,
      metalness: 0.3,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.position.z = discHeight / 2 + 0.002;
    group.add(outerRing);

    scene.add(group);

    // --- 5. LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.8);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8ecae6, 1.2);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffa25f, 3.5, 20);
    rimLight.position.set(0, -3, 3);
    scene.add(rimLight);

    // --- 6. MOUSE MOVE LISTENER ---
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x: nx * 0.3, y: ny * 0.3 };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- 7. RESIZE LISTENER ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Expose transform updater to parent
    if (onReady) {
      onReady({
        updateTransform: (pos, rot, scale, lightColor) => {
          targetPos.current.set(pos[0], pos[1], pos[2]);
          targetRot.current.set(rot[0], rot[1], rot[2]);
          targetScale.current = scale;
          if (lightColor) {
            targetLightHex.current = lightColor;
          }
        },
      });
    }

    // --- 8. RENDER LOOP ---
    let animationFrameId: number;
    const startTime = performance.now();

    const currentLightColor = new THREE.Color("#ffa25f");

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = (performance.now() - startTime) * 0.001;

      // Subtle organic levitation float
      const floatY = Math.sin(time * 1.5) * 0.08;
      const floatRot = Math.cos(time * 1.2) * 0.04;

      // Smooth interpolation (lerp)
      group.position.x = THREE.MathUtils.lerp(
        group.position.x,
        targetPos.current.x + mousePos.current.x * 0.4,
        0.08
      );
      group.position.y = THREE.MathUtils.lerp(
        group.position.y,
        targetPos.current.y + floatY + mousePos.current.y * 0.4,
        0.08
      );
      group.position.z = THREE.MathUtils.lerp(
        group.position.z,
        targetPos.current.z,
        0.08
      );

      group.rotation.x = THREE.MathUtils.lerp(
        group.rotation.x,
        targetRot.current.x - mousePos.current.y * 0.3,
        0.08
      );
      group.rotation.y = THREE.MathUtils.lerp(
        group.rotation.y,
        targetRot.current.y + time * 0.15 + mousePos.current.x * 0.3,
        0.08
      );
      group.rotation.z = THREE.MathUtils.lerp(
        group.rotation.z,
        targetRot.current.z + floatRot,
        0.08
      );

      const currentScale = group.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, targetScale.current, 0.08);
      group.scale.set(newScale, newScale, newScale);

      // Light color transition
      currentLightColor.lerp(new THREE.Color(targetLightHex.current), 0.05);
      rimLight.color.copy(currentLightColor);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      discGeometry.dispose();
      discMaterial.dispose();
      texture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="webgl-canvas-container" ref={containerRef} />;
};
