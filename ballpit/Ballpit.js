import { createScene } from './renderer.js';
import { createPhysics } from './physics.js';

let raycaster, camera, scene, renderer, balls;

export function createBallpit(canvas, config = {}) {
  ({ scene, camera, renderer, raycaster } = createScene(canvas));
  balls = createPhysics(config);

  scene.add(balls.mesh);

  renderer.setAnimationLoop((time) => {
    balls.update();
    renderer.render(scene, camera);
  });

  return {
    tryClick: (event) => balls.handleClick(event, camera, raycaster),
  };
}

