import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface CubeData {
  label: string;
  color: string;
  position: [number, number, number];
}

const techStacks: CubeData[] = [
  { label: "React", color: "hsl(175, 85%, 55%)", position: [-2.8, 1.6, 0] },
  { label: "Node", color: "hsl(175, 85%, 45%)", position: [2.6, 1.8, -0.5] },
  { label: "TS", color: "hsl(220, 70%, 55%)", position: [-1.2, -1.4, 0.3] },
  { label: "Sol", color: "hsl(280, 70%, 65%)", position: [1.4, -1.6, -0.2] },
  { label: "Py", color: "hsl(35, 95%, 55%)", position: [3.4, -0.2, 0.4] },
  { label: "TF", color: "hsl(35, 95%, 45%)", position: [-3.2, -0.3, -0.3] },
  { label: "Rust", color: "hsl(15, 80%, 55%)", position: [0.2, 2.2, 0.2] },
  { label: "AWS", color: "hsl(30, 90%, 50%)", position: [-0.4, -2.4, -0.4] },
];

function InteractiveCube({ label, color, position }: CubeData) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const basePos = useMemo(() => new THREE.Vector3(...position), [position]);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const parsedColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ pointer, clock }) => {
    if (!meshRef.current) return;
    mouse.current.lerp(pointer, 0.05);

    const t = clock.getElapsedTime();
    // Floating motion
    const floatY = Math.sin(t * 0.8 + basePos.x) * 0.15;
    const floatX = Math.cos(t * 0.6 + basePos.y) * 0.1;

    // Cursor repulsion / attraction
    const cursorWorld = new THREE.Vector2(
      mouse.current.x * (viewport.width / 2),
      mouse.current.y * (viewport.height / 2)
    );
    const dx = basePos.x + floatX - cursorWorld.x;
    const dy = basePos.y + floatY - cursorWorld.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const influence = Math.max(0, 1 - dist / 3);
    const push = hovered ? -0.4 : 0.3;

    meshRef.current.position.x = basePos.x + floatX + dx * influence * push * 0.3;
    meshRef.current.position.y = basePos.y + floatY + dy * influence * push * 0.3;
    meshRef.current.position.z = basePos.z + influence * 0.5;

    // Rotation
    meshRef.current.rotation.x += (hovered ? 0.03 : 0.005);
    meshRef.current.rotation.y += (hovered ? 0.04 : 0.008);

    // Scale
    const targetScale = hovered ? 1.3 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox args={[1, 1, 1]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color={parsedColor}
          transparent
          opacity={hovered ? 0.95 : 0.7}
          roughness={0.3}
          metalness={0.4}
          emissive={parsedColor}
          emissiveIntensity={hovered ? 0.6 : 0.15}
        />
      </RoundedBox>
      {/* Label on front face */}
      <Text
        position={[0, 0, 0.52]}
        fontSize={0.3}
        fontWeight={700}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="hsl(175, 85%, 70%)" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="hsl(280, 70%, 70%)" />

      {techStacks.map((cube) => (
        <InteractiveCube key={cube.label} {...cube} />
      ))}
    </>
  );
}

const TechCubes = () => {
  return (
    <div className="w-full h-full" style={{ cursor: "grab" }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default TechCubes;
