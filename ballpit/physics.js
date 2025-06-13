import {
  InstancedMesh,
  SphereGeometry,
  MeshStandardMaterial,
  Object3D,
  Vector3,
  Color
} from 'three';

const tempObject = new Object3D();
const tempPosition = new Vector3();
const tempColor = new Color();

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

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * maxX * 2;
    const y = (Math.random() - 0.5) * maxY * 2;
    const z = 0;

    positions.push(new Vector3(x, y, z));
    velocities.push(new Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, 0));
  }

  function update() {
    for (let i = 0; i < count; i++) {
      const p = positions[i];
      const v = velocities[i];

      v.y -= gravity;
      v.multiplyScalar(friction);
      p.add(v);

      // отскок от пола
      if (p.y < -maxY) {
        p.y = -maxY;
        v.y *= -1;
      }

      // отскок от стен
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
    const rect = mesh.renderer?.domElement?.getBoundingClientRect?.() || {
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

  return {
    mesh,
    update,
    handleClick
  };
}

