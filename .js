// document.addEventListener("DOMContentLoaded", () => {
//   /* ══════════════════════════════════════════════
//      THREE.JS MAIN BACKGROUND SCENE (TERRAIN)
//    ══════════════════════════════════════════════ */
//   const container = document.getElementById("canvas-container");
//   const scene = new THREE.Scene();
//   scene.fog = new THREE.FogExp2(0x0a0a0c, 0.0095);

//   const camera = new THREE.PerspectiveCamera(
//     55,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000,
//   );
//   const renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   container.appendChild(renderer.domElement);
//   scene.background = new THREE.Color(0x0a0a0c);

//   /* ══════════════════════════════════════════════
//      DEDICATED 3D LOGO SCENE (VARIABLES DECLARED EARLY)
//    ══════════════════════════════════════════════ */
//   const logoContainer = document.getElementById("fbx-container");
//   const logoScene = new THREE.Scene();

//   const logoCamera = new THREE.PerspectiveCamera(
//     45,
//     logoContainer ? logoContainer.clientWidth / logoContainer.clientHeight : 1,
//     1,
//     1000,
//   );
//   logoCamera.position.set(0, 0, 100);

//   //   const logoRenderer = new THREE.WebGLRenderer({
//   //     antialias: true,
//   //     alpha: true,
//   //   });
//   //   if (logoContainer) {
//   //     logoRenderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
//   //     logoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//   //     logoContainer.appendChild(logoRenderer.domElement);
//   //   }

//   // Necessary lighting for MeshStandardMaterial
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//   logoScene.add(ambientLight);

//   const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
//   dirLight.position.set(10, 20, 30);
//   logoScene.add(dirLight);

//   /* Terrain surface function */
//   function terrainHeight(wx, wz) {
//     const noiseX = Math.sin(wz * 0.5) * 0.8;
//     const noiseZ = Math.cos(wx * 0.5) * 0.8;
//     wx += noiseX;
//     wz += noiseZ;

//     const peakX = 40;
//     const peakZ = -20;
//     const peakRadius = 25;
//     const peakSpike =
//       Math.exp(
//         -(
//           Math.pow((wx - peakX) / peakRadius, 2) +
//           Math.pow((wz - peakZ) / peakRadius, 2)
//         ),
//       ) * 80;

//     const ridgeA =
//       Math.exp(-(Math.pow((wx + 24) / 18, 2) + Math.pow((wz + 6) / 10, 2))) *
//       26;
//     const ridgeB =
//       Math.exp(-(Math.pow((wx - 20) / 14, 2) + Math.pow((wz - 10) / 16, 2))) *
//       20;
//     const basin =
//       -Math.exp(-(Math.pow((wx - 10) / 22, 2) + Math.pow((wz + 18) / 18, 2))) *
//       22;
//     const saddle = Math.sin(wx * 0.045) * Math.cos(wz * 0.032) * 10;
//     const wave =
//       Math.sin((wx + wz) * 0.06) * 5 + Math.cos((wx - wz) * 0.045) * 4;
//     const crest =
//       Math.exp(-(Math.pow(wx / 32, 2) + Math.pow((wz - 28) / 13, 2))) * 16;

//     return ridgeA + ridgeB + basin + saddle + wave + crest + peakSpike;
//   }

//   function terrainColor(height, minHeight, maxHeight) {
//     const t = Math.max(
//       0,
//       Math.min(1, (height - minHeight) / (maxHeight - minHeight || 1)),
//     );
//     const stops = [
//       [0.0, new THREE.Color(0x202020)],
//       [0.14, new THREE.Color(0x333333)],
//       [0.3, new THREE.Color(0x5a5a5a)],
//       [0.48, new THREE.Color(0x808080)],
//       [0.68, new THREE.Color(0xb0b0b0)],
//       [0.84, new THREE.Color(0xe0e0e0)],
//       [1.0, new THREE.Color(0xf8f8f8)],
//     ];

//     for (let i = 1; i < stops.length; i++) {
//       if (t <= stops[i][0]) {
//         const left = stops[i - 1];
//         const right = stops[i];
//         const mix = (t - left[0]) / (right[0] - left[0] || 1);
//         return left[1].clone().lerp(right[1], mix);
//       }
//     }
//     return stops[stops.length - 1][1].clone();
//   }

