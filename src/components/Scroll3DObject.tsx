import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Shard = {
  position: THREE.Vector3;
  target: THREE.Vector3;
  normal: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  targetScale: number;
  color: string;
  wireframe: boolean;
};

const SHARD_COUNT = 220;
const COLORS = ["#2dd4a8", "#f59e0b", "#a855f7", "#60a5fa"];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function shuffleWithSeed<T>(items: T[], seed = 1): T[] {
  const arr = [...items];
  let currentIndex = arr.length;

  while (currentIndex > 0) {
    const randomIndex = Math.floor(seededRandom(seed + currentIndex) * currentIndex);
    currentIndex -= 1;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}

function buildFallbackTargets(count: number) {
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < count; i += 1) {
    const u = i / count;
    const theta = u * Math.PI * 2 * 1.618;
    const phi = Math.acos(1 - 2 * (u + 0.5 / count));
    const radius = 1.4;

    points.push(new THREE.Vector3().setFromSphericalCoords(radius, phi, theta));
  }

  return points;
}

function buildTextTargets(text: string, count: number) {
  if (typeof document === "undefined") return buildFallbackTargets(count);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return buildFallbackTargets(count);

  canvas.width = 1800;
  canvas.height = 520;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 220px Arial Black, Inter, system-ui, sans-serif";
  ctx.fillText(text.toUpperCase(), canvas.width / 2, canvas.height / 2 + 12);

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const sampled: THREE.Vector3[] = [];

  const step = 8;
  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const idx = (y * canvas.width + x) * 4;
      const alpha = image[idx + 3];

      if (alpha > 24) {
        const nx = (x / canvas.width - 0.5) * 6.8;
        const ny = (0.5 - y / canvas.height) * 2.2;
        const nz = (seededRandom(x * 0.13 + y * 0.17) - 0.5) * 0.45;
        sampled.push(new THREE.Vector3(nx, ny, nz));
      }
    }
  }

  const shuffled = shuffleWithSeed(sampled, 9);

  if (!shuffled.length) return buildFallbackTargets(count);

  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i += 1) {
    const base = shuffled[i % shuffled.length].clone();
    const jitter = 0.03 + seededRandom(i + 91) * 0.08;

    points.push(
      base.add(
        new THREE.Vector3(
          (seededRandom(i + 11) - 0.5) * jitter,
          (seededRandom(i + 21) - 0.5) * jitter,
          (seededRandom(i + 31) - 0.5) * jitter
        )
      )
    );
  }

  return points;
}

