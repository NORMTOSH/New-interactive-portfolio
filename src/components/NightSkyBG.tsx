// src/components/NightSkyBG.tsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type NightSkyBackgroundProps = {
    className?: string;
    starCount?: number;
    shootingStarCount?: number;
};

type ShootingStarState = {
    group: THREE.Group;
    active: boolean;
    progress: number;
    speed: number;
    delay: number;
    start: THREE.Vector3;
    direction: THREE.Vector2;
    arcStrength: number;
    trail: THREE.Mesh;
    head: THREE.Mesh;
    glow: THREE.Mesh;
    trailMaterial: THREE.ShaderMaterial;
    headMaterial: THREE.MeshBasicMaterial;
    glowMaterial: THREE.MeshBasicMaterial;
};

const NightSkyBackground: React.FC<NightSkyBackgroundProps> = ({
    className = '',
    starCount = 12000,
    shootingStarCount = 6,
}) => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050816, 0.008);

        const camera = new THREE.PerspectiveCamera(
            60,
            mount.clientWidth / mount.clientHeight,
            0.1,
            1000,
        );
        camera.position.z = 18;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const starVertexShader = /* glsl */ `
      attribute float aSize;
      attribute float aPhase;
      attribute float aOpacity;
      attribute vec2 aVelocity;
      attribute float aTwinkleSpeed;

      varying float vOpacity;
      uniform float uTime;

      void main() {
        vOpacity = aOpacity;
        vec3 pos = position;

        pos.x += sin(uTime * aVelocity.x + aPhase) * 0.45;
        pos.y += cos(uTime * aVelocity.y + aPhase * 1.7) * 0.35;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        float twinkleBase = 0.9 + 0.1 * sin(uTime * aTwinkleSpeed + aPhase * 6.2831);
        float twinkle = clamp(twinkleBase, 0.75, 1.05);
        gl_PointSize = aSize * twinkle * (180.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

        const starFragmentShader = /* glsl */ `
      precision highp float;

      varying float vOpacity;
      uniform vec3 uColor;

      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `;

        const starsGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const phases = new Float32Array(starCount);
        const opacities = new Float32Array(starCount);
        const velocities = new Float32Array(starCount * 2);
        const twinkleSpeeds = new Float32Array(starCount);

        for (let i = 0; i < starCount; i += 1) {
            positions[i * 3 + 0] = THREE.MathUtils.randFloat(-260, 260);
            positions[i * 3 + 1] = THREE.MathUtils.randFloat(-140, 140);
            positions[i * 3 + 2] = THREE.MathUtils.randFloat(-220, -20);

            sizes[i] = THREE.MathUtils.randFloat(0.6, 2.0);
            phases[i] = Math.random();
            opacities[i] = THREE.MathUtils.randFloat(0.45, 1.0);
            velocities[i * 2 + 0] = THREE.MathUtils.randFloat(-0.25, 0.25);
            velocities[i * 2 + 1] = THREE.MathUtils.randFloat(-0.2, 0.2);
            twinkleSpeeds[i] = THREE.MathUtils.randFloat(0.6, 1.8);
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        starsGeometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
        starsGeometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));
        starsGeometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 2));
        starsGeometry.setAttribute('aTwinkleSpeed', new THREE.BufferAttribute(twinkleSpeeds, 1));

        const starsMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(0xeaf2ff) },
            },
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        const shootingStars: ShootingStarState[] = [];

        const trailVertexShader = /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

        const trailFragmentShader = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform float uOpacity;

      void main() {
        float along = 1.0 - vUv.x;
        float body = smoothstep(0.0, 0.10, vUv.y) * smoothstep(1.0, 0.10, vUv.y);
        float taper = smoothstep(1.0, 0.0, vUv.x);
        float softness = smoothstep(0.0, 0.65, vUv.x);
        float alpha = along * body * taper * softness * uOpacity;
        vec3 color = mix(vec3(0.95, 0.98, 1.0), vec3(0.78, 0.88, 1.0), vUv.x);
        gl_FragColor = vec4(color, alpha);
      }
    `;

        const createShootingStar = (): ShootingStarState => {
            const group = new THREE.Group();
            group.visible = false;

            const trailGeometry = new THREE.PlaneGeometry(1, 0.12, 1, 1);
            const trailMaterial = new THREE.ShaderMaterial({
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                uniforms: {
                    uOpacity: { value: 0 },
                },
                vertexShader: trailVertexShader,
                fragmentShader: trailFragmentShader,
            });
            const trail = new THREE.Mesh(trailGeometry, trailMaterial);
            trail.position.set(-1.6, 0, 0);
            trail.scale.set(1, 1, 1);
            group.add(trail);

            const glowGeometry = new THREE.SphereGeometry(0.22, 12, 12);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0xaec9ff,
                transparent: true,
                opacity: 0,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            group.add(glow);

            const headGeometry = new THREE.SphereGeometry(0.08, 12, 12);
            const headMaterial = new THREE.MeshBasicMaterial({
                color: 0xf8fbff,
                transparent: true,
                opacity: 0,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
            });
            const head = new THREE.Mesh(headGeometry, headMaterial);
            group.add(head);

            scene.add(group);

            return {
                group,
                active: false,
                progress: 0,
                speed: THREE.MathUtils.randFloat(0.45, 0.85),
                delay: THREE.MathUtils.randFloat(0.1, 1.8),
                start: new THREE.Vector3(),
                direction: new THREE.Vector2(),
                arcStrength: THREE.MathUtils.randFloat(1.0, 2.6),
                trail,
                head,
                glow,
                trailMaterial,
                headMaterial,
                glowMaterial,
            };
        };

        const resetShootingStar = (star: ShootingStarState, delayRandomize = true) => {
            const startX = THREE.MathUtils.randFloat(-60, 10);
            const startY = THREE.MathUtils.randFloat(40, 115);
            const angle = THREE.MathUtils.degToRad(THREE.MathUtils.randFloat(200, 235));
            const distance = THREE.MathUtils.randFloat(30, 58);
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;

            star.start.set(startX, startY, -35);
            star.direction.set(dx, dy);
            star.progress = 0;
            star.active = false;
            star.group.visible = false;
            star.group.position.copy(star.start);
            star.group.rotation.z = Math.atan2(dy, dx);
            star.arcStrength = THREE.MathUtils.randFloat(1.0, 2.6);
            star.trail.scale.set(1, 1, 1);
            star.trail.position.set(-1.6, 0, 0);
            star.trail.rotation.set(0, 0, 0);
            star.trailMaterial.uniforms.uOpacity.value = 0;
            star.headMaterial.opacity = 0;
            star.glowMaterial.opacity = 0;
            star.delay = delayRandomize ? THREE.MathUtils.randFloat(0.8, 3.2) : 0;
        };

        for (let i = 0; i < shootingStarCount; i += 1) {
            const star = createShootingStar();
            resetShootingStar(star, true);
            shootingStars.push(star);
        }

        const clock = new THREE.Clock();
        let frame = 0;

        const resize = () => {
            const { clientWidth, clientHeight } = mount;
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(clientWidth, clientHeight);
        };

        const handleResize = () => resize();
        window.addEventListener('resize', handleResize);

        const animate = () => {
            const elapsed = clock.getElapsedTime();
            starsMaterial.uniforms.uTime.value = elapsed;

            shootingStars.forEach((star) => {
                if (!star.active) {
                    star.delay -= 0.016;
                    if (star.delay <= 0) {
                        star.active = true;
                        star.progress = 0;
                        star.group.visible = true;
                    } else {
                        return;
                    }
                }

                star.progress += 0.006 * star.speed;
                const eased = Math.min(star.progress, 1);
                const arc = Math.sin(eased * Math.PI);

                const x = star.start.x + star.direction.x * eased;
                const y = star.start.y + star.direction.y * eased - arc * star.arcStrength;

                star.group.position.set(x, y, star.start.z);
                star.group.rotation.z = Math.atan2(star.direction.y, star.direction.x);

                const fadeIn = Math.min(1, eased * 5.0);
                const fadeOut = 1.0 - eased;
                const visible = fadeIn * fadeOut;
                const trailOpacity = visible * 0.32;
                const glowOpacity = visible * 0.32;
                const headOpacity = visible * 1.0;

                star.trailMaterial.uniforms.uOpacity.value = trailOpacity;
                star.headMaterial.opacity = headOpacity;
                star.glowMaterial.opacity = glowOpacity;

                star.head.position.set(0.15, 0, 0);
                star.head.scale.setScalar(1.0 + visible * 0.65);
                star.glow.scale.setScalar(1.2 + visible * 1.9);

                const trailLength = 8.5 + visible * 6.0;
                star.trail.scale.set(trailLength, 1, 1);
                star.trail.position.set(-trailLength * 0.5 - 0.2, 0, 0);

                if (star.progress >= 1) {
                    resetShootingStar(star, true);
                }
            });

            renderer.render(scene, camera);
            frame = requestAnimationFrame(animate);
        };

        resize();
        animate();

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);

            starsGeometry.dispose();
            starsMaterial.dispose();
            shootingStars.forEach((star) => {
                star.group.traverse((obj) => {
                    if ('geometry' in obj && obj.geometry) (obj.geometry as THREE.BufferGeometry).dispose();
                    if ('material' in obj && obj.material) {
                        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
                        materials.forEach((m) => m.dispose());
                    }
                });
            });
            renderer.dispose();

            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
        };
    }, [starCount, shootingStarCount]);

    return (
        <div
            ref={mountRef}
            className={`pointer-events-none fixed inset-0 overflow-hidden bg-[#050816] ${className}`}
            aria-hidden="true"
        />
    );
};

export default NightSkyBackground;
