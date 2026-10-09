import { MeshDistortMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DAMPING = 0.08; // parallax easing factor (spec: 0.05–0.1)

/**
 * Glossy, slowly rotating sphere with noise distortion (MeshDistortMaterial).
 * Tilts gently toward the mouse; the tilt is eased so it feels weighty, not twitchy.
 * Positioned in the right half on wide screens, centred behind text otherwise.
 */
export function DistortBlob() {
  const mesh = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const viewport = useThree((s) => s.viewport);
  const wide = viewport.aspect > 1.2;

  // Canvas is aria-hidden with pointer-events off, so listen on window instead.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    const m = mesh.current;
    if (!m) return;
    m.rotation.y += delta * 0.15; // slow idle spin
    m.rotation.x += (pointer.current.y * 0.35 - m.rotation.x) * DAMPING;
    m.rotation.z += (-pointer.current.x * 0.25 - m.rotation.z) * DAMPING;
  });

  const scale = wide
    ? Math.min(1.5, viewport.height * 0.26)
    : Math.min(1.25, viewport.width * 0.32);

  return (
    <mesh ref={mesh} position={[wide ? viewport.width * 0.22 : 0, wide ? 0 : 0.3, 0]} scale={scale}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial
        color="#2b5ce6"
        roughness={0.22}
        metalness={0.4}
        distort={0.42}
        speed={1.4}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}
