import Ballpit from './ballpit/Ballpit.js';

const canvas = document.getElementById('canvas');

Ballpit(canvas, {
  count: 200,
  gravity: 0.6,
  friction: 0.9,
  wallBounce: 0.95,
  followCursor: true,
});
