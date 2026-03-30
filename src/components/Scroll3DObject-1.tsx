import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Shard = {
  position: THREE.Vector3;
  normal: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  color: string;
  wireframe: boolean;
};

const SHARD_COUNT = 14;
const COLORS = ["#2dd4a8", "#f59e0b", "#a855f7", "#60a5fa"];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function buildShards(): Shard[] {
  const shards: Shard[] = [];

  for (let i = 0; i < SHARD_COUNT; i += 1) {
    const u = i / SHARD_COUNT;
    const theta = u * Math.PI * 2 * 1.618;
    const phi = Math.acos(1 - 2 * (u + 0.5 / SHARD_COUNT));

    const radius = 1.25 + seededRandom(i + 1) * 0.6;
    const position = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
    const normal = position.clone().normalize();

    shards.push({
      position,
      normal,
      rotation: new THREE.Euler(
        seededRandom(i + 10) * Math.PI,
        seededRandom(i + 20) * Math.PI,
        seededRandom(i + 30) * Math.PI
      ),
      scale: 0.28 + seededRandom(i + 40) * 0.18,
      color: COLORS[i % COLORS.length],
      wireframe: i % 5 === 0,
    });
  }

  return shards;
}

function useScrollProgress() {
  const progressRef = useRef({ scroll: 0, target: 0, decon: 0, sway: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const main = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current.target = self.progress;
        },
      });

      const deconstruct = ScrollTrigger.create({
        trigger: document.body,
        start: "30% top",
        end: "70% top",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current.decon = self.progress;
        },
      });

      const sway = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current.sway = self.progress;
        },
      });

      return () => {
        main.kill();
        deconstruct.kill();
        sway.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  return progressRef;
}

function DeconstructingObject() {
  const groupRef = useRef<THREE.Group>(null);
  const shardsRef = useRef<(THREE.Mesh | null)[]>([]);
  const pulseRef = useRef(0);
  const progressRef = useScrollProgress();

  const shards = useMemo(() => buildShards(), []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = progressRef.current;
    progress.scroll += (progress.target - progress.scroll) * Math.min(1, delta * 6);

    const t = state.clock.elapsedTime;
    const scroll = progress.scroll;
    const decon = progress.decon;
    const sway = progress.sway;

    const easeDecon = THREE.MathUtils.smoothstep(decon, 0, 1);
    pulseRef.current = THREE.MathUtils.lerp(pulseRef.current, easeDecon, Math.min(1, delta * 8));

    const xBase = THREE.MathUtils.lerp(3.15, 2.25, scroll);
    const xWave = Math.sin(scroll * Math.PI * 4 + t * 0.25) * 0.55;
    const yPos = THREE.MathUtils.lerp(0.75, -2.55, scroll);
    const zPos = Math.sin(t * 0.35 + sway * Math.PI * 2) * 0.22;

    group.position.set(xBase + xWave, yPos, zPos);
    group.rotation.y = t * 0.22 + scroll * Math.PI * 1.6;
    group.rotation.x = Math.sin(t * 0.18) * 0.16;
    group.rotation.z = Math.cos(t * 0.14) * 0.08;

    const explode = 0.3 + pulseRef.current * 2.15;
    const coreBreath = 1 + Math.sin(t * 2.2) * 0.025;

    shardsRef.current.forEach((mesh, i) => {
      if (!mesh) return;

      const shard = shards[i];
      const direction = shard.normal.clone();
      const outward = direction.multiplyScalar(explode);

      mesh.position.set(
        shard.position.x + outward.x,
        shard.position.y + outward.y,
        shard.position.z + outward.z
      );

      mesh.rotation.x = shard.rotation.x + t * (0.55 + i * 0.012) + pulseRef.current * 1.8;
      mesh.rotation.y = shard.rotation.y + t * (0.4 + i * 0.01) - pulseRef.current * 1.2;
      mesh.rotation.z = shard.rotation.z + t * 0.18;

      const scalePulse = 1 + pulseRef.current * 0.16 + Math.sin(t * 3 + i) * 0.012;
      mesh.scale.setScalar(shard.scale * scalePulse);
    });

    group.children.forEach((child) => {
      if ((child as THREE.Mesh).isMesh && child.name === "core-glow") {
        child.scale.setScalar(coreBreath * (1 + pulseRef.current * 0.3));
      }
      if ((child as THREE.Mesh).isMesh && child.name === "halo-glow") {
        child.scale.setScalar(1 + pulseRef.current * 0.55 + Math.sin(t * 0.9) * 0.02);
      }
    });
  });

  return (
    <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef}>
        {shards.map((shard, i) => (
          <mesh
            key={i}
            ref={(el) => {
              shardsRef.current[i] = el;
            }}
            position={shard.position}
          >
            <octahedronGeometry args={[shard.scale, 0]} />
            <meshPhysicalMaterial
              color={shard.color}
              emissive={shard.color}
              emissiveIntensity={0.65}
              metalness={0.9}
              roughness={0.18}
              clearcoat={1}
              clearcoatRoughness={0.08}
              transparent
              opacity={0.92}
              wireframe={shard.wireframe}
            />
          </mesh>
        ))}

        <mesh name="core-glow">
          <sphereGeometry args={[0.52, 32, 32]} />
          <meshPhysicalMaterial
            color="#d1fae5"
            emissive="#2dd4a8"
            emissiveIntensity={4}
            transparent
            opacity={0.35}
            metalness={0.2}
            roughness={0.1}
            transmission={0.35}
            thickness={0.8}
          />
        </mesh>

        <mesh name="halo-glow">
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshBasicMaterial color="#2dd4a8" transparent opacity={0.075} />
        </mesh>

        <Sparkles count={18} scale={3.5} size={2.2} speed={0.25} noise={0.8} />
      </group>
    </Float>
  );
}

export default function Scroll3DObject() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 48 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
          <pointLight position={[-4, -2, 3]} intensity={1.1} color="#a855f7" />
          <pointLight position={[2, 2, 2]} intensity={0.85} color="#2dd4a8" />

          <Environment preset="city" />
          <DeconstructingObject />

          <EffectComposer multisampling={0}>
            <Bloom intensity={0.95} luminanceThreshold={0.08} luminanceSmoothing={0.9} mipmapBlur />
            <Noise opacity={0.045} />
            <Vignette eskil={false} offset={0.18} darkness={0.75} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
