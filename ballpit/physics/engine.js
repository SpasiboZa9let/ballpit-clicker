import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { Spawner } from './spawner.js';
import { createArena } from './arena.js';
import { createClickHandler } from './clickHandler.js';

export class Engine {
  constructor(config) {
    this.config = config;

    this.arena = createArena(config.maxX, config.maxY);
    this.spawner = new Spawner(config);

    this.mesh = new THREE.Group();
    this.mesh.add(this.spawner.mesh);
    this.mesh.add(this.arena);

    this.handleClick = createClickHandler(this.spawner.mesh, this.spawner.balls);
  }

  update() {
    this.spawner.update(this.config);
  }

  dispose() {
    this.mesh.clear();
  }
}
