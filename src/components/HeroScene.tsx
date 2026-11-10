import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Group, Mesh } from 'three';

type HeroSceneProps = {
  onReady?: () => void;
  onContextLost?: () => void;
  onContextRestored?: () => void;
};

function OrbitalSculpture() {
  const mainGroup = useRef<Group>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);
  const coreRef = useRef<Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Smooth mouse tilt coordinates
  const currentTilt = useRef({ x: 0, y: 0 });
  const [isPointerInside, setIsPointerInside] = useState(false);
  const isVisibleRef = useRef(true);

  // Pause rendering when hero is scrolled out of viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Responsive particle count based on viewport width
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 24;
    const w = window.innerWidth;
    if (w < 640) return 8; // Mobile
    if (w < 1024) return 14; // Tablet
    return 24; // Desktop
  }, []);

  // Responsive geometry segments for mobile performance
  const ringSegments = useMemo(() => {
    if (typeof window === 'undefined') return { radial: 28, tubular: 90 };
    const w = window.innerWidth;
    if (w < 640) return { radial: 18, tubular: 64 };
    if (w < 1024) return { radial: 24, tubular: 80 };
    return { radial: 28, tubular: 90 };
  }, []);

  const sphereSegments = useMemo(() => {
    if (typeof window === 'undefined') return 44;
    return window.innerWidth < 640 ? 32 : 44;
  }, []);

  // Orbiting particles geometry (metallic / lime sparks)
  const particleGeometry = useMemo(() => {
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const radius = 1.35 + (i % 4) * 0.16;
      const height = Math.sin(i * 1.9) * 0.65;
      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [particleCount]);

  // Clean disposal of particle geometry on unmount
  useEffect(() => {
    return () => {
      particleGeometry.dispose();
    };
  }, [particleGeometry]);

  useFrame(({ clock, pointer, gl }, delta) => {
    if (!mainGroup.current || !isVisibleRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const time = clock.elapsedTime;

      // 1. Continuous slow yaw & gentle vertical floating bob
      mainGroup.current.position.y = Math.sin(time * 0.75) * 0.08;
      mainGroup.current.rotation.y += delta * 0.14;

      // 2. Three interlocking rings with independent rotation speeds & directions
      if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.20;
      if (ring2Ref.current) ring2Ref.current.rotation.x += delta * 0.17;
      if (ring3Ref.current) ring3Ref.current.rotation.y -= delta * 0.15;

      // 3. Subtle floating particles rotation
      if (particlesRef.current) {
        particlesRef.current.rotation.y += delta * 0.22;
        particlesRef.current.rotation.x += delta * 0.07;
      }

      // 4. Subtle core breathing pulsation
      if (coreRef.current) {
        const scale = 1 + Math.sin(time * 1.6) * 0.025;
        coreRef.current.scale.set(scale, scale, scale);
      }
    }

    // 5. Smooth pointer parallax on desktop (disabled on coarse touch devices)
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches;

    const targetX =
      !prefersReducedMotion && isFinePointer && isPointerInside
        ? pointer.y * -0.42
        : 0;
    const targetY =
      !prefersReducedMotion && isFinePointer && isPointerInside
        ? pointer.x * 0.48
        : 0;

    const lerpSpeed = Math.min(1, delta * 3.5);
    currentTilt.current.x = THREE.MathUtils.lerp(currentTilt.current.x, targetX, lerpSpeed);
    currentTilt.current.y = THREE.MathUtils.lerp(currentTilt.current.y, targetY, lerpSpeed);

    if (mainGroup.current) {
      mainGroup.current.rotation.x = currentTilt.current.x;
      mainGroup.current.rotation.z = currentTilt.current.y * 0.35;
    }

    // 6. Telemetry data attributes on canvas DOM element for automated verification
    if (gl.domElement) {
      gl.domElement.dataset.rotY = mainGroup.current.rotation.y.toFixed(4);
      gl.domElement.dataset.ring1Rot = ring1Ref.current?.rotation.z.toFixed(4) || '0';
      gl.domElement.dataset.ring2Rot = ring2Ref.current?.rotation.x.toFixed(4) || '0';
      gl.domElement.dataset.ring3Rot = ring3Ref.current?.rotation.y.toFixed(4) || '0';
      gl.domElement.dataset.posY = mainGroup.current.position.y.toFixed(4);
      gl.domElement.dataset.tiltX = currentTilt.current.x.toFixed(4);
      gl.domElement.dataset.tiltY = currentTilt.current.y.toFixed(4);
      gl.domElement.dataset.frameCount = String(
        (Number(gl.domElement.dataset.frameCount) || 0) + 1
      );
    }
  });

  return (
    <>
      {/* Studio Lighting with Specular Highlights */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[6, 8, 6]} intensity={3.4} color="#ffffff" />
      <directionalLight position={[-6, -4, -4]} intensity={2.0} color="#dbe7f2" />
      <pointLight position={[0, 0, 0]} color="#B7F52B" intensity={18} distance={7} />
      <pointLight position={[3.2, -2, 2.5]} color="#B7F52B" intensity={10} distance={8} />

      <group
        ref={mainGroup}
        scale={[0.92, 0.92, 0.92]}
        onPointerEnter={() => setIsPointerInside(true)}
        onPointerLeave={() => setIsPointerInside(false)}
      >
        {/* Central Translucent Glowing Lime Core */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.74, sphereSegments, sphereSegments]} />
          <meshPhysicalMaterial
            color="#B7F52B"
            emissive="#84be39"
            emissiveIntensity={0.36}
            roughness={0.12}
            metalness={0.15}
            transmission={0.72}
            thickness={1.35}
            ior={1.48}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
          />
        </mesh>

        {/* Ring 1 — Outer Chrome Ring */}
        <mesh ref={ring1Ref} rotation={[0.65, 0.45, 0.2]}>
          <torusGeometry args={[1.72, 0.046, ringSegments.radial, ringSegments.tubular]} />
          <meshPhysicalMaterial
            color="#f2f5f8"
            metalness={0.98}
            roughness={0.06}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            reflectivity={0.98}
          />
          {/* Accent chrome bead on Ring 1 */}
          <mesh position={[1.72, 0, 0]}>
            <sphereGeometry args={[0.085, 24, 24]} />
            <meshPhysicalMaterial color="#ffffff" metalness={1} roughness={0.04} clearcoat={1} />
          </mesh>
        </mesh>

        {/* Ring 2 — Middle Intersecting Chrome Ring */}
        <mesh ref={ring2Ref} rotation={[-0.72, 0.82, 0.35]}>
          <torusGeometry args={[1.40, 0.044, ringSegments.radial, ringSegments.tubular]} />
          <meshPhysicalMaterial
            color="#f4f7f9"
            metalness={0.97}
            roughness={0.07}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
          {/* Accent lime bead on Ring 2 */}
          <mesh position={[0, 1.40, 0]}>
            <sphereGeometry args={[0.08, 24, 24]} />
            <meshPhysicalMaterial
              color="#B7F52B"
              emissive="#B7F52B"
              emissiveIntensity={0.6}
              roughness={0.2}
              clearcoat={1}
            />
          </mesh>
        </mesh>

        {/* Ring 3 — Inner Intersecting Chrome Ring */}
        <mesh ref={ring3Ref} rotation={[0.48, -0.65, 1.1]}>
          <torusGeometry args={[1.14, 0.040, ringSegments.radial, ringSegments.tubular]} />
          <meshPhysicalMaterial
            color="#ecf0f3"
            metalness={0.98}
            roughness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Floating Sparks / Particles */}
        <points ref={particlesRef} geometry={particleGeometry}>
          <pointsMaterial
            size={0.045}
            color="#B7F52B"
            transparent
            opacity={0.85}
            sizeAttenuation
          />
        </points>
      </group>
    </>
  );
}

function WebGLContextWatcher({
  onContextLost,
  onContextRestored,
}: {
  onContextLost?: () => void;
  onContextRestored?: () => void;
}) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    if (!canvas) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost; reverting gracefully to CSS fallback.');
      onContextLost?.();
    };

    const handleContextRestored = () => {
      console.info('WebGL context restored successfully.');
      onContextRestored?.();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl, onContextLost, onContextRestored]);

  return null;
}

export default function HeroScene({ onReady, onContextLost, onContextRestored }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.0], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={() => {
        // Scene and WebGL renderer are fully initialized and ready to reveal
        onReady?.();
      }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <WebGLContextWatcher onContextLost={onContextLost} onContextRestored={onContextRestored} />
      <OrbitalSculpture />
    </Canvas>
  );
}
