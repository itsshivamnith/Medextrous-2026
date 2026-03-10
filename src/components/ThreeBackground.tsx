import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Static star field ──────────────────────────────────────────────────────────
function Stars() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 45;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
    ref.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.052} color="#a5b4fc" sizeAttenuation transparent opacity={0.95} depthWrite={false} />
    </points>
  );
}

// ── Single comet ───────────────────────────────────────────────────────────────
function Comet({ seed }: { seed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);

  const cfg = useMemo(() => {
    const rng = (o = 0) => Math.abs(Math.sin(seed * 127.1 + o * 311.7));
    return {
      startX:  (rng(0) - 0.5) * 36,
      startY:  10 + rng(1) * 6,
      z:       1 + rng(2) * 2,
      speed:   0.7 + rng(3) * 0.6,        // slow drift
      angle:   (rng(4) - 0.5) * 0.3,
      length:  0.9 + rng(5) * 0.7,        // modest size
      period:  22 + rng(6) * 20,
      offset:  rng(7) * 50,
    };
  }, [seed]);

  useFrame((state) => {
    const t       = state.clock.elapsedTime + cfg.offset;
    const cycleT  = t % cfg.period;
    const traveled = cycleT * cfg.speed;
    const visible  = traveled < cfg.startY + 18;

    if (groupRef.current) groupRef.current.visible = visible;
    if (!visible) return;

    if (groupRef.current) {
      groupRef.current.position.x = cfg.startX + Math.sin(cfg.angle) * traveled * 0.4;
      groupRef.current.position.y = cfg.startY - traveled;
      groupRef.current.position.z = cfg.z;
    }

    const life  = traveled / (cfg.startY + 14);
    const alpha = life < 0.08 ? life / 0.08 : life > 0.78 ? (1 - life) / 0.22 : 1;

    if (trailRef.current) {
      (trailRef.current.material as THREE.MeshBasicMaterial).opacity = alpha * 0.82;
    }
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = alpha * 0.10;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, cfg.angle]}>
      {/* subtle background glow — indigo tint, no white */}
      <mesh ref={glowRef} position={[0, -cfg.length * 0.4, 0]}>
        <sphereGeometry args={[0.32, 10, 10]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.10} depthWrite={false} />
      </mesh>

      {/* tapered trail: thin tip → thicker base */}
      <mesh ref={trailRef} position={[0, -cfg.length / 2, 0]}>
        <cylinderGeometry args={[0.008, 0.048, cfg.length, 8, 1, false]} />
        <meshBasicMaterial color="#c7d2fe" transparent opacity={0.82} depthWrite={false} />
      </mesh>

      {/* tiny leading head */}
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.022, 7, 7]} />
        <meshBasicMaterial color="#e0e7ff" transparent opacity={0.90} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ShootingStars() {
  return <>{[1,2,3,4,5,6].map(s => <Comet key={s} seed={s} />)}</>;
}

// ── Network lines ──────────────────────────────────────────────────────────────
function NetworkLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const positions = useMemo(() => {
    const nodes: [number,number,number][] = [];
    for (let i = 0; i < 40; i++) {
      nodes.push([
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        -8 + (Math.random() - 0.5) * 10,
      ]);
    }
    const segs: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0]-nodes[j][0];
        const dy = nodes[i][1]-nodes[j][1];
        const dz = nodes[i][2]-nodes[j][2];
        if (Math.sqrt(dx*dx+dy*dy+dz*dz) < 14) segs.push(...nodes[i], ...nodes[j]);
      }
    }
    return new Float32Array(segs);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    (ref.current.material as THREE.LineBasicMaterial).opacity = 0.07 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#818cf8" transparent opacity={0.08} depthWrite={false} />
    </lineSegments>
  );
}

// ── Camera drift ───────────────────────────────────────────────────────────────
function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.05) * 0.7;
    state.camera.position.y = Math.cos(t * 0.04) * 0.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const ThreeBackground = () => (
  <div
    className="fixed inset-0 -z-10"
    style={{ background: 'radial-gradient(ellipse at 50% 40%, #0e0c1e 0%, #07060f 55%, #020108 100%)' }}
  >
    <Canvas camera={{ position: [0, 0, 12], fov: 58 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <CameraDrift />
      <Stars />
      <NetworkLines />
      <ShootingStars />
    </Canvas>
  </div>
);

export default ThreeBackground;