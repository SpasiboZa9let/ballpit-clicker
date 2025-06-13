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

  // 🔧 Арена фиксированного размера — например, 10 юнитов по высоте
  const viewHeight = options.viewHeight ?? 10;
  const viewWidth = viewHeight * aspect;

  camera.left = -viewWidth / 2;
  camera.right = viewWidth / 2;
  camera.top = viewHeight / 2;
  camera.bottom = -viewHeight / 2;
  camera.near = 0.1;
  camera.far = 1000;
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  const maxX = viewWidth / 2;
  const maxY = viewHeight / 2;

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
