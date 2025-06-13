import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export function createBalls(count, spawnY = 5) {
  const positions = [];
  const velocities = [];
  const spawn = new THREE.Vector3(0, spawnY, 0);

  for (let i = 0; i < count; i++) {
    const pos = spawn.clone();
    const vel = new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      -Math.random() * 0.3,
      0
    );
    positions.push(pos);
    velocities.push(vel);
  }

  return { positions, velocities };
}