//   const terrainWidth = 1920;
//   const terrainDepth = 1080;
//   const terrainSegmentsX = 800;
//   const terrainSegmentsZ = 500;
//   const terrainVertexCount = (terrainSegmentsX + 1) * (terrainSegmentsZ + 1);
//   const terrainGeometry = new THREE.BufferGeometry();
//   const terrainPositions = new Float32Array(terrainVertexCount * 3);
//   const terrainColors = new Float32Array(terrainVertexCount * 3);
//   const terrainBaseY = new Float32Array(terrainVertexCount);
//   const terrainOffsets = new Float32Array(terrainVertexCount);
//   const terrainSizes = new Float32Array(terrainVertexCount);

//   let minTerrainHeight = Infinity;
//   let maxTerrainHeight = -Infinity;
//   let vertexIndex = 0;

//   for (let row = 0; row <= terrainSegmentsZ; row++) {
//     const wz = (row / terrainSegmentsZ - 0.5) * terrainDepth;
//     for (let col = 0; col <= terrainSegmentsX; col++) {
//       const wx = (col / terrainSegmentsX - 0.5) * terrainWidth;
//       const height = terrainHeight(wx, wz);

//       const jitterAmount = 1.2;
//       const randomOffsetX = (Math.random() - 0.5) * jitterAmount;
//       const randomOffsetZ = (Math.random() - 0.5) * jitterAmount;

//       terrainPositions[vertexIndex * 3] = wx + randomOffsetX;
//       terrainPositions[vertexIndex * 3 + 1] = height;
//       terrainPositions[vertexIndex * 3 + 2] = wz + randomOffsetZ;

//       terrainBaseY[vertexIndex] = height;
//       terrainOffsets[vertexIndex] = Math.random() * Math.PI * 2;
//       terrainSizes[vertexIndex] = Math.random();

//       minTerrainHeight = Math.min(minTerrainHeight, height);
//       maxTerrainHeight = Math.max(maxTerrainHeight, height);
//       vertexIndex++;
//     }
//   }

//   vertexIndex = 0;
//   for (let row = 0; row <= terrainSegmentsZ; row++) {
//     for (let col = 0; col <= terrainSegmentsX; col++) {
//       const height = terrainPositions[vertexIndex * 3 + 1];
//       const color = terrainColor(height, minTerrainHeight, maxTerrainHeight);
//       terrainColors[vertexIndex * 3] = color.r;
//       terrainColors[vertexIndex * 3 + 1] = color.g;
//       terrainColors[vertexIndex * 3 + 2] = color.b;
//       vertexIndex++;
//     }
//   }

//   terrainGeometry.setAttribute(
//     "position",
//     new THREE.BufferAttribute(terrainPositions, 3),
//   );
//   terrainGeometry.setAttribute(
//     "color",
//     new THREE.BufferAttribute(terrainColors, 3),
//   );

//   const terrainParticles = new THREE.Points(
//     terrainGeometry,
//     new THREE.PointsMaterial({
//       size: 1.3,
//       sizeAttenuation: false,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.88,
//     }),
//   );

//   const terrainGlow = new THREE.Points(
//     terrainGeometry,
//     new THREE.PointsMaterial({
//       size: 2.8,
//       sizeAttenuation: false,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.18,
//       blending: THREE.AdditiveBlending,
//       depthWrite: false,
//     }),
//   );
//   scene.add(terrainParticles);
//   scene.add(terrainGlow);

//   /* Camera Configuration */
//   const baseCamY = 56,
//     baseCamZ = 220;
//   camera.position.set(0, baseCamY, baseCamZ);
//   camera.lookAt(0, 10, 0);

//   let targetRotY = 0,
//     currentRotY = 0;
//   let targetRotX = 0,
//     currentRotX = 0;
//   let targetCamZ = baseCamZ,
//     currentCamZ = baseCamZ;
//   let targetCamY = baseCamY,
//     currentCamY = baseCamY;
//   let targetCamX = 0,
//     currentCamX = 0;
//   let pointerX = 0,
//     pointerY = 0;

//   window.addEventListener("scroll", () => {
//     const s = window.scrollY;
//     const maxScroll = Math.max(
//       1,
//       document.body.scrollHeight - window.innerHeight,
//     );
//     const progress = Math.min(1, Math.max(0, s / maxScroll));

//     targetRotY = progress * Math.PI * 1.9;
//     targetCamZ = baseCamZ - progress * 70;
//     targetCamY = baseCamY - progress * 18;
//     targetCamX = pointerX * 10;
//   });

//   window.addEventListener("pointermove", (e) => {
//     pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
//     pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
//     targetRotX = -pointerY * 0.12;
//     targetCamX = pointerX * 10;
//   });

