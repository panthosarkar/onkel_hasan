document.addEventListener("DOMContentLoaded", () => {
  /* ══════════════════════════════════════════════
     THREE.JS MAIN BACKGROUND SCENE (TERRAIN)
   ══════════════════════════════════════════════ */
  const container = document.getElementById("canvas-container");
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0a0c, 0.0095);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  scene.background = new THREE.Color(0x0a0a0c);

  /* ══════════════════════════════════════════════
     DEDICATED 3D LOGO SCENE (VARIABLES DECLARED EARLY)
   ══════════════════════════════════════════════ */
  //   const logoContainer = document.getElementById("fbx-container");
  //   const logoScene = new THREE.Scene();

  //   const logoCamera = new THREE.PerspectiveCamera(
  //     45,
  //     logoContainer ? logoContainer.clientWidth / logoContainer.clientHeight : 1,
  //     1,
  //     1000,
  //   );
  //   logoCamera.position.set(0, 0, 100);

  //   const logoRenderer = new THREE.WebGLRenderer({
  //     antialias: true,
  //     alpha: true,
  //   });
  //   if (logoContainer) {
  //     logoRenderer.setSize(logoContainer.clientWidth, logoContainer.clientHeight);
  //     logoRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //     logoContainer.appendChild(logoRenderer.domElement);
  //   }

  // Necessary lighting for MeshStandardMaterial
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  // logoScene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(10, 20, 30);
  //   logoScene.add(dirLight);

  /* Terrain surface function */
  function terrainHeight(wx, wz) {
    const noiseX = Math.sin(wz * 0.9) * 0.8;
    const noiseZ = Math.cos(wx * 0.9) * 0.9;
    wx += noiseX;
    wz += noiseZ;

    const peakX = 30;
    const peakZ = -20;
    const peakRadius = 100;
    const peakSpike =
      Math.exp(
        -(
          Math.pow((wx - peakX) / peakRadius, 2) +
          Math.pow((wz - peakZ) / peakRadius, 2)
        ),
      ) * 40;

    const ridgeA =
      Math.exp(-(Math.pow((wx + 24) / 18, 2) + Math.pow((wz + 6) / 10, 2))) *
      26;
    const ridgeB =
      Math.exp(-(Math.pow((wx - 20) / 14, 2) + Math.pow((wz - 10) / 16, 2))) *
      20;
    const basin =
      -Math.exp(-(Math.pow((wx - 10) / 22, 2) + Math.pow((wz + 18) / 18, 2))) *
      22;
    const saddle = Math.sin(wx * 0.045) * Math.cos(wz * 0.032) * 10;
    const wave =
      Math.sin((wx + wz) * 0.06) * 5 + Math.cos((wx - wz) * 0.045) * 4;
    const crest =
      Math.exp(-(Math.pow(wx / 32, 2) + Math.pow((wz - 28) / 13, 2))) * 16;

    return ridgeA + ridgeB + basin + saddle + wave + crest + peakSpike;
  }

  function terrainColor(height, minHeight, maxHeight) {
    const t = Math.max(
      0,
      Math.min(1, (height - minHeight) / (maxHeight - minHeight || 1)),
    );
    const stops = [
      [0.0, new THREE.Color(0x211f20)],
      [0.25, new THREE.Color(0x7f2023)],
      [0.5, new THREE.Color(0xf11f20)],
      [0.75, new THREE.Color(0x828182)],
      [1.0, new THREE.Color(0xe8e7e8)],
    ];

    for (let i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        const left = stops[i - 1];
        const right = stops[i];
        const mix = (t - left[0]) / (right[0] - left[0] || 1);
        return left[1].clone().lerp(right[1], mix);
      }
    }
    return stops[stops.length - 1][1].clone();
  }

  const terrainWidth = 1920;
  const terrainDepth = 1080;
  const terrainSegmentsX = 800;
  const terrainSegmentsZ = 500;
  const terrainVertexCount = (terrainSegmentsX + 1) * (terrainSegmentsZ + 1);
  const terrainGeometry = new THREE.BufferGeometry();
  const terrainPositions = new Float32Array(terrainVertexCount * 3);
  const terrainColors = new Float32Array(terrainVertexCount * 3);
  const terrainBaseY = new Float32Array(terrainVertexCount);
  const terrainOffsets = new Float32Array(terrainVertexCount);
  const terrainSizes = new Float32Array(terrainVertexCount);

  let minTerrainHeight = Infinity;
  let maxTerrainHeight = -Infinity;
  let vertexIndex = 0;

  for (let row = 0; row <= terrainSegmentsZ; row++) {
    const wz = (row / terrainSegmentsZ - 0.5) * terrainDepth;
    for (let col = 0; col <= terrainSegmentsX; col++) {
      const wx = (col / terrainSegmentsX - 0.5) * terrainWidth;
      const height = terrainHeight(wx, wz);

      const jitterAmount = 1.2;
      const randomOffsetX = (Math.random() - 0.5) * jitterAmount;
      const randomOffsetZ = (Math.random() - 0.5) * jitterAmount;

      terrainPositions[vertexIndex * 3] = wx + randomOffsetX;
      terrainPositions[vertexIndex * 3 + 1] = height;
      terrainPositions[vertexIndex * 3 + 2] = wz + randomOffsetZ;

      terrainBaseY[vertexIndex] = height;
      terrainOffsets[vertexIndex] = Math.random() * Math.PI * 2;
      terrainSizes[vertexIndex] = Math.random();

      minTerrainHeight = Math.min(minTerrainHeight, height);
      maxTerrainHeight = Math.max(maxTerrainHeight, height);
      vertexIndex++;
    }
  }

  vertexIndex = 0;
  for (let row = 0; row <= terrainSegmentsZ; row++) {
    for (let col = 0; col <= terrainSegmentsX; col++) {
      const height = terrainPositions[vertexIndex * 3 + 1];
      const color = terrainColor(height, minTerrainHeight, maxTerrainHeight);
      terrainColors[vertexIndex * 3] = color.r;
      terrainColors[vertexIndex * 3 + 1] = color.g;
      terrainColors[vertexIndex * 3 + 2] = color.b;
      vertexIndex++;
    }
  }

  terrainGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(terrainPositions, 3),
  );
  terrainGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(terrainColors, 3),
  );

  const terrainParticles = new THREE.Points(
    terrainGeometry,
    new THREE.PointsMaterial({
      size: 1.8,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
    }),
  );

  const terrainGlow = new THREE.Points(
    terrainGeometry,
    new THREE.PointsMaterial({
      size: 2.8,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(terrainParticles);
  scene.add(terrainGlow);

  /* Camera Configuration */
  const baseCamY = 56,
    baseCamZ = 220;
  camera.position.set(0, baseCamY, baseCamZ);
  camera.lookAt(0, 10, 0);

  let targetRotY = 0,
    currentRotY = 0;
  let targetRotX = 0,
    currentRotX = 0;
  let targetCamZ = baseCamZ,
    currentCamZ = baseCamZ;
  let targetCamY = baseCamY,
    currentCamY = baseCamY;
  let targetCamX = 0,
    currentCamX = 0;
  let pointerX = 0,
    pointerY = 0;

  // Parallax Elements Setup
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  const layersData = Array.from(parallaxLayers).map((el) => ({
    el,
    speed: parseFloat(el.getAttribute("data-speed")) || 0,
    currentY: 0,
    targetY: 0,
  }));

  window.addEventListener("scroll", () => {
    const s = window.scrollY;
    const maxScroll = Math.max(
      1,
      document.body.scrollHeight - window.innerHeight,
    );
    const progress = Math.min(1, Math.max(0, s / maxScroll));

    // Reverse the progress for scroll-driven animations
    const reversedProgress = 1 - progress;
    targetRotY = reversedProgress * Math.PI * 1.9;
    targetCamZ = baseCamZ - reversedProgress * 70;
    targetCamY = baseCamY - reversedProgress * 18;
    targetCamX = pointerX * 10;

    // Update SVG targets
    layersData.forEach((layer) => {
      layer.targetY = s * layer.speed;
    });
  });

  window.addEventListener("pointermove", (e) => {
    // pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    // pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    // targetRotX = -pointerY * 0.12; // Commented out to stop terrain rotation by mouse
    // targetCamX = pointerX * 10;    // Commented out to stop camera X movement by mouse
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;

    // if (logoContainer && logoRenderer && logoCamera) {
    //   logoCamera.aspect =
    //     logoContainer.clientWidth / logoContainer.clientHeight;
    //   logoCamera.updateProjectionMatrix();
    //   logoRenderer.setSize(
    //     logoContainer.clientWidth,
    //     logoContainer.clientHeight,
    //   );
    // }
  });

  /* ══════════════════════════════════════════════
     COMET TRAIL
   ══════════════════════════════════════════════ */
  const trailCanvas = document.getElementById("trail-canvas");
  const ctx = trailCanvas.getContext("2d");
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;

  let mouseX = -300,
    mouseY = -300;
  let smoothX = -300,
    smoothY = -300;

  const TRAIL_LEN = 40;
  const trail = [];
  let trailPtr = 0;
  for (let i = 0; i < TRAIL_LEN; i++) trail.push({ x: -300, y: -300 });

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function drawTrail() {
    ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

    trail[trailPtr] = { x: smoothX, y: smoothY };
    trailPtr = (trailPtr + 1) % TRAIL_LEN;

    const pts = [];
    for (let i = 0; i < TRAIL_LEN; i++) {
      pts.push(trail[(trailPtr + i) % TRAIL_LEN]);
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 1; i < pts.length; i++) {
      const t = i / (pts.length - 1);
      const alpha = t * t * 0.1;
      const width = t * 3.5;

      ctx.beginPath();
      ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
      ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = `rgba(249, 29, 38, ${alpha})`;
      ctx.lineWidth = width;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(smoothX, smoothY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#ff1a1a";
    ctx.shadowColor = "#f91d26";
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  /* Combined Animation Loops */
  function animate() {
    requestAnimationFrame(animate);

    // 1. Update smoothed mouse position at the start of the frame to keep trail and fluid in sync
    smoothX += (mouseX - smoothX) * 0.18;
    smoothY += (mouseY - smoothY) * 0.18;

    // 2. Update Camera and Rotation values before logic so raycasting is accurate
    currentRotY += (targetRotY - currentRotY) * 0.04;
    currentRotX += (targetRotX - currentRotX) * 0.04;
    currentCamZ += (targetCamZ - currentCamZ) * 0.05;
    currentCamY += (targetCamY - currentCamY) * 0.05;
    currentCamX += (targetCamX - currentCamX) * 0.05;

    camera.position.set(currentCamX, currentCamY, currentCamZ);
    camera.lookAt(currentCamX * 0.18, 8 - (baseCamZ - currentCamZ) * 0.02, 0);
    camera.updateMatrixWorld(); // Ensure camera matrices are fresh for raycasting

    terrainParticles.rotation.set(currentRotX, currentRotY, 0);
    terrainGlow.rotation.set(currentRotX, currentRotY, 0);
    terrainParticles.updateMatrixWorld(); // Ensure terrain matrices are fresh for worldToLocal

    // 2.5 Update SVG Parallax layers with smoothing
    layersData.forEach((layer) => {
      layer.currentY += (layer.targetY - layer.currentY) * 0.1;
      layer.el.style.transform = `translate3d(0, ${layer.currentY}px, 0)`;
    });

    const time = Date.now() * 0.0005;
    const pos = terrainGeometry.attributes.position.array;

    // 3. Fluid effect logic
    const mouseVector = new THREE.Vector2(
      (smoothX / window.innerWidth) * 2 - 1,
      -(smoothY / window.innerHeight) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouseVector, camera);

    // Define a plane at the approximate average height of the terrain for intersection
    const terrainCenterY = 8 - (baseCamZ - currentCamZ) * 0.02;
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -terrainCenterY);
    const intersectionPoint = new THREE.Vector3();
    let mouseWorldX = null;
    let mouseWorldZ = null;

    if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
      // Convert the world intersection point into the terrain's local coordinate space.
      // This fixes the misalignment caused by terrain rotation.
      terrainParticles.worldToLocal(intersectionPoint);
      mouseWorldX = intersectionPoint.x;
      mouseWorldZ = intersectionPoint.z;
    }

    // 4. Logo influence (Center of screen)
    const logoVector = new THREE.Vector2(0, 0); // Center of viewport
    raycaster.setFromCamera(logoVector, camera);
    const logoIntersection = new THREE.Vector3();
    let logoWorldX = null,
      logoWorldZ = null;
    if (raycaster.ray.intersectPlane(plane, logoIntersection)) {
      terrainParticles.worldToLocal(logoIntersection);
      logoWorldX = logoIntersection.x;
      logoWorldZ = logoIntersection.z;
    }
    const logoPulse = Math.sin(time * Math.PI) * 2.5; // Syncs with 4s CSS cycle

    const influenceRadius = 15; // How far the mouse influences the dots
    const maxDisplacement = 5; // Maximum height displacement for the fluid effect

    for (let i = 0; i < terrainVertexCount; i++) {
      const ph = terrainOffsets[i];
      const pulse = 0.6 + terrainSizes[i] * 0.8;
      let currentHeight =
        terrainBaseY[i] +
        Math.sin(time * 0.85 + ph) * 0.12 * pulse +
        Math.cos(time * 1.2 + ph * 0.6) * 0.08 * pulse;

      if (mouseWorldX !== null && mouseWorldZ !== null) {
        const vertexX = pos[i * 3];
        const vertexZ = pos[i * 3 + 2];
        const distSq =
          (vertexX - mouseWorldX) ** 2 + (vertexZ - mouseWorldZ) ** 2;
        if (distSq < influenceRadius ** 2) {
          const distance = Math.sqrt(distSq);
          const influence = 1 - distance / influenceRadius; // 1 at center, 0 at edge
          currentHeight +=
            influence * maxDisplacement * Math.sin(time * 5 + distance * 0.5);
        }
      }

      // Apply slight displacement under the floating logo
      if (logoWorldX !== null) {
        const lDistSq =
          (pos[i * 3] - logoWorldX) ** 2 + (pos[i * 3 + 2] - logoWorldZ) ** 2;
        const lRadius = 60; // Wider area for the logo interaction
        if (lDistSq < lRadius ** 2) {
          const lDist = Math.sqrt(lDistSq);
          const lInfluence = 1 - lDist / lRadius;
          currentHeight += lInfluence * logoPulse;
        }
      }

      pos[i * 3 + 1] = currentHeight;
    }
    terrainGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);

    // if (loadedModel) {
    //   loadedModel.rotation.y += 0.01;
    // }

    // if (logoContainer && logoRenderer) {
    //   logoRenderer.render(logoScene, logoCamera);
    // }

    drawTrail();
  }

  animate();
});
