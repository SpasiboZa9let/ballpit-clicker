import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export function createArena(maxX, maxY) {
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x993333 });
  const wallThickness = 0.2;
  const wallDepth = 0.1;

  const left = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, maxY * 2, wallDepth),
    wallMaterial
  );
  left.position.set(-maxX - wallThickness / 2, 0, 0);

  const right = new THREE.Mesh(
    new THREE.BoxGeometry(wallThickness, maxY * 2, wallDepth),
    wallMaterial
  );
  right.position.set(maxX + wallThickness / 2, 0, 0);

  const bottom = new THREE.Mesh(
    new THREE.BoxGeometry(maxX * 2 + wallThickness * 2, wallThickness, wallDepth),
    wallMaterial
  );
  bottom.position.set(0, -maxY - wallThickness / 2, 0);

  const group = new THREE.Group();
  group.add(left, right, bottom);
  return group;
}

