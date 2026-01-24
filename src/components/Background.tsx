'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Stars(props: any) {
    const ref = useRef<THREE.Points>(null);

    // Generate random positions for stars
    const positions = useMemo(() => {
        const count = 7500;
        const array = new Float32Array(count * 3);
        const radius = 10; // Increased radius for better depth
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;
            const d = Math.sqrt(x * x + y * y + z * z);
            array[i * 3] = (x / d) * radius;
            array[i * 3 + 1] = (y / d) * radius;
            array[i * 3 + 2] = (z / d) * radius;
        }
        return array;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.015} // Increased size for better visibility
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function Planet({ radius, speed, size, color, offset }: { radius: number, speed: number, size: number, color: string, offset: number }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed + offset;
        if (ref.current) {
            ref.current.position.x = Math.cos(t) * radius;
            ref.current.position.z = Math.sin(t) * radius;
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <group>
            {/* Orbit Path */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            <mesh ref={ref}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
        </group>
    );
}

function Sun() {
    return (
        <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshBasicMaterial color="#ffcc33" />
            <pointLight intensity={2} distance={10} color="#ffcc33" />
        </mesh>
    );
}

function SolarSystem() {
    return (
        <group rotation={[0.4, 0, 0.2]} position={[0, -0.5, -4]}>
            <Sun />
            <Planet radius={1.2} speed={0.4} size={0.08} color="#44aaff" offset={0} /> {/* Earth-like */}
            <Planet radius={2.0} speed={0.2} size={0.12} color="#ff6633" offset={2} /> {/* Mars-like */}
            <Planet radius={3.2} speed={0.15} size={0.18} color="#ccaa88" offset={4} /> {/* Jupiter-like */}
            <Planet radius={4.5} speed={0.08} size={0.15} color="#ddccaa" offset={1} /> {/* Saturn-like */}
        </group>
    );
}

export default function Background() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#020205]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.1} />
                <Stars />
                <SolarSystem />
            </Canvas>
        </div>
    );
}
