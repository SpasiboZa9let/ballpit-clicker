import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export function createScene(canvas) {
  const scene = new THREE.Scene();

  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 5, 10);

  scene.add(ambient);
  scene.add(directional);

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 20);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const raycaster = new THREE.Raycaster();

  return { scene, camera, renderer, raycaster };
}
