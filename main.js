import Ballpit from './ballpit/Ballpit.js';

const canvas = document.getElementById('canvas');

Ballpit(canvas, {
  count: 100,
  gravity: 0.05,       // мягкая гравитация
  friction: 0.9,       // медленное замедление
  wallBounce: 0.75,    // энергия теряется при отскоке
  followCursor: false, // отключаем мышь на первом этапе
});
