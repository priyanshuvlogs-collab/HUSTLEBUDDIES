import { Environment, Lightformer } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { particleBudget } from '../../lib/webgl';
import { DistortBlob } from './DistortBlob';
import { FrameLimiter } from './FrameLimiter';
import { ParticleNetwork } from './ParticleNetwork';

/**
 * Hero WebGL scene (lazy-loaded chunk). One canvas holds both the particle
 * network and the distorted sphere to avoid a second WebGL context.
 * Lighting: blue key light, orange rim light, and a local Lightformer
 * environment (no HDR download, keeps the CSP strict).
 */
export default function HeroScene({ active }: { active: boolean }) {
  const count = useMemo(particleBudget, []);
  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
    >
      <FrameLimiter active={active} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[-4, 3, 5]} intensity={2.4} color="#3B82F6" />
      <directionalLight position={[5, -2, -4]} intensity={3} color="#F97316" />
      <Environment resolution={128}>
        <Lightformer
          form="circle"
          intensity={2.2}
          color="#3B82F6"
          position={[-4, 2, 4]}
          scale={7}
        />
        <Lightformer
          form="circle"
          intensity={2.4}
          color="#F97316"
          position={[5, -2, -2]}
          scale={6}
        />
        <Lightformer form="circle" intensity={0.8} color="#ffffff" position={[0, 6, 1]} scale={4} />
      </Environment>
      <ParticleNetwork count={count} bounds={[7, 4, 2]} />
      <DistortBlob />
    </Canvas>
  );
}
