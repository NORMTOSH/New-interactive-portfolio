// src/components/Scroll3DObject.tsx
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

type ProgressState = {
  scroll: number;
  target: number;
  decon: number;
  sway: number;
  projects: number;
  contact: number;
};

const SHARD_COUNT = 220;
const COLORS = ["#2dd4a8", "#f59e0b", "#a855f7", "#60a5fa"];

// Full-stage framing
const STAGE_WIDTH = 9.2;
const STAGE_HEIGHT = 5.2;

// Helix controls
const HELIX_SPEED = 0.08;
const HELIX_FALL_SPEED = 0.01;
const HELIX_RADIUS = 1.35;
const HELIX_SPACING = 0.16;

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
        const nx = (x / canvas.width - 0.5) * 9.0;
        const ny = (0.5 - y / canvas.height) * 3.2;
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

function buildProjectTargets(count: number) {
  const points: THREE.Vector3[] = [];

  const addRectOutline = (
    cx: number,
    cy: number,
    cz: number,
    w: number,
    h: number,
    n: number,
    jitter = 0.04,
    seed = 1
  ) => {
    for (let i = 0; i < n; i += 1) {
      const t = i / n;
      const side = Math.floor(t * 4);
      const localT = (t * 4) % 1;

      let x = cx;
      let y = cy;

      if (side === 0) {
        x = cx - w / 2 + localT * w;
        y = cy + h / 2;
      } else if (side === 1) {
        x = cx + w / 2;
        y = cy + h / 2 - localT * h;
      } else if (side === 2) {
        x = cx + w / 2 - localT * w;
        y = cy - h / 2;
      } else {
        x = cx - w / 2;
        y = cy - h / 2 + localT * h;
      }

      points.push(
        new THREE.Vector3(
          x + (seededRandom(seed + i * 3) - 0.5) * jitter,
          y + (seededRandom(seed + i * 7) - 0.5) * jitter,
          cz + (seededRandom(seed + i * 11) - 0.5) * jitter * 0.6
        )
      );
    }
  };

  const addGrid = (
    cx: number,
    cy: number,
    cz: number,
    w: number,
    h: number,
    rows: number,
    cols: number,
    seed = 1,
    skip?: (row: number, col: number) => boolean
  ) => {
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (skip?.(row, col)) continue;

        const u = cols === 1 ? 0.5 : col / (cols - 1);
        const v = rows === 1 ? 0.5 : row / (rows - 1);

        points.push(
          new THREE.Vector3(
            cx + (u - 0.5) * w + (seededRandom(seed + row * 13 + col * 5) - 0.5) * 0.05,
            cy + (0.5 - v) * h + (seededRandom(seed + row * 7 + col * 11) - 0.5) * 0.05,
            cz + (seededRandom(seed + row * 17 + col * 19) - 0.5) * 0.06
          )
        );
      }
    }
  };

  const addLine = (
    from: THREE.Vector3,
    to: THREE.Vector3,
    n: number,
    wobble = 0.03,
    seed = 1
  ) => {
    for (let i = 0; i < n; i += 1) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const p = from.clone().lerp(to, t);

      p.x += (seededRandom(seed + i * 3) - 0.5) * wobble;
      p.y += (seededRandom(seed + i * 5) - 0.5) * wobble;
      p.z += (seededRandom(seed + i * 7) - 0.5) * wobble * 0.6;

      points.push(p);
    }
  };

  // Framed board silhouette
  addRectOutline(0.05, 0.12, 0.08, 7.3, 3.65, Math.floor(count * 0.16), 0.05, 101);

  // Main feature card
  addRectOutline(-1.75, 0.35, 0.14, 3.05, 1.95, Math.floor(count * 0.11), 0.04, 203);
  addGrid(-1.75, 0.35, 0.16, 2.65, 1.35, 4, 8, 301, (row, col) => row === 1 && col > 1 && col < 6);

  // Right-side stacked cards
  addRectOutline(2.0, 0.92, 0.2, 2.0, 0.82, Math.floor(count * 0.06), 0.035, 407);
  addRectOutline(2.0, -0.08, 0.18, 2.0, 0.82, Math.floor(count * 0.06), 0.035, 409);
  addRectOutline(2.0, -1.08, 0.16, 2.0, 0.82, Math.floor(count * 0.06), 0.035, 411);

  addGrid(2.0, 0.92, 0.22, 1.7, 0.48, 2, 6, 501);
  addGrid(2.0, -0.08, 0.2, 1.7, 0.48, 2, 6, 503);
  addGrid(2.0, -1.08, 0.18, 1.7, 0.48, 2, 6, 505);

  // Bottom analytics strip
  addRectOutline(0.05, -1.35, 0.12, 6.0, 0.8, Math.floor(count * 0.08), 0.03, 607);

  for (let i = 0; i < 12; i += 1) {
    const x = -2.65 + i * 0.48;
    const barH = 0.2 + seededRandom(700 + i) * 0.5;

    addLine(
      new THREE.Vector3(x, -1.62, 0.14),
      new THREE.Vector3(x, -1.62 + barH, 0.14),
      4,
      0.015,
      701 + i
    );
  }

  // KPI pills and connector nodes
  for (let i = 0; i < 8; i += 1) {
    const x = -2.35 + i * 0.72;
    addRectOutline(x, 1.55, 0.18, 0.52, 0.18, 3, 0.015, 801 + i);
  }

  addLine(
    new THREE.Vector3(-0.2, 0.55, 0.16),
    new THREE.Vector3(1.25, 0.35, 0.2),
    Math.floor(count * 0.04),
    0.02,
    901
  );
  addLine(
    new THREE.Vector3(-0.65, -0.15, 0.14),
    new THREE.Vector3(1.18, -0.12, 0.18),
    Math.floor(count * 0.04),
    0.02,
    903
  );

  while (points.length < count) {
    const i = points.length;
    const zone = i % 5;

    if (zone === 0) {
      points.push(
        new THREE.Vector3(
          -1.55 + (seededRandom(i + 1) - 0.5) * 2.6,
          0.32 + (seededRandom(i + 2) - 0.5) * 1.3,
          0.18 + (seededRandom(i + 3) - 0.5) * 0.08
        )
      );
    } else if (zone === 1) {
      points.push(
        new THREE.Vector3(
          1.75 + (seededRandom(i + 4) - 0.5) * 1.65,
          -0.1 + (seededRandom(i + 5) - 0.5) * 2.1,
          0.18 + (seededRandom(i + 6) - 0.5) * 0.08
        )
      );
    } else if (zone === 2) {
      points.push(
        new THREE.Vector3(
          0.0 + (seededRandom(i + 7) - 0.5) * 2.8,
          -1.35 + (seededRandom(i + 8) - 0.5) * 0.65,
          0.12 + (seededRandom(i + 9) - 0.5) * 0.06
        )
      );
    } else if (zone === 3) {
      points.push(
        new THREE.Vector3(
          -2.3 + (seededRandom(i + 10) - 0.5) * 1.0,
          1.55 + (seededRandom(i + 11) - 0.5) * 0.16,
          0.18 + (seededRandom(i + 12) - 0.5) * 0.04
        )
      );
    } else {
      points.push(
        new THREE.Vector3(
          0.15 + (seededRandom(i + 13) - 0.5) * 1.25,
          0.1 + (seededRandom(i + 14) - 0.5) * 0.95,
          0.16 + (seededRandom(i + 15) - 0.5) * 0.06
        )
      );
    }
  }

  return shuffleWithSeed(points, 23);
}

