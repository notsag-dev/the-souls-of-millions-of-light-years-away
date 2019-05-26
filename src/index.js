const THREE = require('three');
const {mirroredRoom} = require('./mirroredRoom');

/**
 * Global THREE inits
 *
 */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0000ff, 100, 40000)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000,
);
camera.position.x = -300;
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * Render function. Executed every frame.
 *
 */
const render = () => {
  renderer.render(scene, camera);
};

/**
 * Animation function. Executed every frame.
 *
 */
const animate = () => {
  requestAnimationFrame(animate);
  render();
};

/**
 * Scene init: populate scene.
 *
 */
const init = async () => {
  const room = Object.create(mirroredRoom);
  room.init({boxSize: {x:10000, y: 2000, z: 10000}});
  scene.add(room.group)
  animate();
};

init();
