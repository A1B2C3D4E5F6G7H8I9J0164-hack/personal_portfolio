'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Stars(props: any) {
    const ref = useRef<THREE.Points>(null);

    // Generate random positions for stars
    const positions = useMemo(() => {
        const count = 7500;
        const array = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10; // Spread x
            const y = (Math.random() - 0.5) * 10; // Spread y
            const z = (Math.random() - 0.5) * 10; // Spread z
            // Normalize to sphere
            const d = Math.sqrt(x * x + y * y + z * z);
            const r = 1.5; // radius
            array[i * 3] = (x / d) * r;
            array[i * 3 + 1] = (y / d) * r;
            array[i * 3 + 2] = (z / d) * r;
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
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

export default function Background() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars />
            </Canvas>
        </div>
    );
}
