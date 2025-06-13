import {
  InstancedMesh,
  SphereGeometry,
  MeshStandardMaterial,
  Object3D,
  Vector3
} from 'three';

export class Spawner {
  constructor({ count }) {
    this.count = count;
    this.balls = [];

    const geometry = new SphereGeometry(0.5, 16, 16);
    const material = new MeshStandardMaterial({ color: 0x6699ff });

    this.mesh = new InstancedMesh(geometry, material, count);
    this.dummy = new Object3D();

    for (let i = 0; i < count; i++) {
      const obj = new Object3D();
      obj.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      obj.velocity = new Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      );
      obj.index = i;
      obj.updateMatrix();
      this.mesh.setMatrixAt(i, obj.matrix);
      this.balls.push(obj);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
