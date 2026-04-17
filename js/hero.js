// Three.js animated point-cloud hero — simulates MRI volumetric scatter
(function () {
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  // Generate volumetric sphere point cloud
  const count = 4000;
  const positions = new Float32Array(count * 3);
  const colors    = new Float32Array(count * 3);

  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    // Hollow sphere shell (like a brain surface)
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    const r     = 30 + (Math.random() - 0.5) * 12;

    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    // Color gradient: sky blue → white based on height
    const t = (positions[i * 3 + 1] + 40) / 80;
    color.setHSL(0.55 + t * 0.1, 0.8, 0.4 + t * 0.4);
    colors[i * 3]     = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  // Inner dense core
  const coreCount = 1500;
  const corePos   = new Float32Array(coreCount * 3);
  for (let i = 0; i < coreCount; i++) {
    corePos[i * 3]     = (Math.random() - 0.5) * 40;
    corePos[i * 3 + 1] = (Math.random() - 0.5) * 40;
    corePos[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos, 3));
  const coreMat = new THREE.PointsMaterial({ size: 0.25, color: 0x38bdf8, transparent: true, opacity: 0.3 });
  scene.add(new THREE.Points(coreGeo, coreMat));

  function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  resize();
  window.addEventListener('resize', resize);

  // Mouse parallax
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5) * 0.4;
    my = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.004;
    points.rotation.y = t + mx;
    points.rotation.x = my * 0.5;
    renderer.render(scene, camera);
  }
  animate();
})();
