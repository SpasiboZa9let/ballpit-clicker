import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import createRenderer from './renderer.js';
import { Engine } from './physics/engine.js';

export default function Ballpit(canvas, options = {}) {
  const container = canvas.parentNode;

  const width = container.clientWidth;
  const height = container.clientHeight;
  const aspect = width / height;

  const renderer = createRenderer(container);
  const scene = renderer.scene;
  const camera = renderer.camera;

  // Центрированная ортографическая камера
  const viewSize = options.viewSize ?? 10;
  camera.left = (-aspect * viewSize) / 2;
  camera.right = (aspect * viewSize) / 2;
  camera.top = viewSize / 2;
  camera.bottom = -viewSize / 2;
  camera.near = 0.1;
  camera.far = 1000;
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const maxX = (camera.right - camera.left) / 2;
  const maxY = (camera.top - camera.bottom) / 2;

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