function buildContactTargets(count: number) {
  const points: THREE.Vector3[] = [];

  const addArc = (
    cx: number,
    cy: number,
    cz: number,
    rx: number,
    ry: number,
    start: number,
    end: number,
    n: number,
    seed = 1
  ) => {
    for (let i = 0; i < n; i += 1) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const a = start + (end - start) * t;

      points.push(
        new THREE.Vector3(
          cx + Math.cos(a) * rx + (seededRandom(seed + i * 3) - 0.5) * 0.03,
          cy + Math.sin(a) * ry + (seededRandom(seed + i * 5) - 0.5) * 0.03,
          cz + (seededRandom(seed + i * 7) - 0.5) * 0.05
        )
      );
    }
  };

  const addLine = (
    from: THREE.Vector3,
    to: THREE.Vector3,
    n: number,
    wobble = 0.02,
    seed = 1
  ) => {
    for (let i = 0; i < n; i += 1) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const p = from.clone().lerp(to, t);

      p.x += (seededRandom(seed + i * 3) - 0.5) * wobble;
      p.y += (seededRandom(seed + i * 5) - 0.5) * wobble;
      p.z += (seededRandom(seed + i * 7) - 0.5) * wobble * 0.6;

      points.push(p);
    }
  };

  const addEnvelopeOutline = (
    cx: number,
    cy: number,
    cz: number,
    w: number,
    h: number,
    n: number
  ) => {
    const tl = new THREE.Vector3(cx - w / 2, cy + h / 2, cz);
    const tr = new THREE.Vector3(cx + w / 2, cy + h / 2, cz);
    const bl = new THREE.Vector3(cx - w / 2, cy - h / 2, cz);
    const br = new THREE.Vector3(cx + w / 2, cy - h / 2, cz);
    const mid = new THREE.Vector3(cx, cy, cz);

    const side = Math.max(4, Math.floor(n / 4));
    addLine(tl, tr, side, 0.025, 1001);
    addLine(tr, br, side, 0.025, 1002);
    addLine(br, bl, side, 0.025, 1003);
    addLine(bl, tl, side, 0.025, 1004);

    addLine(tl, mid, Math.floor(n * 0.15), 0.02, 1005);
    addLine(tr, mid, Math.floor(n * 0.15), 0.02, 1006);
    addLine(bl, mid, Math.floor(n * 0.12), 0.02, 1007);
    addLine(br, mid, Math.floor(n * 0.12), 0.02, 1008);
  };

  // Main envelope body
  addEnvelopeOutline(0.05, 0.02, 0.12, 4.75, 2.75, Math.floor(count * 0.34));

  // Inner flap lines
  addLine(
    new THREE.Vector3(-2.35, 1.42, 0.15),
    new THREE.Vector3(0.05, -0.08, 0.22),
    Math.floor(count * 0.08),
    0.018,
    1101
  );
  addLine(
    new THREE.Vector3(2.45, 1.42, 0.15),
    new THREE.Vector3(0.05, -0.08, 0.22),
    Math.floor(count * 0.08),
    0.018,
    1102
  );

  // Beacon spine
  addLine(
    new THREE.Vector3(0.05, 1.78, 0.2),
    new THREE.Vector3(0.05, -1.2, 0.2),
    Math.floor(count * 0.14),
    0.02,
    1201
  );

  // Signal rings
  addArc(0.05, 1.55, 0.22, 0.52, 0.22, Math.PI * 0.08, Math.PI * 1.92, Math.floor(count * 0.06), 1301);
  addArc(0.05, 1.55, 0.22, 0.82, 0.34, Math.PI * 0.12, Math.PI * 1.88, Math.floor(count * 0.06), 1302);

  // Floating message stream
  addLine(
    new THREE.Vector3(0.7, 0.1, 0.18),
    new THREE.Vector3(2.45, 1.1, 0.34),
    Math.floor(count * 0.08),
    0.03,
    1401
  );
  addLine(
    new THREE.Vector3(0.6, -0.3, 0.18),
    new THREE.Vector3(2.3, -1.15, 0.32),
    Math.floor(count * 0.07),
    0.03,
    1402
  );

  // Beacon particles above the envelope
  for (let i = 0; i < 18; i += 1) {
    const u = i / 18;
    const a = u * Math.PI * 2;
    const r = 0.22 + (i % 4) * 0.07;

    points.push(
      new THREE.Vector3(
        0.05 + Math.cos(a) * r,
        1.8 + Math.sin(a) * r * 0.7,
        0.22 + (seededRandom(1501 + i) - 0.5) * 0.03
      )
    );
  }

  while (points.length < count) {
    const i = points.length;
    const mode = i % 4;

    if (mode === 0) {
      points.push(
        new THREE.Vector3(
          0.05 + (seededRandom(i + 1) - 0.5) * 0.55,
          1.4 + (seededRandom(i + 2) - 0.5) * 0.75,
          0.2 + (seededRandom(i + 3) - 0.5) * 0.06
        )
      );
    } else if (mode === 1) {
      points.push(
        new THREE.Vector3(
          -2.0 + (seededRandom(i + 4) - 0.5) * 1.25,
          0.0 + (seededRandom(i + 5) - 0.5) * 2.2,
          0.15 + (seededRandom(i + 6) - 0.5) * 0.05
        )
      );
    } else if (mode === 2) {
      points.push(
        new THREE.Vector3(
          1.4 + (seededRandom(i + 7) - 0.5) * 1.25,
          -0.05 + (seededRandom(i + 8) - 0.5) * 2.0,
          0.18 + (seededRandom(i + 9) - 0.5) * 0.05
        )
      );
    } else {
      points.push(
        new THREE.Vector3(
          0.05 + (seededRandom(i + 10) - 0.5) * 1.0,
          0.1 + (seededRandom(i + 11) - 0.5) * 1.0,
          0.2 + (seededRandom(i + 12) - 0.5) * 0.05
        )
      );
    }
  }

  return shuffleWithSeed(points, 41);
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
      wireframe: true,
    });
  }

  return shards;
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
          start: "top 70%",
          end: "bottom 30%",
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
          start: "top 70%",
          end: "bottom 30%",
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
  const groupRef = useRef<THREE.Group>(null);
  const shardsRef = useRef<(THREE.Mesh | null)[]>([]);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);
  const progressRef = useScrollProgress();

  const textTargets = useMemo(() => buildTextTargets("NORTHMAN", SHARD_COUNT), []);
  const projectTargets = useMemo(() => buildProjectTargets(SHARD_COUNT), []);
  const contactTargets = useMemo(() => buildContactTargets(SHARD_COUNT), []);
  const shards = useMemo(() => buildShards(textTargets), [textTargets]);

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

    pulseRef.current = THREE.MathUtils.damp(pulseRef.current, easeDecon, 1.1, delta);

    const targetX =
      THREE.MathUtils.lerp(2.45, 0.0, scroll) +
      Math.sin(scroll * Math.PI * 2.2 + t * 0.08) * (0.18 * intro);
    const targetY = THREE.MathUtils.lerp(0.72, 0.16, scroll);
    const targetZ = Math.sin(t * 0.12 + sway * Math.PI * 2) * (0.08 * intro);

    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 2.2, delta);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 2.2, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 2.2, delta);

    const targetRotY = scroll * 0.18 + Math.sin(t * 0.08) * 0.02 * intro;
    const targetRotX = Math.sin(t * 0.06) * 0.025 * intro;
    const targetRotZ = Math.cos(t * 0.05) * 0.012 * intro;

    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetRotY, 1.9, delta);
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetRotX, 1.9, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetRotZ, 1.9, delta);

    const coreBreath = 1 + Math.sin(t * 1.2) * 0.016;

    shardsRef.current.forEach((mesh, i) => {
      if (!mesh) return;

      const shard = shards[i];
      if (!shard) return;

      const textTarget = shard.position.clone().lerp(shard.target, morph);

      const shardPhase = t * HELIX_SPEED + i * HELIX_SPACING;
      const helixAngle = shardPhase * 2.4;
      const helixRadius = HELIX_RADIUS * intro;
      const helixCenterY = 0.95 - t * HELIX_FALL_SPEED * intro;
      const helixY = helixCenterY + Math.sin(shardPhase * 1.2) * 0.12 * intro;

      const helixPosition = new THREE.Vector3(
        Math.cos(helixAngle) * helixRadius,
        helixY,
        Math.sin(helixAngle) * helixRadius
      );

      let targetPosition = textTarget.clone().addScaledVector(helixPosition, intro * 0.85);

      targetPosition.lerp(projectTargets[i], projectBlend);
      targetPosition.lerp(contactTargets[i], contactBlend);

      const outward = shard.normal.clone().multiplyScalar((0.08 + intro * 1.25) * intro * 0.7);
      const noise = new THREE.Vector3(
        Math.sin(t * 0.28 + i * 0.7) * (0.025 * intro),
        Math.cos(t * 0.3 + i * 1.4) * (0.025 * intro),
        Math.sin(t * 0.22 + i * 0.9) * (0.016 * intro)
      );

      targetPosition.add(outward).add(noise);

      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, targetPosition.x, 3.8, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, targetPosition.y, 3.8, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, targetPosition.z, 3.8, delta);

      const rotStrength = intro;
      const shardSpin = THREE.MathUtils.lerp(0.04, 0.008, morph);

      const targetRotX =
        shard.rotation.x +
        Math.sin(t * 0.12 + i * 0.08) * shardSpin * rotStrength +
        pulseRef.current * 0.14 * rotStrength;

      const targetRotY =
        shard.rotation.y +
        Math.cos(t * 0.1 + i * 0.06) * shardSpin * 0.85 * rotStrength -
        pulseRef.current * 0.1 * rotStrength;

      const targetRotZ = shard.rotation.z + Math.sin(t * 0.08 + i * 0.04) * shardSpin * 0.5 * rotStrength;

      mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, targetRotX, 2.4, delta);
      mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, targetRotY, 2.4, delta);
      mesh.rotation.z = THREE.MathUtils.damp(mesh.rotation.z, targetRotZ, 2.4, delta);

      const scaleBase = THREE.MathUtils.lerp(shard.scale, shard.targetScale, morph);
      const scaleTarget = scaleBase * (1 + pulseRef.current * 0.06 * intro + Math.sin(t * 1.8 + i) * 0.003);
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, scaleTarget, 3.2, delta));
    });

    if (coreRef.current) {
      const targetScale = coreBreath * THREE.MathUtils.lerp(1.05, 0.18, morph);
      coreRef.current.scale.setScalar(THREE.MathUtils.damp(coreRef.current.scale.x, targetScale, 3.0, delta));
    }

    if (haloRef.current) {
      const targetScale =
        THREE.MathUtils.lerp(1.15, 0.65, morph) + pulseRef.current * 0.08 + Math.sin(t * 0.6) * 0.012;

      haloRef.current.scale.setScalar(THREE.MathUtils.damp(haloRef.current.scale.x, targetScale, 2.6, delta));
    }
  });

  return (
    <Float speed={0.18} rotationIntensity={0.04} floatIntensity={0.08}>
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
            <meshBasicMaterial
              color={shard.color}
              transparent
              opacity={0.9}
              wireframe
            />
          </mesh>
        ))}

        <mesh ref={coreRef} name="core-glow">
          <sphereGeometry args={[0.52, 24, 24]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} wireframe />
        </mesh>

        <mesh ref={haloRef} name="halo-glow">
          <sphereGeometry args={[0.95, 24, 24]} />
          <meshBasicMaterial color="#2dd4a8" transparent opacity={0.06} wireframe />
        </mesh>

        <Sparkles count={22} scale={4.2} size={1.3} speed={0.08} noise={0.8} />
      </group>
    </Float>
  );
}

export default function Scroll3DObject() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen overflow-hidden" aria-hidden="true">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 7], fov: 48 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 5]} intensity={1.0} color="#ffffff" />
          <pointLight position={[-4, -2, 3]} intensity={0.55} color="#a855f7" />
          <pointLight position={[2, 2, 2]} intensity={0.5} color="#2dd4a8" />

          <Environment preset="city" />
          <DeconstructingObject />

          <EffectComposer multisampling={0}>
            <Bloom intensity={0.45} luminanceThreshold={0.16} luminanceSmoothing={0.9} mipmapBlur />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.2} darkness={0.7} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}