import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  sRGBEncoding,
  ACESFilmicToneMapping,
  Raycaster,
  AmbientLight,
  DirectionalLight
} from 'three';

export function createScene(canvas) {
  const scene = new Scene();

  // добавляем освещение
  const ambient = new AmbientLight(0xffffff, 0.4); // мягкий фоновый свет
  const directional = new DirectionalLight(0xffffff, 0.8); // направленный свет
  directional.position.set(5, 5, 10);

  scene.add(ambient);
  scene.add(directional);

  const camera = new PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 20);

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ACESFilmicToneMapping;

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const raycaster = new Raycaster();

  return { scene, camera, renderer, raycaster };
}
