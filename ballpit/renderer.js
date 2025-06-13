import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

function createRenderer(container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: container.querySelector('canvas'),
    antialias: true,
    alpha: true
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // Свет
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 5, 10);
  scene.add(ambient, directional);

  // Анимация
  let onFrame = () => {};
  function animate(time) {
    requestAnimationFrame(animate);
    onFrame(time / 1000);
  }
  animate();

  return {
    scene,
    camera,
    renderer,
    onFrame: fn => (onFrame = fn),
    render: () => renderer.render(scene, camera),
    dispose: () => renderer.dispose(),
  };
}

export default createRenderer;
