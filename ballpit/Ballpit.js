import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import createRenderer from './renderer.js';
import { Engine } from './physics/engine.js';

export default function Ballpit(canvas, options = {}) {
  const container = canvas.parentNode;

  // Получаем реальные размеры
  const width = container.clientWidth;
  const height = container.clientHeight;
  const aspect = width / height;

  const renderer = createRenderer(container);
  const scene = renderer.scene;
  const camera = renderer.camera;

  // Настраиваем размеры арены (в логических единицах, например, 1 юнит = 100px)
  const maxX = options.maxX ?? width / 100;
  const maxY = options.maxY ?? height / 100;

  // Центр камеры и отдаление (по глубине относительно диагонали арены)
  const viewSize = Math.max(maxX, maxY);
  camera.left = -viewSize * aspect;
  camera.right = viewSize * aspect;
  camera.top = viewSize;
  camera.bottom = -viewSize;
  camera.near = 0.1;
  camera.far = 1000;
  camera.position.set(0, 0, viewSize * 2);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

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
