import {
  InstancedMesh,
  SphereGeometry,
  MeshStandardMaterial,
  Object3D,
  Vector3,
  Color,
  PlaneGeometry,
  Mesh
} from 'three';

const tempObject = new Object3D();

export function createPhysics(config) {
  const {
    count = 100,
    maxX = 10,
    maxY = 5,
    gravity = 0.07,
    friction = 0.98
  } = config;

  const geometry = new SphereGeometry(0.3, 16, 16);
  const material = new MeshStandardMaterial({ color: 0x66ccff });
  const mesh = new InstancedMesh(geometry, material, count);

  const positions = [];
  const velocities = [];

  // форточка — в центре сверху
  const spawnPosition = new Vector3(0, maxY, 0);

  for (let i = 0; i < count; i++) {
    const pos = spawnPosition.clone();
    const vel = new Vector3(
      (Math.random() - 0.5) * 0.3, // X — в стороны
      -Math.random() * 0.3,        // Y — вниз
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

      // столкновения с полом
      if (p.y < -maxY) {
        p.y = -maxY;
        v.y *= -1;
      }

      // стены
      if (p.x < -maxX || p.x > maxX) {
        p.x = Math.sign(p.x) * maxX;
        v.x *= -1;
      }

      tempObject.position.copy(p);
      tempObject.updateMatrix();
      mesh.setMatrixAt(i, tempObject.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
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
    const intersects = raycaster.intersectObject(mesh);

    if (intersects.length > 0) {
      const index = intersects[0].instanceId;
      if (index !== undefined) {
        velocities[index].add(new Vector3(0, 1, 0)); // подпрыгнуть
        return true;
      }
    }

    return false;
  }

  // пол как визуальный ориентир
  const floor = new Mesh(
    new PlaneGeometry(maxX * 2, 0.3),
    new MeshStandardMaterial({ color: 0x333333 })
  );
  floor.position.set(0, -maxY, 0);

  const group = new Object3D();
  group.add(mesh);
  group.add(floor);

  return {
    mesh: group,
    update,
    handleClick
  };
}
