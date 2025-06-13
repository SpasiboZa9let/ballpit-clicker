import * as THREE from 'three';
import { createRenderer } from './renderer.js';
import { Engine } from './physics/engine.js';

export function Ballpit(canvas, options = {}) {
  const container = canvas.parentNode;

  const renderer = createRenderer(container);
  const scene = renderer.scene;
  const camera = renderer.camera;

  const maxX = window.innerWidth / 100;
  const maxY = window.innerHeight / 100;

  camera.position.set(0, 0, Math.max(maxX, maxY) * 2.5);
  camera.lookAt(0, 0, 0);

  const engine = new Engine({
    count: options.count || 100,
    maxX,
    maxY,
    gravity: options.gravity ?? 0.3,
    friction: options.friction ?? 0.95,
    wallBounce: options.wallBounce ?? 0.9,
    followCursor: options.followCursor ?? true,
  });

  scene.add(engine.mesh);

  renderer.onFrame((delta) => {
    engine.update(delta);
    renderer.render();
  });

  // Хендлер ресайза — пока простая перезагрузка
  window.addEventListener('resize', () => location.reload());

  return {
    dispose() {
      renderer.dispose();
      engine.dispose();
    }
  };
}
