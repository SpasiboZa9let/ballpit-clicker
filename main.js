import { createPhysics } from './ballpit/physics.js';
import { createRenderer } from './ballpit/renderer.js';

const container = document.getElementById('canvas-container');

const renderer = createRenderer(container);

// Размеры арены зависят от ширины/высоты окна
const maxX = window.innerWidth / 100;
const maxY = window.innerHeight / 100;

const physics = createPhysics({
  count: 100,
  maxX,
  maxY,
  gravity: 0.2,
  friction: 0.98,
});

renderer.scene.add(physics.mesh);

// Позиция камеры — на центр арены, отдалена в 2.5 раза от максимального размера
renderer.camera.position.set(0, 0, Math.max(maxX, maxY) * 2.5);
renderer.camera.lookAt(0, 0, 0);

// Рендерим каждый кадр
renderer.onFrame((delta) => {
  physics.update(delta);
  renderer.render();
});

// При ресайзе — обновляем страницу (на потом — динамический пересчёт)
window.addEventListener('resize', () => {
  location.reload();
});
