import * as THREE from 'three';

export interface SphereSceneSettings {
  animated?: boolean;
  wireframed?: boolean;
  background?: string;
  color?: string;
  mouseSensitive?: boolean;
  radius?: number;
}

export function createSphereScene(
  renderTo: HTMLDivElement,
  settings: SphereSceneSettings
) {
  const {
    animated = true,
    wireframed = false,
    background = '#000000',
    color = '#ffffff',
    mouseSensitive = false,
    radius = 5, // Default radius for the sphere
  } = settings;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderTo.appendChild(renderer.domElement);

  // Set scene background
  scene.background = new THREE.Color(background);

  // Create the sphere
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    wireframe: wireframed,
  });
  const sphere = new THREE.Mesh(geometry, material);

  // Center the sphere
  sphere.position.set(0, 0, 0);
  scene.add(sphere);

  // Center the camera
  camera.position.z = radius * 1.5;

  // Add rotation and animation
  const animate = () => {
    requestAnimationFrame(animate);

    if (animated) {
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  };

  // Handle mouse movement for camera control (if enabled)
  if (mouseSensitive) {
    window.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      camera.position.x += mouseX * 0.05;
      camera.position.y += mouseY * 0.05;
    });
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Start animation
  animate();
}
