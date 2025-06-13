import Ballpit from './ballpit/Ballpit.js';

const canvas = document.getElementById('canvas');

// Храним текущий ballpit, чтобы пересоздавать при resize
let current = null;

function resizeAndStart() {
  if (current) current.dispose();

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  current = Ballpit(canvas, {
    count: 100,
    gravity: 0.05,
    friction: 0.9,
    wallBounce: 0.75,
    followCursor: false,
    maxX: width / 100,
    maxY: height / 100,
  });
}

// Первый запуск
resizeAndStart();

// Динамически при ресайзе
window.addEventListener('resize', resizeAndStart);
