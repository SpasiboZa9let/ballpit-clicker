import { createBallpit } from './ballpit/Ballpit.js';

const canvas = document.createElement('canvas');
canvas.id = 'main-canvas';
document.getElementById('app').appendChild(canvas);

let score = 0;
const scoreEl = document.getElementById('score');

const pit = createBallpit(canvas, {
  count: 150,
  followCursor: true,
});

canvas.addEventListener('click', (event) => {
  const clicked = pit.tryClick(event);
  if (clicked) {
    score += 1;
    scoreEl.textContent = score;
  }
});

