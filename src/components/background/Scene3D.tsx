import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Shared, normalized pointer (-1..1). Tracked at window level so the scene can
 *  react while its canvas stays click-through (pointer-events: none). */
const ptr = { x: 0, y: 0 };
function usePointerTracking() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      ptr.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
}

/**
 * Central faceted crystal: a wireframe icosahedron wrapped around a solid inner
 * core, slowly rotating and leaning toward the pointer. This is the 3D anchor
 * of the hero.
 */
function Crystal() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += delta * 0.04;
    // lean toward the pointer
    group.current.position.x += (ptr.x * 0.4 - group.current.position.x) * 0.03;
    group.current.position.y += (ptr.y * 0.3 - group.current.position.y) * 0.03;
    if (inner.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      {/* wireframe shell */}
      <Icosahedron args={[2, 1]}>
        <meshBasicMaterial color="#6c7bff" wireframe transparent opacity={0.35} />
      </Icosahedron>
      {/* solid inner core */}
      <Icosahedron args={[1.35, 0]} ref={inner}>
        <meshStandardMaterial
          color="#4338ca"
          emissive="#6c7bff"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.7}
          flatShading
        />
      </Icosahedron>
      {/* faint outer halo shell */}
      <Icosahedron args={[2.7, 1]}>
        <meshBasicMaterial color="#9ba5ff" wireframe transparent opacity={0.08} />
      </Icosahedron>
    </group>
  );
}

/** Drifting 3D star field behind the crystal. */
function Starfield({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // spherical shell distribution for depth
      const r = 6 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} frustumCulled>
      <PointMaterial transparent color="#8f9bff" size={0.035} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  );
}

/** Small satellites floating around the crystal. */
function Satellites() {
  const shards = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        pos: [
          Math.cos((i / 7) * Math.PI * 2) * 4.2,
          Math.sin((i / 7) * Math.PI * 2) * 2.4,
          Math.sin((i / 7) * Math.PI * 3) * 2.5,
        ] as [number, number, number],
        scale: 0.12 + (i % 3) * 0.06,
        speed: 1 + (i % 4) * 0.4,
      })),
    []
  );
  return (
    <>
      {shards.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={2} floatIntensity={1.5}>
          <Icosahedron args={[s.scale, 0]} position={s.pos}>
            <meshStandardMaterial color="#9ba5ff" emissive="#6c7bff" emissiveIntensity={0.6} roughness={0.3} metalness={0.6} flatShading />
          </Icosahedron>
        </Float>
      ))}
    </>
  );
}

/** Gentle camera parallax that follows the pointer for a sense of depth. */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x += (ptr.x * 0.6 - state.camera.position.x) * 0.04;
    state.camera.position.y += (ptr.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Scene3D() {
  usePointerTracking();
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#6c7bff" />
      <pointLight position={[-6, -3, 2]} intensity={40} color="#4338ca" />
      <pointLight position={[0, 3, -5]} intensity={30} color="#aeb6ff" />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <Crystal />
        </Float>
        <Satellites />
        <Starfield />
      </Suspense>
      <CameraRig />
    </Canvas>
  );
}
