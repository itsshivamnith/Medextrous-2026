import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { TextureLoader } from "three";
import logo1Image from "../../public/assets/logo1.png";

// Galaxy particles
function GalaxyParticles() {
  const points = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cA = new THREE.Color("#6d28d9");
    const cB = new THREE.Color("#0891b2");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * 5 + 0.5;
      const spin = r * 2.5;
      const branch = ((i % 4) / 4) * Math.PI * 2;
      const jx = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * 2;
      const jy = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * 1;
      const jz = (Math.random() - 0.5) * Math.pow(Math.random(), 3) * 2;
      pos[i3] = Math.cos(branch + spin) * r + jx;
      pos[i3 + 1] = jy;
      pos[i3 + 2] = Math.sin(branch + spin) * r + jz;
      const c = cA.clone().lerp(cB, r / 5);
      col[i3] = c.r; col[i3 + 1] = c.g; col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} sizeAttenuation vertexColors depthWrite={false} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </points>
  );
}

// Saturn-like planet with 2D logo INSIDE sphere + rings
function SaturnLogo() {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);

  const texture = useLoader(TextureLoader, logo1Image);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const ringGeo1 = useMemo(() => new THREE.RingGeometry(0.91, 1.22, 128), []);
  const ringGeo2 = useMemo(() => new THREE.RingGeometry(1.29, 1.47, 128), []);
  const ringGeo3 = useMemo(() => new THREE.RingGeometry(1.54, 1.64, 128), []);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
      group.current.position.y = Math.sin(t.current * 0.7) * 0.1;
    }
  });

  return (
    <group ref={group} rotation={[0.3, 0, 0]} scale={0.7}>

      {/* Dark background disc so white logo is visible */}
      <mesh position={[0, 0, 0]}>
        <circleGeometry args={[0.7, 64]} />
        <meshBasicMaterial
          color="#0d0a1a"
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 2D Logo plane — in FRONT of dark disc */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.1, 1.1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={1}
          alphaTest={0.01}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Glass sphere shell over everything */}
      <mesh>
        <sphereGeometry args={[0.73, 64, 64]} />
        <meshPhysicalMaterial
          roughness={0.05}
          metalness={0.1}
          transmission={0.92}
          transparent
          opacity={0.12}
          color="#9d7dff"
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* Rim glow */}
      <mesh>
        <sphereGeometry args={[0.76, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ring 1 — main */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={ringGeo1} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.55} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Ring 2 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={ringGeo2} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* Ring 3 — faint outer */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={ringGeo3} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.18} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

interface Loader3DProps {
  onComplete: () => void;
}

const Loader3D = ({ onComplete }: Loader3DProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExiting(true), 400);
          setTimeout(() => onComplete(), 1100);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#04030f" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 1.5, 5.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
              <color attach="background" args={["#04030f"]} />
              <ambientLight intensity={0.3} />
              <pointLight position={[4, 3, 4]} intensity={1.4} color="#a78bfa" />
              <pointLight position={[-4, -2, 2]} intensity={0.6} color="#0ea5e9" />
              <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />

              <GalaxyParticles />
              <SaturnLogo />
            </Canvas>
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 38%, rgba(4,3,15,0.85) 100%)" }}
          />

          {/* Bottom HUD */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <div className="relative w-44 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "linear-gradient(to right, #7c3aed, #38bdf8)", boxShadow: "0 0 8px #a78bfa" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.04 }}
              />
            </div>
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "rgba(167,139,250,0.5)",
              textTransform: "uppercase",
            }}>
              {progress >= 100 ? "Ready" : `Loading  ${Math.floor(progress)}%`}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader3D;