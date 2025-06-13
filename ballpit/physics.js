import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

const tempObject = new THREE.Object3D();

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

  const positions = [];
  const velocities = [];

  const spawnPosition = new THREE.Vector3(0, maxY, 0);

  for (let i = 0; i < count; i++) {
    const pos = spawnPosition.clone();
    const vel = new THREE.Vector3(
      (Math.random() - 0.5) * 0.3,
      -Math.random() * 0.3,
      0
    );
    positions.push(pos);
    velocities.push(vel);
  }

  function update() {
    for (let i = 0; i < count; i++) {
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
      instanced.setMatrixAt(i, tempObject.matrix);
    }

    instanced.instanceMatrix.needsUpdate = true;
  }

  function handleClick(event, camera, raycaster) {
    const rect = raycaster.domElement?.getBoundingClientRect?.() || {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };

    const mouse = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(instanced);

    if (intersects.length > 0) {
      const index = intersects[0].instanceId;
      if (index !== undefined) {
        velocities[index].add(new THREE.Vector3(0, 1, 0));
        return true;
      }
    }

    return false;
  }

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(maxX * 2, 0.3),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  floor.position.set(0, -maxY, 0);

  const group = new THREE.Object3D();
  group.add(instanced);
  group.add(floor);

  return {
    mesh: group,
    update,
    handleClick
  };
}
