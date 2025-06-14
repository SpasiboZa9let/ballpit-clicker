import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export function createArena(maxX, maxY) {
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x993333 });
  const thickness = 0.2;
  const depth = 1; // ← увеличенная глубина, чтобы точно было видно

  const left = new THREE.Mesh(
    new THREE.BoxGeometry(thickness, maxY * 2, depth),
    wallMaterial
  );
  left.position.set(-maxX - thickness / 2, 0, 0);

  const right = new THREE.Mesh(
    new THREE.BoxGeometry(thickness, maxY * 2, depth),
    wallMaterial
  );
  right.position.set(maxX + thickness / 2, 0, 0);

  const bottom = new THREE.Mesh(
    new THREE.BoxGeometry(maxX * 2 + thickness * 2, thickness, depth),
    wallMaterial
  );
  bottom.position.set(0, -maxY - thickness / 2, 0);

  const group = new THREE.Group();
  group.add(left, right, bottom);
  return group;
}
