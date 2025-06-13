import { createScene } from './renderer.js';
import { createPhysics } from './physics.js';

let raycaster, camera, scene, renderer, balls;

export function createBallpit(canvas, config = {}) {
  ({ scene, camera, renderer, raycaster } = createScene(canvas));

  const arena = {
    maxX: 10,
    maxY: 6
  };

  balls = createPhysics({
    count: config.count || 150,
    gravity: 0.05,
    friction: 0.985,
    ...arena
  });

  scene.add(balls.mesh);

  renderer.setAnimationLoop(() => {
    balls.update();
    renderer.render(scene, camera);
  });

  return {
    tryClick: (event) => balls.handleClick(event, camera, raycaster),
  };
}
