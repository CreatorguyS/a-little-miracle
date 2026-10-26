"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Trail } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Moon() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const satellite1 = useRef<THREE.Mesh>(null);
  const satellite2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.14;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.09;
    }
    if (ring1.current) ring1.current.rotation.z += delta * 0.09;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.07;

    const t = state.clock.elapsedTime;
    if (satellite1.current) {
      satellite1.current.position.x = Math.cos(t * 0.8) * 1.5;
      satellite1.current.position.y = Math.sin(t * 0.8) * 0.35;
      satellite1.current.position.z = Math.sin(t * 0.8) * 1.5;
    }
    if (satellite2.current) {
      satellite2.current.position.x = Math.cos(t * -1.1 + 2) * 1.35;
      satellite2.current.position.y = Math.sin(t * -1.1 + 2) * 0.45;
      satellite2.current.position.z = Math.sin(t * -1.1 + 2) * 1.35;
    }
  });

  return (
    <group ref={group} position={[0.55, 0.05, 0]}>
      {/* Sculpted Moon Sphere with Opal Luster and Dimensional Depth */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.08, 64, 64]} />
        <meshStandardMaterial
          color="#eee3f5"
          roughness={0.32}
          metalness={0.15}
          emissive="#c49fe4"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Visible Craters in Rich Lavender & Rose */}
      <mesh position={[-0.35, 0.24, 0.89]} scale={[0.22, 0.13, 0.04]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ba91d8" roughness={0.65} />
      </mesh>
      <mesh position={[0.29, -0.35, 0.94]} scale={[0.13, 0.09, 0.03]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#c298db" roughness={0.65} />
      </mesh>
      <mesh position={[0.38, 0.44, 0.92]} scale={[0.09, 0.09, 0.03]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#b588d3" roughness={0.65} />
      </mesh>

      {/* Primary Polished Gold Orbit Ring */}
      <mesh ref={ring1} rotation={[1.08, 0.18, -0.34]}>
        <torusGeometry args={[1.52, 0.026, 16, 160]} />
        <meshStandardMaterial
          color="#d89634"
          metalness={0.88}
          roughness={0.16}
          emissive="#b87216"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* Secondary Delicate Rose-Gold Orbit Ring */}
      <mesh ref={ring2} rotation={[-0.75, 0.32, 0.42]}>
        <torusGeometry args={[1.34, 0.016, 16, 160]} />
        <meshStandardMaterial
          color="#d8779b"
          metalness={0.82}
          roughness={0.22}
          emissive="#b24b75"
          emissiveIntensity={0.55}
        />
      </mesh>

      {/* Orbiting Satellite Pearls */}
      <mesh ref={satellite1}>
        <sphereGeometry args={[0.095, 24, 24]} />
        <meshStandardMaterial color="#fff0d4" emissive="#e89c25" emissiveIntensity={2.4} />
      </mesh>
      <mesh ref={satellite2}>
        <sphereGeometry args={[0.065, 24, 24]} />
        <meshStandardMaterial color="#ffdce9" emissive="#d85288" emissiveIntensity={2.2} />
      </mesh>
    </group>
  );
}

{/* Flying Shooting Star Comet with Luminous Animated Tail */}
function OrbitingComet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * 0.95;
      meshRef.current.position.x = 0.55 + Math.cos(t) * 1.85;
      meshRef.current.position.y = 0.05 + Math.sin(t * 1.3) * 0.75;
      meshRef.current.position.z = Math.sin(t) * 1.55;
    }
  });

  return (
    <Trail width={1.4} length={7} color="#d48a28" attenuation={(t) => t * t}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial color="#fff4dc" emissive="#f39c12" emissiveIntensity={3} />
      </mesh>
    </Trail>
  );
}

{/* Radiant 4-Point Sparkling Star with Pulsing Glow */}
function LittleStar({
  position,
  scale = 1,
  color = "#df9226",
  emissive = "#df8814"
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  emissive?: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.75 + position[0]) * 0.28;
      const pulse = 0.88 + Math.sin(state.clock.elapsedTime * 1.6 + position[1]) * 0.14;
      ref.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Central Diamond Crystal */}
      <mesh>
        <octahedronGeometry args={[0.11, 0]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={2.5} />
      </mesh>
      {/* Horizontal Flare Ray */}
      <mesh scale={[2.6, 0.13, 0.13]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
      {/* Vertical Flare Ray */}
      <mesh scale={[0.13, 2.6, 0.13]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function Scene() {
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, state.pointer.x * 0.14, 0.03);
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -state.pointer.y * 0.09, 0.03);
    }
  });

  return (
    <group ref={root}>
      {/* Balanced Chiaroscuro Lighting for 3D Volume on Light Theme */}
      <ambientLight intensity={0.55} color="#f5e8ff" />
      {/* Key Warm Gold Sunlight */}
      <pointLight position={[3.5, 4, 3.5]} intensity={42} color="#fff1dc" distance={15} />
      {/* Fill Lilac Ambient Light */}
      <pointLight position={[-4, -2.5, 1.5]} intensity={24} color="#cca6f4" distance={13} />
      {/* Rim Sunset Rose Backlight */}
      <pointLight position={[0.5, -3.5, -2.5]} intensity={18} color="#fca8c6" distance={12} />

      {/* Floating 3D Moon & Rings */}
      <Float speed={1.3} rotationIntensity={0.14} floatIntensity={0.35}>
        <Moon />
      </Float>

      {/* Active Orbiting Shooting Star Comet */}
      <OrbitingComet />

      {/* Twinkling Diamond Star Constellation */}
      <LittleStar position={[-1.6, 1.15, 0.15]} scale={0.9} color="#d48a28" emissive="#d48a28" />
      <LittleStar position={[2.0, 1.25, -0.45]} scale={0.7} color="#a852b8" emissive="#9b42ab" />
      <LittleStar position={[2.0, -1.1, 0.15]} scale={0.82} color="#d48a28" emissive="#d48a28" />
      <LittleStar position={[-1.55, -1.2, -0.35]} scale={0.65} color="#c84d7a" emissive="#bf3d6d" />
      <LittleStar position={[-0.2, 1.8, -0.6]} scale={0.55} color="#d48a28" emissive="#d48a28" />

      {/* Rich Twinkling Stardust Dust in Gold & Amethyst (Visually Sparkling on Light Theme) */}
      <Sparkles count={110} scale={[5.8, 4.8, 3.2]} size={3.4} speed={0.32} opacity={0.88} color="#b8741e" />
      <Sparkles count={65} scale={[5.2, 4.2, 3]} size={2.8} speed={0.25} opacity={0.78} color="#8e44ad" />
      <Sparkles count={45} scale={[4.8, 3.8, 2.8]} size={2.4} speed={0.22} opacity={0.72} color="#c0392b" />
    </group>
  );
}

export default function BabyUniverse() {
  return (
    <div className="universe-canvas" aria-label="An animated 3D moon surrounded by stars and glowing stardust" role="img">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
