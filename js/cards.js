// Animated scan-line canvas on each project card preview
document.querySelectorAll('.seg-preview').forEach(canvas => {
  const color = canvas.dataset.color || '#0ea5e9';
  const ctx   = canvas.getContext('2d');
  let frame   = 0;
  let w, h;

  function resize() {
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width  = w;
    canvas.height = h;
  }
  resize();

  // Parse hex color to rgba helper
  function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function draw() {
    if (!w || !h) { resize(); }
    ctx.clearRect(0, 0, w, h);

    // Draw grid lines (CT scan grid feel)
    ctx.strokeStyle = hexToRgba(color, 0.08);
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 20) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Draw contour blobs (simulated segmentation outlines)
    const blobs = [
      { x: 0.5, y: 0.45, rx: 0.28, ry: 0.32 },
      { x: 0.35, y: 0.55, rx: 0.12, ry: 0.15 },
      { x: 0.65, y: 0.4,  rx: 0.10, ry: 0.12 },
    ];
    blobs.forEach((b, i) => {
      const pulse = Math.sin(frame * 0.04 + i * 1.2) * 0.015;
      ctx.beginPath();
      ctx.ellipse(b.x * w, b.y * h, (b.rx + pulse) * w, (b.ry + pulse) * h, frame * 0.005 + i, 0, Math.PI * 2);
      ctx.strokeStyle = hexToRgba(color, 0.5);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(b.x * w, b.y * h, (b.rx + pulse) * w * 0.7, (b.ry + pulse) * h * 0.7, frame * 0.005 + i, 0, Math.PI * 2);
      ctx.strokeStyle = hexToRgba(color, 0.25);
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Scanning line
    const scanY = ((frame * 1.5) % (h + 40)) - 20;
    const grad = ctx.createLinearGradient(0, scanY - 8, 0, scanY + 8);
    grad.addColorStop(0,   hexToRgba(color, 0));
    grad.addColorStop(0.5, hexToRgba(color, 0.6));
    grad.addColorStop(1,   hexToRgba(color, 0));
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 8, w, 16);

    frame++;
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', resize);
});
