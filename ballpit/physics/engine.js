import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export function createPhysicsEngine(positions, velocities, config) {
  const { gravity = 0.07, friction = 0.98, maxX = 10, maxY = 5 } = config;
  const tempObject = new THREE.Object3D();

  function update(instancedMesh) {
    for (let i = 0; i < positions.length; i++) {
      const p = positions[i];
      const v = velocities[i];

      v.y -= gravity;
      v.multiplyScalar(friction);
      p.add(v);

      if (p.y < -maxY) {
        p.y = -maxY;
        v.y *= -1;
      }

      if (p.x < -maxX || p.x > maxX) {
        p.x = Math.sign(p.x) * maxX;
        v.x *= -1;
      }

      tempObject.position.copy(p);
      tempObject.updateMatrix();
      instancedMesh.setMatrixAt(i, tempObject.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  return { update };
}

