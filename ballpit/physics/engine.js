import { Arena } from './arena.js';
import { Spawner } from './spawner.js';

export class Engine {
  constructor(config) {
    this.config = config;

    this.arena = new Arena(config);
    this.spawner = new Spawner(config);

    this.mesh = this.spawner.mesh;
    this.balls = this.spawner.balls;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
  }

  update(delta) {
    for (const ball of this.balls) {
      ball.velocity.y -= this.config.gravity * delta;
      ball.position.add(ball.velocity);

      // Стенки арены
      if (Math.abs(ball.position.x) > this.maxX) {
        ball.position.x = Math.sign(ball.position.x) * this.maxX;
        ball.velocity.x *= -this.config.friction;
      }

      if (ball.position.y < -this.maxY) {
        ball.position.y = -this.maxY;
        ball.velocity.y *= -this.config.friction;
      }

      if (Math.abs(ball.position.y) > this.maxY) {
        ball.position.y = Math.sign(ball.position.y) * this.maxY;
        ball.velocity.y *= -this.config.friction;
      }

      if (Math.abs(ball.position.z) > this.maxX) {
        ball.position.z = Math.sign(ball.position.z) * this.maxX;
        ball.velocity.z *= -this.config.friction;
      }

      ball.updateMatrix();
      this.mesh.setMatrixAt(ball.index, ball.matrix);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
