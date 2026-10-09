import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface Props {
  count: number;
  /** Half-size of the box particles drift inside. */
  bounds?: [number, number, number];
  linkDistance?: number;
  color?: string;
}

const MAX_LINKS_PER_POINT = 4;

/**
 * Drifting particle field with faint lines between near neighbours,
 * suggesting an AI/data network. Buffers are preallocated once; each frame
 * only rewrites positions, so there is no garbage collection churn.
 */
export function ParticleNetwork({
  count,
  bounds = [6, 3.5, 2],
  linkDistance = 1.1,
  color = '#7aa7ff',
}: Props) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);

  const [bx, by, bz] = bounds;
  const { positions, velocities, linePositions, box } = useMemo(() => {
    const box = [bx, by, bz];
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      for (let a = 0; a < 3; a++) {
        positions[i * 3 + a] = (Math.random() * 2 - 1) * box[a];
        velocities[i * 3 + a] = (Math.random() * 2 - 1) * 0.06;
      }
    }
    const linePositions = new Float32Array(count * MAX_LINKS_PER_POINT * 6);
    return { positions, velocities, linePositions, box };
  }, [count, bx, by, bz]);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    // 1. Drift, bouncing softly off the bounds.
    for (let i = 0; i < count * 3; i++) {
      positions[i] += velocities[i] * delta;
      const b = box[i % 3];
      if (positions[i] > b || positions[i] < -b) velocities[i] *= -1;
    }
    // 2. Connect nearby particles (squared distance, capped links per point).
    const max2 = linkDistance * linkDistance;
    let seg = 0;
    const maxSeg = linePositions.length / 6;
    for (let i = 0; i < count && seg < maxSeg; i++) {
      let links = 0;
      const ix = i * 3;
      for (let j = i + 1; j < count && links < MAX_LINKS_PER_POINT && seg < maxSeg; j++) {
        const jx = j * 3;
        const dx = positions[ix] - positions[jx];
        const dy = positions[ix + 1] - positions[jx + 1];
        const dz = positions[ix + 2] - positions[jx + 2];
        if (dx * dx + dy * dy + dz * dz < max2) {
          const o = seg * 6;
          linePositions[o] = positions[ix];
          linePositions[o + 1] = positions[ix + 1];
          linePositions[o + 2] = positions[ix + 2];
          linePositions[o + 3] = positions[jx];
          linePositions[o + 4] = positions[jx + 1];
          linePositions[o + 5] = positions[jx + 2];
          seg++;
          links++;
        }
      }
    }
    points.current!.geometry.attributes.position.needsUpdate = true;
    const lg = lines.current!.geometry;
    lg.attributes.position.needsUpdate = true;
    lg.setDrawRange(0, seg * 2);
  });

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={color}
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.14} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
