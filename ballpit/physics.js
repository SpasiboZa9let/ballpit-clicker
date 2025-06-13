import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

import { createBalls } from './physics/spawner.js';
import { createPhysicsEngine } from './physics/engine.js';
import { createClickHandler } from './physics/clickHandler.js';
import { createArena } from './physics/arena.js';

export function createPhysics(config) {
  const {
    count = 100,
    maxX = 10,
    maxY = 5,
    gravity = 0.07,
    friction = 0.98
  } = config;

  const geometry = new THREE.SphereGeometry(0.3, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0x66ccff });
  const instanced = new THREE.InstancedMesh(geometry, material, count);

  const { positions, velocities } = createBalls(count, maxY);
  const engine = createPhysicsEngine(positions, velocities, { gravity, friction, maxX, maxY });
  const handleClick = createClickHandler(instanced, velocities);
  const walls = createArena(maxX, maxY);

  const group = new THREE.Object3D();
  group.add(instanced);
  group.add(walls);

  return {
    mesh: group,
    update: () => engine.update(instanced),
    handleClick
  };
}
