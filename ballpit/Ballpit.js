import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import createRenderer from './renderer.js';
import { Engine } from './physics/engine.js';

export default function Ballpit(canvas, options = {}) {
  const container = canvas.parentNode;

  const renderer = createRenderer(container);
  const scene = renderer.scene;
  const camera = renderer.camera;

  // Размеры арены с возможностью переопределения
  const maxX = options.maxX ?? window.innerWidth / 100;
  const maxY = options.maxY ?? window.innerHeight / 100;

  // Центр камеры и отдаление
  camera.position.set(0, 0, Math.max(maxX, maxY) * 2.5);
  camera.lookAt(0, 0, 0);

  // Движок физики
  const engine = new Engine({
    count: options.count ?? 100,
    maxX,
    maxY,
    gravity: options.gravity ?? 0.05,
    friction: options.friction ?? 0.9,
    wallBounce: options.wallBounce ?? 0.75,
    followCursor: options.followCursor ?? false,
  });

  scene.add(engine.mesh);

  // Анимация
  renderer.onFrame((delta) => {
    engine.update(delta);
    renderer.render();
  });

  return {
    dispose() {
      renderer.dispose();
      engine.dispose();
    }
  };
}
