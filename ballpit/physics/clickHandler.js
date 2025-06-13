import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';

export function createClickHandler(instancedMesh, velocities) {
  return function handleClick(event, camera, raycaster) {
    const rect = raycaster.domElement?.getBoundingClientRect?.() || {
      left: 0, top: 0, width: window.innerWidth, height: window.innerHeight
    };

    const mouse = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((event.clientY - rect.top) / rect.height) * 2 + 1
    };

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(instancedMesh);

    if (intersects.length > 0) {
      const index = intersects[0].instanceId;
      if (index !== undefined) {
        velocities[index].add(new THREE.Vector3(0, 1, 0));
        return true;
      }
    }

    return false;
  };
}
