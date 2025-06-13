import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export class Spawner {
  constructor({ count }) {
    this.balls = [];
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: 0x66ccff });

    this.mesh = new THREE.InstancedMesh(geometry, material, count);

    for (let i = 0; i < count; i++) {
      const obj = new THREE.Object3D();
      obj.position.set(
        (Math.random() - 0.5) * 5,
        Math.random() * 5 + 3,
        0
      );
      obj.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        0,
        0
      );
      obj.index = i;
      obj.updateMatrix();
      this.mesh.setMatrixAt(i, obj.matrix);
      this.balls.push(obj);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  update(config) {
    for (const ball of this.balls) {
      ball.velocity.y -= config.gravity;
      ball.position.add(ball.velocity);

      if (ball.position.y < -config.maxY) {
        ball.position.y = -config.maxY;
        ball.velocity.y *= -config.wallBounce;
      }

      if (Math.abs(ball.position.x) > config.maxX) {
        ball.position.x = Math.sign(ball.position.x) * config.maxX;
        ball.velocity.x *= -config.wallBounce;
      }

      ball.updateMatrix();
      this.mesh.setMatrixAt(ball.index, ball.matrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