//   window.addEventListener("resize", () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     trailCanvas.width = window.innerWidth;
//     trailCanvas.height = window.innerHeight;

//     // if (logoContainer && logoRenderer && logoCamera) {
//     //   logoCamera.aspect =
//     //     logoContainer.clientWidth / logoContainer.clientHeight;
//     //   logoCamera.updateProjectionMatrix();
//     //   logoRenderer.setSize(
//     //     logoContainer.clientWidth,
//     //     logoContainer.clientHeight,
//     //   );
//     // }
//   });

//   /* ══════════════════════════════════════════════
//      COMET TRAIL
//    ══════════════════════════════════════════════ */
//   const trailCanvas = document.getElementById("trail-canvas");
//   const ctx = trailCanvas.getContext("2d");
//   trailCanvas.width = window.innerWidth;
//   trailCanvas.height = window.innerHeight;

//   let mouseX = -300,
//     mouseY = -300;
//   let smoothX = -300,
//     smoothY = -300;

//   const TRAIL_LEN = 40;
//   const trail = [];
//   let trailPtr = 0;
//   for (let i = 0; i < TRAIL_LEN; i++) trail.push({ x: -300, y: -300 });

//   window.addEventListener("mousemove", (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
//   });

//   function drawTrail() {
//     ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
//     smoothX += (mouseX - smoothX) * 0.18;
//     smoothY += (mouseY - smoothY) * 0.18;

//     trail[trailPtr] = { x: smoothX, y: smoothY };
//     trailPtr = (trailPtr + 1) % TRAIL_LEN;

//     const pts = [];
//     for (let i = 0; i < TRAIL_LEN; i++) {
//       pts.push(trail[(trailPtr + i) % TRAIL_LEN]);
//     }

//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";

//     for (let i = 1; i < pts.length; i++) {
//       const t = i / (pts.length - 1);
//       const alpha = t * t * 0.9;
//       const width = t * 6;

//       ctx.beginPath();
//       ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
//       ctx.lineTo(pts[i].x, pts[i].y);
//       ctx.strokeStyle = `rgba(249, 29, 38, ${alpha})`;
//       ctx.lineWidth = width;
//       ctx.stroke();
//     }

//     ctx.beginPath();
//     ctx.arc(smoothX, smoothY, 4, 0, Math.PI * 2);
//     ctx.fillStyle = "#ff1a1a";
//     ctx.shadowColor = "#f91d26";
//     ctx.shadowBlur = 14;
//     ctx.fill();
//     ctx.shadowBlur = 0;
//   }

//   /* Combined Animation Loops */
//   function animate() {
//     requestAnimationFrame(animate);
//     const time = Date.now() * 0.0005;

//     const pos = terrainGeometry.attributes.position.array;
//     for (let i = 0; i < terrainVertexCount; i++) {
//       const ph = terrainOffsets[i];
//       const pulse = 0.6 + terrainSizes[i] * 0.8;
//       pos[i * 3 + 1] =
//         terrainBaseY[i] +
//         Math.sin(time * 0.85 + ph) * 0.12 * pulse +
//         Math.cos(time * 1.2 + ph * 0.6) * 0.08 * pulse;
//     }
//     terrainGeometry.attributes.position.needsUpdate = true;

//     currentRotY += (targetRotY - currentRotY) * 0.04;
//     terrainParticles.rotation.y = currentRotY;
//     terrainGlow.rotation.y = currentRotY;

//     currentRotX += (targetRotX - currentRotX) * 0.04;
//     terrainParticles.rotation.x = currentRotX;
//     terrainGlow.rotation.x = currentRotX;

//     currentCamZ += (targetCamZ - currentCamZ) * 0.05;
//     currentCamY += (targetCamY - currentCamY) * 0.05;
//     currentCamX += (targetCamX - currentCamX) * 0.05;
//     camera.position.x = currentCamX;
//     camera.position.z = currentCamZ;
//     camera.position.y = currentCamY;
//     camera.lookAt(currentCamX * 0.18, 8 - (baseCamZ - currentCamZ) * 0.02, 0);

//     renderer.render(scene, camera);

//     // if (loadedModel) {
//     //   loadedModel.rotation.y += 0.01;
//     // }

//     // if (logoContainer && logoRenderer) {
//     //   logoRenderer.render(logoScene, logoCamera);
//     // }

//     drawTrail();
//   }

//   animate();
// });
