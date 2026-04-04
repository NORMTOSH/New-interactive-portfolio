// src/components/Scroll3DObject.tsx
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
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

type ProgressState = {
  scroll: number;
  target: number;
  decon: number;
  sway: number;
  projects: number;
  contact: number;
};

const SOLID_COLOR = "#f7ffff";
const WIRE_COLOR = "#ffffff";
const OUTLINE_COLOR = "#b8ffff";
const EMISSIVE_COLOR = "#8cf7ff";

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
  canvas.height = 1020;

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
      const r = image[idx];
      const g = image[idx + 1];
      const b = image[idx + 2];
      const brightness = (r + g + b) / 3;

      if (brightness > 20) {
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
    const jitter = 0.03 + seededRandom(i + 91) * 1.08;

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

function buildBracketTargets(count: number) {
  const points: THREE.Vector3[] = [];
  const center = new THREE.Vector3(0, 0.1, 0.15);

  const leftCount = Math.floor(count * 0.44);
  const rightCount = Math.floor(count * 0.44);
  const bridgeCount = count - leftCount - rightCount;

  const cornerY = center.y;
  const topY = 1.15;
  const bottomY = -0.95;

  const leftCorner = new THREE.Vector3(center.x - 1.55, cornerY, center.z + 0.05);
  const rightCorner = new THREE.Vector3(center.x + 1.55, cornerY, center.z + 0.05);

  for (let i = 0; i < leftCount; i += 1) {
    const half = i < leftCount / 2 ? 0 : 1;
    const localIndex =
      half === 0
        ? i / Math.max(1, leftCount / 2 - 1)
        : (i - leftCount / 2) / Math.max(1, leftCount / 2 - 1);

    const start =
      half === 0
        ? new THREE.Vector3(center.x - 0.15, topY, center.z + 0.18)
        : new THREE.Vector3(center.x - 0.15, bottomY, center.z + 0.18);

    const p = start.clone().lerp(leftCorner, localIndex);

    p.x += (seededRandom(i + 12) - 0.5) * 0.035;
    p.y += (seededRandom(i + 18) - 0.5) * 0.035;
    p.z += (seededRandom(i + 24) - 0.5) * 0.04;

    points.push(p);
  }

  for (let i = 0; i < rightCount; i += 1) {
    const half = i < rightCount / 2 ? 0 : 1;
    const localIndex =
      half === 0
        ? i / Math.max(1, rightCount / 2 - 1)
        : (i - rightCount / 2) / Math.max(1, rightCount / 2 - 1);

    const start =
      half === 0
        ? new THREE.Vector3(center.x + 0.15, topY, center.z + 0.18)
        : new THREE.Vector3(center.x + 0.15, bottomY, center.z + 0.18);

    const p = start.clone().lerp(rightCorner, localIndex);

    p.x += (seededRandom(i + 32) - 0.5) * 0.035;
    p.y += (seededRandom(i + 38) - 0.5) * 0.035;
    p.z += (seededRandom(i + 44) - 0.5) * 0.04;

    points.push(p);
  }

  for (let i = 0; i < bridgeCount; i += 1) {
    const u = i / Math.max(1, bridgeCount - 1);
    const side = i % 2 === 0 ? -1 : 1;

    points.push(
      new THREE.Vector3(
        center.x + side * (0.35 + u * 1.55),
        center.y + (seededRandom(i + 10) - 0.5) * 0.22,
        center.z + (seededRandom(i + 20) - 0.5) * 0.16
      )
    );
  }

  while (points.length < count) {
    const i = points.length;
    points.push(
      new THREE.Vector3(
        center.x + (seededRandom(i + 10) - 0.5) * 0.3,
        center.y + (seededRandom(i + 20) - 0.5) * 0.3,
        center.z + (seededRandom(i + 30) - 0.5) * 0.18
      )
    );
  }

  return shuffleWithSeed(points, 41);
}

function buildShards(targets: THREE.Vector3[], count: number): Shard[] {
  const shards: Shard[] = [];

  for (let i = 0; i < count; i += 1) {
    const u = i / count;
    const theta = u * Math.PI * 2 * 1.618;
    const phi = Math.acos(1 - 2 * (u + 0.5 / count));

    const radius = 1.2 + seededRandom(i + 1) * 0.8;
    const position = new THREE.Vector3().setFromSphericalCoords(radius, phi, theta);
    const normal = position.clone().normalize();
    const target = targets[i].clone();
    const wireframe = i % 7 === 0;

    shards.push({
      position,
      target,
      normal,
      rotation: new THREE.Euler(
        seededRandom(i + 10) * Math.PI,
        seededRandom(i + 20) * Math.PI,
        seededRandom(i + 30) * Math.PI
      ),
      scale: 0.2 + seededRandom(i + 40) * 0.74,
      targetScale: 0.06 + seededRandom(i + 50) * 0.15,
      color: wireframe ? WIRE_COLOR : SOLID_COLOR,
      wireframe,
    });
  }

  return shards;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
}

function useScrollProgress() {
  const progressRef = useRef<ProgressState>({
    scroll: 0,
    target: 0,
    decon: 0,
    sway: 0,
    projects: 0,
    contact: 0,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 3.5,
        onUpdate: (self) => {
          progressRef.current.target = self.progress;
        },
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "20% top",
        end: "80% top",
        scrub: 3.5,
        onUpdate: (self) => {
          progressRef.current.decon = self.progress;
        },
      });

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 3.5,
        onUpdate: (self) => {
          progressRef.current.sway = self.progress;
        },
      });

      const projectsEl = document.getElementById("projects");
      if (projectsEl) {
        ScrollTrigger.create({
          trigger: projectsEl,
          start: "top 72%",
          end: "bottom 32%",
          scrub: 1.2,
          onUpdate: (self) => {
            progressRef.current.projects = self.progress;
          },
        });
      }

      const contactEl = document.getElementById("contact");
      if (contactEl) {
        ScrollTrigger.create({
          trigger: contactEl,
          start: "top 72%",
          end: "bottom 32%",
          scrub: 1.2,
          onUpdate: (self) => {
            progressRef.current.contact = self.progress;
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return progressRef;
}

function DeconstructingObject() {
  const reducedMotion = useReducedMotion();
  const shardCount = reducedMotion ? 96 : 144;

  const groupRef = useRef<THREE.Group>(null);
  const solidMeshRef = useRef<THREE.InstancedMesh>(null);
  const solidOutlineMeshRef = useRef<THREE.InstancedMesh>(null);
  const wireMeshRef = useRef<THREE.InstancedMesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);
  const transitionPulseRef = useRef(0);
  const progressRef = useScrollProgress();

  const textTargets = useMemo(() => buildTextTargets("NORTHMAN", shardCount), [shardCount]);
  const bracketTargets = useMemo(() => buildBracketTargets(shardCount), [shardCount]);
  const shards = useMemo(() => buildShards(textTargets, shardCount), [textTargets, shardCount]);

  const solidIndices = useMemo(
    () => shards.map((s, i) => (!s.wireframe ? i : -1)).filter((i) => i >= 0),
    [shards]
  );

  const wireIndices = useMemo(
    () => shards.map((s, i) => (s.wireframe ? i : -1)).filter((i) => i >= 0),
    [shards]
  );

  const solidMap = useMemo(() => {
    const map = new Map<number, number>();
    solidIndices.forEach((sourceIndex, instanceIndex) => {
      map.set(sourceIndex, instanceIndex);
    });
    return map;
  }, [solidIndices]);

  const wireMap = useMemo(() => {
    const map = new Map<number, number>();
    wireIndices.forEach((sourceIndex, instanceIndex) => {
      map.set(sourceIndex, instanceIndex);
    });
    return map;
  }, [wireIndices]);

  const tmp = useMemo(() => {
    const object = new THREE.Object3D();
    return {
      object,
      position: new THREE.Vector3(),
      target: new THREE.Vector3(),
      helix: new THREE.Vector3(),
      noise: new THREE.Vector3(),
      euler: new THREE.Euler(),
      color: new THREE.Color(),
    };
  }, []);

  useEffect(() => {
    const solid = solidMeshRef.current;
    const wire = wireMeshRef.current;
    const outline = solidOutlineMeshRef.current;

    if (solid) {
      solidIndices.forEach((sourceIndex, instanceIndex) => {
        solid.setColorAt(instanceIndex, new THREE.Color(shards[sourceIndex].color));
      });
      if (solid.instanceColor) solid.instanceColor.needsUpdate = true;
    }

    if (wire) {
      wireIndices.forEach((sourceIndex, instanceIndex) => {
        wire.setColorAt(instanceIndex, new THREE.Color(shards[sourceIndex].color));
      });
      if (wire.instanceColor) wire.instanceColor.needsUpdate = true;
    }

    if (outline) {
      solidIndices.forEach((sourceIndex, instanceIndex) => {
        outline.setColorAt(instanceIndex, new THREE.Color(OUTLINE_COLOR));
      });
      if (outline.instanceColor) outline.instanceColor.needsUpdate = true;
    }
  }, [shards, solidIndices, wireIndices]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const progress = progressRef.current;
    progress.scroll = THREE.MathUtils.damp(progress.scroll, progress.target, 1.4, delta);

    const t = state.clock.elapsedTime;
    const scroll = progress.scroll;
    const decon = progress.decon;
    const sway = progress.sway;

    const morph = THREE.MathUtils.smoothstep(scroll, 0.32, 0.98);
    const intro = 1 - morph;
    const easeDecon = THREE.MathUtils.smoothstep(decon, 0.1, 0.95);
    const projectBlend = THREE.MathUtils.smoothstep(progress.projects, 0.08, 0.92);
    const contactBlend = THREE.MathUtils.smoothstep(progress.contact, 0.08, 0.95);
    const bracketBlend = THREE.MathUtils.clamp(projectBlend * 0.35 + contactBlend, 0, 1);

    const formationPulse = THREE.MathUtils.smoothstep(bracketBlend, 0.25, 0.9);
    transitionPulseRef.current = THREE.MathUtils.damp(transitionPulseRef.current, formationPulse, 2.1, delta);
    pulseRef.current = THREE.MathUtils.damp(pulseRef.current, easeDecon, 1.1, delta);

    const bracketPull = bracketBlend * 0.45;

    const targetX =
      THREE.MathUtils.lerp(2.35, 0.0, scroll) -
      bracketPull +
      Math.sin(scroll * Math.PI * 2.2 + t * 0.08) * (0.14 * intro);

    const targetY = THREE.MathUtils.lerp(0.7, 0.14, scroll);
    const targetZ =
      THREE.MathUtils.lerp(-0.25, 0.42, scroll) +
      transitionPulseRef.current * 0.2 +
      Math.sin(t * 0.12 + sway * Math.PI * 2) * (0.04 * intro);

    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 2.2, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 2.2, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 2.2, delta);

    const targetRotY = scroll * 0.16 + Math.sin(t * 0.08) * 0.018 * intro;
    const targetRotX = Math.sin(t * 0.06) * 0.022 * intro;
    const targetRotZ = Math.cos(t * 0.05) * 0.01 * intro;

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 1.9, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotX, 1.9, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetRotZ, 1.9, delta);

    const heroScale = 1.06 + Math.pow(scroll, 1.5) * 0.72 + transitionPulseRef.current * 0.04;
    group.scale.setScalar(THREE.MathUtils.damp(group.scale.x, heroScale, 2.0, delta));

    const cameraTargetZ = THREE.MathUtils.lerp(7.2, 4.25, scroll) - transitionPulseRef.current * 0.12;
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraTargetZ, 1.6, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(scroll * Math.PI) * 0.06, 1.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.02 + (1 - intro) * 0.03, 1.6, delta);
    camera.fov = THREE.MathUtils.damp(camera.fov, THREE.MathUtils.lerp(48, 40, scroll), 1.8, delta);
    camera.updateProjectionMatrix();

    const solid = solidMeshRef.current;
    const outline = solidOutlineMeshRef.current;
    const wire = wireMeshRef.current;

    const solidMaterial = solid?.material as THREE.MeshPhysicalMaterial | undefined;
    const outlineMaterial = outline?.material as THREE.MeshBasicMaterial | undefined;
    const wireMaterial = wire?.material as THREE.MeshBasicMaterial | undefined;

    if (solidMaterial) {
      solidMaterial.color = new THREE.Color(SOLID_COLOR);
      solidMaterial.emissive = new THREE.Color(EMISSIVE_COLOR);
      solidMaterial.emissiveIntensity = 0.55 + bracketBlend * 0.25 + transitionPulseRef.current * 0.12;
      solidMaterial.opacity = 0.94;
      solidMaterial.roughness = 0.03;
      solidMaterial.metalness = 0.02;
      solidMaterial.transmission = 0.88;
      solidMaterial.thickness = 0.6;
      solidMaterial.ior = 1.45;
      solidMaterial.clearcoat = 1;
      solidMaterial.clearcoatRoughness = 0.03;
      solidMaterial.attenuationColor = new THREE.Color("#9aefff");
      solidMaterial.attenuationDistance = 2.8;
      solidMaterial.envMapIntensity = 1.15;
      solidMaterial.flatShading = true;
      solidMaterial.transparent = true;
      solidMaterial.toneMapped = false;
      solidMaterial.map = null;
      solidMaterial.roughnessMap = null;
      solidMaterial.bumpMap = null;
      solidMaterial.emissiveMap = null;
      solidMaterial.needsUpdate = true;
    }

    if (outlineMaterial) {
      outlineMaterial.color = new THREE.Color(OUTLINE_COLOR);
      outlineMaterial.transparent = true;
      outlineMaterial.opacity = 0.38 + bracketBlend * 0.08;
      outlineMaterial.toneMapped = false;
      outlineMaterial.depthWrite = false;
      outlineMaterial.needsUpdate = true;
    }

    if (wireMaterial) {
      wireMaterial.color = new THREE.Color(WIRE_COLOR);
      wireMaterial.transparent = true;
      wireMaterial.opacity = 1;
      wireMaterial.toneMapped = false;
      wireMaterial.depthWrite = false;
      wireMaterial.needsUpdate = true;
    }

    const coreBreath = 1 + Math.sin(t * 1.2) * 0.014;

    const updateInstance = (
      sourceIndex: number,
      instanceIndex: number,
      mesh: THREE.InstancedMesh | null,
      scaleMultiplier = 1
    ) => {
      if (!mesh) return;

      const shard = shards[sourceIndex];
      if (!shard) return;

      const position = tmp.position;
      const target = tmp.target;
      const helix = tmp.helix;
      const noise = tmp.noise;
      const euler = tmp.euler;
      const object = tmp.object;

      position.copy(shard.position).lerp(shard.target, morph);
      target.copy(bracketTargets[sourceIndex]);
      position.lerp(target, bracketBlend);

      const shardPhase = t * 0.08 + sourceIndex * 0.16;
      const helixAngle = shardPhase * 2.4;
      const helixRadius = 1.25 * intro * (1 - bracketBlend * 0.9);
      const helixCenterY = 0.95 - t * 0.0001 * intro * (1 - bracketBlend * 0.9);
      const helixY = helixCenterY + Math.sin(shardPhase * 1.2) * 0.12 * intro * (1 - bracketBlend * 0.85);

      helix.set(Math.cos(helixAngle) * helixRadius, helixY, Math.sin(helixAngle) * helixRadius);
      position.addScaledVector(helix, intro * 0.8 * (1 - bracketBlend));

      const motionFactor = intro * (1 - bracketBlend * 0.95);
      noise.set(
        Math.sin(t * 0.28 + sourceIndex * 0.7) * (0.02 * motionFactor),
        Math.cos(t * 0.3 + sourceIndex * 1.4) * (0.02 * motionFactor),
        Math.sin(t * 0.22 + sourceIndex * 0.9) * (0.014 * motionFactor)
      );

      position.addScaledVector(shard.normal, (0.08 + intro * 1.05) * motionFactor * 0.55);
      position.add(noise);

      const rotStrength = intro * (1 - bracketBlend * 0.85);
      const shardSpin = THREE.MathUtils.lerp(0.04, 0.008, morph);

      const targetRotX =
        shard.rotation.x +
        Math.sin(t * 0.12 + sourceIndex * 0.08) * shardSpin * rotStrength +
        pulseRef.current * 0.12 * rotStrength;

      const targetRotY =
        shard.rotation.y +
        Math.cos(t * 0.1 + sourceIndex * 0.06) * shardSpin * 0.85 * rotStrength -
        pulseRef.current * 0.08 * rotStrength;

      const targetRotZ =
        shard.rotation.z + Math.sin(t * 0.08 + sourceIndex * 0.04) * shardSpin * 0.5 * rotStrength;

      euler.set(targetRotX, targetRotY, targetRotZ);
      object.position.copy(position);
      object.quaternion.setFromEuler(euler);

      const scaleBase = THREE.MathUtils.lerp(shard.scale, shard.targetScale, morph);
      const scaleTarget =
        scaleBase *
        (1 + pulseRef.current * 0.05 * motionFactor + Math.sin(t * 1.8 + sourceIndex) * 0.0025) *
        scaleMultiplier;

      object.scale.setScalar(scaleTarget);
      object.updateMatrix();
      mesh.setMatrixAt(instanceIndex, object.matrix);

      const dist = position.length();
      const centerLight = 1 - THREE.MathUtils.clamp(dist / 3.2, 0, 1);
      const glassShade = 0.34 + centerLight * 0.58 + bracketBlend * 0.08;

      if (mesh === solid) {
        tmp.color.set(SOLID_COLOR);
        tmp.color.lerp(new THREE.Color("#89f7ff"), centerLight * 0.28);
        tmp.color.multiplyScalar(glassShade);
        mesh.setColorAt(instanceIndex, tmp.color);
      } else if (mesh === wire) {
        tmp.color.set(WIRE_COLOR);
        tmp.color.lerp(new THREE.Color("#dffcff"), 0.35 + centerLight * 0.2);
        tmp.color.multiplyScalar(0.92 + centerLight * 0.18);
        mesh.setColorAt(instanceIndex, tmp.color);
      } else {
        tmp.color.set(OUTLINE_COLOR);
        tmp.color.multiplyScalar(0.82 + centerLight * 0.12);
        mesh.setColorAt(instanceIndex, tmp.color);
      }
    };

    for (let i = 0; i < shards.length; i += 1) {
      const wireframe = shards[i].wireframe;

      if (wireframe) {
        const instanceIndex = wireMap.get(i);
        if (instanceIndex !== undefined) updateInstance(i, instanceIndex, wire, 1.05);
      } else {
        const instanceIndex = solidMap.get(i);
        if (instanceIndex !== undefined) {
          updateInstance(i, instanceIndex, solid, 1);
          if (outline) updateInstance(i, instanceIndex, outline, 1.07);
        }
      }
    }

    if (solid) {
      solid.instanceMatrix.needsUpdate = true;
      if (solid.instanceColor) solid.instanceColor.needsUpdate = true;
    }

    if (outline) {
      outline.instanceMatrix.needsUpdate = true;
      if (outline.instanceColor) outline.instanceColor.needsUpdate = true;
    }

    if (wire) {
      wire.instanceMatrix.needsUpdate = true;
      if (wire.instanceColor) wire.instanceColor.needsUpdate = true;
    }

    if (coreRef.current) {
      const targetScale = coreBreath * THREE.MathUtils.lerp(1.18, 0.32, morph);
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, targetScale, 3.0, delta));

      const coreMaterial = coreRef.current.material as THREE.MeshPhysicalMaterial | undefined;
      if (coreMaterial) {
        coreMaterial.emissive = new THREE.Color("#9fffff");
        coreMaterial.emissiveIntensity = 3.6 + transitionPulseRef.current * 1.5;
        coreMaterial.opacity = THREE.MathUtils.lerp(0.32, 0.55, transitionPulseRef.current);
        coreMaterial.roughness = 0.05;
        coreMaterial.metalness = 0.05;
        coreMaterial.transmission = 0.9;
        coreMaterial.thickness = 1.15;
        coreMaterial.ior = 1.45;
        coreMaterial.clearcoat = 1;
      }
    }

    if (haloRef.current) {
      const targetScale =
        THREE.MathUtils.lerp(1.15, 0.72, morph) +
        pulseRef.current * 0.07 +
        Math.sin(t * 0.6) * 0.01 +
        transitionPulseRef.current * 0.08;

      haloRef.current.scale.setScalar(THREE.MathUtils.damp(haloRef.current.scale.x, targetScale, 2.6, delta));

      const haloMaterial = haloRef.current.material as THREE.MeshBasicMaterial | undefined;
      if (haloMaterial) {
        haloMaterial.opacity = 0.05 + transitionPulseRef.current * 0.045;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={solidMeshRef} args={[undefined as never, undefined as never, solidIndices.length]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshPhysicalMaterial
          color={SOLID_COLOR}
          emissive={EMISSIVE_COLOR}
          emissiveIntensity={0.55}
          metalness={0.02}
          roughness={0.03}
          transmission={0.88}
          thickness={0.6}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.03}
          attenuationColor="#9aefff"
          attenuationDistance={2.8}
          transparent
          opacity={0.94}
          flatShading
          vertexColors
          toneMapped={false}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </instancedMesh>

      <instancedMesh ref={solidOutlineMeshRef} args={[undefined as never, undefined as never, solidIndices.length]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial
          color={OUTLINE_COLOR}
          wireframe
          transparent
          opacity={0.38}
          toneMapped={false}
          depthWrite={false}
        />
      </instancedMesh>

      <instancedMesh ref={wireMeshRef} args={[undefined as never, undefined as never, wireIndices.length]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial
          color={WIRE_COLOR}
          wireframe
          transparent
          opacity={1}
          toneMapped={false}
          depthWrite={false}
        />
      </instancedMesh>

      <mesh ref={coreRef} name="core-glow">
        <sphereGeometry args={[0.52, 24, 24]} />
        <meshPhysicalMaterial
          color="#efffff"
          emissive="#9effff"
          emissiveIntensity={3.6}
          transparent
          opacity={0.34}
          metalness={0.05}
          roughness={0.05}
          transmission={0.9}
          thickness={1.15}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.04}
          attenuationColor="#9aefff"
          attenuationDistance={2.8}
        />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={1.45} color="#ffffff" distance={6} decay={2} />
      <pointLight position={[0, 0, 0]} intensity={1.05} color="#8cf7ff" distance={6} decay={2} />

      <mesh ref={haloRef} name="halo-glow">
        <sphereGeometry args={[0.95, 18, 18]} />
        <meshBasicMaterial color="#7efcff" transparent opacity={0.05} wireframe />
      </mesh>
    </group>
  );
}

export default function Scroll3DObject() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 48 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.12;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.42} />
          <directionalLight position={[4, 6, 5]} intensity={1.9} color="#ffffff" />
          <directionalLight position={[-5, -2, 4]} intensity={0.55} color="#dffcff" />
          <pointLight position={[-4, -2, 3]} intensity={0.8} color="#7efcff" />
          <pointLight position={[2, 2, 2]} intensity={0.75} color="#ffffff" />
          <pointLight position={[0, 0, 6]} intensity={0.55} color="#ffffff" />

          <DeconstructingObject />

          <EffectComposer multisampling={0}>
            <Bloom intensity={0.78} luminanceThreshold={0.12} luminanceSmoothing={0.9} mipmapBlur />
            <Vignette eskil={false} offset={0.12} darkness={0.78} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}