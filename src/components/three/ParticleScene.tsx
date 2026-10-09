import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { particleBudget } from '../../lib/webgl';
import { FrameLimiter } from './FrameLimiter';
import { ParticleNetwork } from './ParticleNetwork';

/** Background-only particle canvas (lazy chunk) for the How We Work section. */
export default function ParticleScene({ active }: { active: boolean }) {
  const count = useMemo(() => Math.round(particleBudget() * 0.7), []);
  return (
    <Canvas
      aria-hidden="true"
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
    >
      <FrameLimiter active={active} fps={60} />
      <ParticleNetwork count={count} bounds={[8, 4, 2]} color="#8fb3ff" />
    </Canvas>
  );
}
