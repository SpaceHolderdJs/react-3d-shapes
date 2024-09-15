import * as THREE from 'three';

export interface CubeSceneSettings {
  numberOfCubes: number;
  animated?: boolean;
  wireframed?: boolean;
  background?: string;
  color?: string;
  mouseSensitive?: boolean;
  onScroll?: 'zoom' | 'rotate'; // New setting
}

export function createCubeScene(
  renderTo: HTMLDivElement,
  settings: CubeSceneSettings
) {
  const {
    numberOfCubes,
    animated = true,
    wireframed = false,
    background = '#000000',
    color = '#ffffff',
    mouseSensitive = false,
    onScroll = 'rotate', // Default setting
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

  // Create an array of cubes with random positions
  const cubes: THREE.Mesh[] = [];
  for (let i = 0; i < numberOfCubes; i++) {
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: wireframed,
    });

    const cube = new THREE.Mesh(geometry, material);

    // Randomize cube positions
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    cube.position.z = Math.random() * 10 - 5;

    scene.add(cube);
    cubes.push(cube);
  }

  // Center the camera
  camera.position.z = 5;

  let scrollY = 0;

  // Add rotation and animation
  const animate = () => {
    requestAnimationFrame(animate);

    if (animated) {
      cubes.forEach((cube) => {
        if (onScroll === 'rotate') {
          // Rotate cubes if onScroll is 'rotate'
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
        }
      });
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

  // Handle scroll events for zoom or rotate effects
  if (onScroll) {
    window.addEventListener('wheel', (event) => {
      if (onScroll === 'rotate') {
        const delta = event.deltaY > 0 ? 0.1 : -0.1;
        cubes.forEach((cube) => {
          cube.rotation.x += delta;
          cube.rotation.y += delta;
        });
      } else if (onScroll === 'zoom') {
        const zoomFactor = event.deltaY * 0.01;
        cubes.forEach((cube) => {
          cube.position.z += zoomFactor;
        });
      }
      event.preventDefault();
    });
  }

  // Start animation
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
