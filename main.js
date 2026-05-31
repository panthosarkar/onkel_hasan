const canvas = document.getElementById("scene");
const loading = document.getElementById("loading");
const logoShell = document.getElementById("logoShell");

let width = 0;
let height = 0;
let renderer;
let scene;
let camera;
let particleField;
let dustField;
let logoGroup;
let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;

function createRenderer() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("scene"),
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);
}

function createScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1b1918, 8, 30);

  camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );
  camera.position.set(0, 2.2, 12);

  const ambient = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambient);

  const point = new THREE.PointLight(0xffffff, 1.2, 40);
  point.position.set(0, 8, 10);
  scene.add(point);
}

function createParticleField() {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];
  const sizes = [];
  const count = 12000;

  for (let i = 0; i < count; i += 1) {
    const ring = Math.sqrt(random(i + 11));
    const angle = random(i + 21) * Math.PI * 2;
    const radius = 8 + ring * 10;
    const x = Math.cos(angle) * radius + Math.sin(i * 0.003) * 1.2;
    const y = (random(i + 31) - 0.5) * 5 + Math.sin(angle * 2) * 0.2;
    const z = (random(i + 41) - 0.5) * 10 - ring * 12;

    positions.push(x, y, z);
    colors.push(0.95, 0.92, 0.9);
    sizes.push(0.45 + random(i + 51) * 0.55);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  particleField = new THREE.Points(geometry, material);
  scene.add(particleField);
}

function createDustField() {
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const colors = [];

  const count = 1800;
  for (let i = 0; i < count; i += 1) {
    const spread = Math.sqrt(random(i + 71));
    const angle = random(i + 81) * Math.PI * 2;
    const x = Math.cos(angle) * (10 + spread * 7);
    const y = (random(i + 91) - 0.5) * 8;
    const z = (random(i + 101) - 0.5) * 18;

    positions.push(x, y, z);
    colors.push(1, 0.78 + random(i + 111) * 0.12, 0.5 + random(i + 121) * 0.15);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  dustField = new THREE.Points(geometry, material);
  dustField.position.y = 0.6;
  scene.add(dustField);
}

function updateInteraction() {
  const motionX = targetX * 0.35;
  const motionY = targetY * 0.22;

  camera.position.x += (motionX - camera.position.x) * 0.035;
  camera.position.y += (2.2 + motionY - camera.position.y) * 0.035;
  camera.lookAt(0, 0.5, 0);

  if (particleField) {
    particleField.rotation.y += 0.0007;
    particleField.rotation.x =
      Math.sin(performance.now() * 0.00015) * 0.04 + motionY * 0.01;
  }

  if (dustField) {
    dustField.rotation.y -= 0.001;
    dustField.rotation.z = Math.sin(performance.now() * 0.00012) * 0.02;
  }
}

function animate() {
  updateInteraction();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resize() {
  if (!renderer || !camera) {
    return;
  }

  const nextWidth = window.innerWidth;
  const nextHeight = window.innerHeight;
  camera.aspect = nextWidth / nextHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(nextWidth, nextHeight, false);
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  targetX = (event.clientX / window.innerWidth) * 2 - 1;
  targetY = (event.clientY / window.innerHeight) * 2 - 1;
});

createRenderer();
createScene();
createParticleField();
createDustField();

const startScene = () => {
  if (window.gsap) {
    gsap.fromTo(
      logoShell,
      { y: 18, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "power3.out" },
    );

    gsap.to(loading, {
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: "power2.out",
    });
  }

  animate();
};

if (logoShell.querySelector("img")?.complete) {
  startScene();
} else {
  logoShell.querySelector("img")?.addEventListener("load", startScene, {
    once: true,
  });
}