function buildShards(targets: THREE.Vector3[]): Shard[] {
  const shards: Shard[] = [];

  for (let i = 0; i < SHARD_COUNT; i += 1) {
    const u = i / SHARD_COUNT;
    const theta = u * Math.PI * 2 * 1.618;
    const phi = Math.acos(1 - 2 * (u + 0.5 / SHARD_COUNT));

    const radius = 1.2 + seededRandom(i + 1) * 0.8;
    const position = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
    const normal = position.clone().normalize();
    const target = targets[i].clone();

    shards.push({
      position,
      target,
      normal,
      rotation: new THREE.Euler(
        seededRandom(i + 10) * Math.PI,
        seededRandom(i + 20) * Math.PI,
        seededRandom(i + 30) * Math.PI
      ),
      scale: 0.22 + seededRandom(i + 40) * 0.16,
      targetScale: 0.06 + seededRandom(i + 50) * 0.05,
      color: COLORS[i % COLORS.length],
      wireframe: i % 6 === 0,
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
        start: "25% top",
        end: "75% top",
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
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);
  const progressRef = useScrollProgress();

  const targets = useMemo(() => buildTextTargets("NORTHMAN", SHARD_COUNT), []);
  const shards = useMemo(() => buildShards(targets), [targets]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = progressRef.current;
    const lerpFactor = 1 - Math.exp(-delta * 6);
    progress.scroll += (progress.target - progress.scroll) * lerpFactor;

    const t = state.clock.elapsedTime;
    const scroll = progress.scroll;
    const decon = progress.decon;
    const sway = progress.sway;

    const morph = THREE.MathUtils.smoothstep(scroll, 0.18, 0.9);
    const easeDecon = THREE.MathUtils.smoothstep(decon, 0, 1);
    pulseRef.current = THREE.MathUtils.lerp(pulseRef.current, easeDecon, Math.min(1, delta * 8));

    const xBase = THREE.MathUtils.lerp(3.0, 0.0, scroll);
    const xWave = Math.sin(scroll * Math.PI * 4 + t * 0.25) * (0.55 * (1 - morph));
    const yPos = THREE.MathUtils.lerp(0.8, 0.15, scroll);
    const zPos = Math.sin(t * 0.35 + sway * Math.PI * 2) * (0.22 * (1 - morph));

    group.position.set(xBase + xWave, yPos, zPos);
    group.rotation.y = t * 0.18 * (1 - morph) + scroll * 0.35;
    group.rotation.x = Math.sin(t * 0.16) * 0.12 * (1 - morph);
    group.rotation.z = Math.cos(t * 0.12) * 0.06 * (1 - morph);

    const explode = 0.15 + (1 - morph) * 1.9;
    const coreBreath = 1 + Math.sin(t * 2.2) * 0.025;

    shardsRef.current.forEach((mesh, i) => {
      if (!mesh) return;

      const shard = shards[i];
      if (!shard) return;

      mesh.position.lerpVectors(shard.position, shard.target, morph);

      const outward = shard.normal.clone().multiplyScalar(explode * (1 - morph) * 0.8);
      mesh.position.add(outward);

      mesh.position.x += Math.sin(t * 0.8 + i) * (0.08 * (1 - morph));
      mesh.position.y += Math.cos(t * 0.9 + i * 1.7) * (0.08 * (1 - morph));
      mesh.position.z += Math.sin(t * 0.5 + i * 0.9) * (0.05 * (1 - morph));

      const rotStrength = 1 - morph * 0.88;
      mesh.rotation.x =
        shard.rotation.x +
        t * (0.55 + i * 0.008) * rotStrength +
        pulseRef.current * 1.6 * (1 - morph);

      mesh.rotation.y =
        shard.rotation.y +
        t * (0.42 + i * 0.006) * rotStrength -
        pulseRef.current * 1.1 * (1 - morph);

      mesh.rotation.z = shard.rotation.z + t * 0.18 * rotStrength;

      const scaleBase = THREE.MathUtils.lerp(shard.scale, shard.targetScale, morph);
      const scalePulse = 1 + pulseRef.current * 0.14 * (1 - morph) + Math.sin(t * 3 + i) * 0.01;
      mesh.scale.setScalar(scaleBase * scalePulse);
    });

    if (coreRef.current) {
      coreRef.current.scale.setScalar(coreBreath * THREE.MathUtils.lerp(1.05, 0.18, morph));
    }

    if (haloRef.current) {
      haloRef.current.scale.setScalar(
        THREE.MathUtils.lerp(1.15, 0.65, morph) + pulseRef.current * 0.15 + Math.sin(t * 0.9) * 0.02
      );
    }
  });

  return (
    <Float speed={1.35} rotationIntensity={0.15} floatIntensity={0.28}>
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
            <meshStandardMaterial
              color={shard.color}
              emissive={shard.color}
              emissiveIntensity={0.8}
              metalness={0.75}
              roughness={0.22}
              transparent
              opacity={0.95}
              wireframe={shard.wireframe}
            />
          </mesh>
        ))}

        <mesh ref={coreRef} name="core-glow">
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

        <mesh ref={haloRef} name="halo-glow">
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshBasicMaterial color="#2dd4a8" transparent opacity={0.075} />
        </mesh>

        <Sparkles count={26} scale={4.2} size={2.1} speed={0.25} noise={0.8} />
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
            <Bloom intensity={0.9} luminanceThreshold={0.1} luminanceSmoothing={0.88} mipmapBlur />
            <Noise opacity={0.04} />
            <Vignette eskil={false} offset={0.18} darkness={0.75} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}