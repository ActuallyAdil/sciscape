// SciScape Standalone JavaScript

// ============================================
// Navigation & Theme
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTheme();
  initPhysicsLab();
  initChemistryLab();
  initBiologyExplorer();
  initConceptGraph();
  initDashboard();
});

function initNavigation() {
  const navLinks = document.querySelectorAll('[data-nav]');
  const pages = document.querySelectorAll('.page');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.nav;
      
      pages.forEach(page => page.classList.remove('active'));
      navLinks.forEach(l => l.classList.remove('active'));
      
      document.getElementById(target).classList.add('active');
      link.classList.add('active');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('sciscape-theme') || 'light';
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('sciscape-theme', theme);
  });
}

// ============================================
// Physics Lab
// ============================================

let physicsState = {
  isPlaying: false,
  time: 0,
  ball: { x: 100, y: 100, vx: 2, vy: -5 },
  initialBall: { x: 100, y: 100, vx: 2, vy: -5 },
  gravity: 9.81,
  mass: 1,
  bounciness: 0.8,
  trail: [],
  showTrail: true,
  positionData: [],
  velocityData: []
};

function initPhysicsLab() {
  const canvas = document.getElementById('physicsCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = 400;
  
  // Controls
  document.getElementById('playPauseBtn').addEventListener('click', togglePhysics);
  document.getElementById('stepBtn').addEventListener('click', stepPhysics);
  document.getElementById('resetBtn').addEventListener('click', resetPhysics);
  
  // Environment presets
  document.getElementById('environment').addEventListener('change', (e) => {
    const presets = {
      earth: 9.81,
      moon: 1.62,
      mars: 3.71,
      jupiter: 24.79,
      custom: physicsState.gravity
    };
    physicsState.gravity = presets[e.target.value];
    document.getElementById('gravitySlider').value = physicsState.gravity;
    document.getElementById('gravityValue').textContent = physicsState.gravity.toFixed(2);
  });
  
  // Sliders
  setupSlider('gravitySlider', 'gravityValue', (v) => physicsState.gravity = v);
  setupSlider('massSlider', 'massValue', (v) => physicsState.mass = v);
  setupSlider('velXSlider', 'velXValue', (v) => { physicsState.initialBall.vx = v; physicsState.ball.vx = v; });
  setupSlider('velYSlider', 'velYValue', (v) => { physicsState.initialBall.vy = v; physicsState.ball.vy = v; });
  setupSlider('bouncinessSlider', 'bouncinessValue', (v) => physicsState.bounciness = v);
  
  document.getElementById('showTrail').addEventListener('change', (e) => {
    physicsState.showTrail = e.target.checked;
  });
  
  // Save/Load
  document.getElementById('saveExperiment').addEventListener('click', saveExperiment);
  document.getElementById('loadExperiment').addEventListener('click', loadExperiment);
  
  // Start render loop
  requestAnimationFrame(() => renderPhysics(ctx, canvas));
}

function setupSlider(sliderId, valueId, callback) {
  const slider = document.getElementById(sliderId);
  const value = document.getElementById(valueId);
  
  slider.addEventListener('input', (e) => {
    const v = parseFloat(e.target.value);
    value.textContent = v.toFixed(1);
    callback(v);
  });
}

function togglePhysics() {
  physicsState.isPlaying = !physicsState.isPlaying;
  const btn = document.getElementById('playPauseBtn');
  btn.textContent = physicsState.isPlaying ? '⏸ Pause' : '▶ Play';
}

function stepPhysics() {
  updatePhysics(1/60);
}

function resetPhysics() {
  physicsState.isPlaying = false;
  physicsState.time = 0;
  physicsState.ball = { ...physicsState.initialBall };
  physicsState.trail = [];
  physicsState.positionData = [];
  physicsState.velocityData = [];
  document.getElementById('playPauseBtn').textContent = '▶ Play';
}

function updatePhysics(dt) {
  const { ball, gravity, bounciness } = physicsState;
  const canvas = document.getElementById('physicsCanvas');
  
  // Apply gravity (scaled for visual)
  ball.vy += gravity * dt * 10;
  
  // Update position
  ball.x += ball.vx * 10 * dt;
  ball.y += ball.vy * 10 * dt;
  
  // Bounce off walls
  const radius = 15;
  if (ball.x < radius) { ball.x = radius; ball.vx *= -bounciness; }
  if (ball.x > canvas.width - radius) { ball.x = canvas.width - radius; ball.vx *= -bounciness; }
  if (ball.y < radius) { ball.y = radius; ball.vy *= -bounciness; }
  if (ball.y > canvas.height - radius) { ball.y = canvas.height - radius; ball.vy *= -bounciness; }
  
  // Update time
  physicsState.time += dt;
  
  // Add to trail
  if (physicsState.showTrail) {
    physicsState.trail.push({ x: ball.x, y: ball.y });
    if (physicsState.trail.length > 200) physicsState.trail.shift();
  }
  
  // Store data for graphs
  physicsState.positionData.push({ t: physicsState.time, y: canvas.height - ball.y });
  physicsState.velocityData.push({ t: physicsState.time, vy: ball.vy });
  if (physicsState.positionData.length > 200) {
    physicsState.positionData.shift();
    physicsState.velocityData.shift();
  }
  
  updateReadouts();
  drawGraphs();
}

function renderPhysics(ctx, canvas) {
  // Clear
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--background').trim() || '#f5f5f7';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  ctx.strokeStyle = 'rgba(128, 128, 128, 0.1)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  // Draw trail
  if (physicsState.showTrail && physicsState.trail.length > 1) {
    ctx.beginPath();
    ctx.moveTo(physicsState.trail[0].x, physicsState.trail[0].y);
    for (let i = 1; i < physicsState.trail.length; i++) {
      ctx.lineTo(physicsState.trail[i].x, physicsState.trail[i].y);
    }
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  // Draw ball
  const { ball } = physicsState;
  const gradient = ctx.createRadialGradient(ball.x - 5, ball.y - 5, 0, ball.x, ball.y, 15);
  gradient.addColorStop(0, 'hsl(250, 89%, 70%)');
  gradient.addColorStop(1, 'hsl(250, 89%, 50%)');
  
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 15, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Draw velocity vector
  ctx.beginPath();
  ctx.moveTo(ball.x, ball.y);
  ctx.lineTo(ball.x + ball.vx * 5, ball.y + ball.vy * 5);
  ctx.strokeStyle = 'hsl(340, 75%, 55%)';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Arrow head
  const angle = Math.atan2(ball.vy, ball.vx);
  ctx.beginPath();
  ctx.moveTo(ball.x + ball.vx * 5, ball.y + ball.vy * 5);
  ctx.lineTo(ball.x + ball.vx * 5 - 8 * Math.cos(angle - 0.4), ball.y + ball.vy * 5 - 8 * Math.sin(angle - 0.4));
  ctx.lineTo(ball.x + ball.vx * 5 - 8 * Math.cos(angle + 0.4), ball.y + ball.vy * 5 - 8 * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fillStyle = 'hsl(340, 75%, 55%)';
  ctx.fill();
  
  // Update physics if playing
  if (physicsState.isPlaying) {
    updatePhysics(1/60);
  }
  
  requestAnimationFrame(() => renderPhysics(ctx, canvas));
}

function updateReadouts() {
  const { ball, time, gravity, mass } = physicsState;
  const canvas = document.getElementById('physicsCanvas');
  const height = canvas.height - ball.y;
  const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
  const ke = 0.5 * mass * speed * speed;
  const pe = mass * gravity * (height / 100); // Scaled
  
  document.getElementById('timeReadout').textContent = `${time.toFixed(2)} s`;
  document.getElementById('positionReadout').textContent = `(${(ball.x/10).toFixed(1)}, ${(height/10).toFixed(1)}) m`;
  document.getElementById('velocityReadout').textContent = `(${ball.vx.toFixed(1)}, ${(-ball.vy).toFixed(1)}) m/s`;
  document.getElementById('accelerationReadout').textContent = `${gravity.toFixed(2)} m/s²`;
  document.getElementById('kineticReadout').textContent = `${ke.toFixed(2)} J`;
  document.getElementById('potentialReadout').textContent = `${pe.toFixed(2)} J`;
}

function drawGraphs() {
  drawGraph('positionGraph', physicsState.positionData, 'y', 'hsl(250, 89%, 62%)');
  drawGraph('velocityGraph', physicsState.velocityData, 'vy', 'hsl(340, 75%, 55%)');
}

function drawGraph(canvasId, data, key, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || data.length < 2) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = 200;
  
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--card').trim() || '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Find data range
  const values = data.map(d => d[key]);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  
  // Draw axes
  ctx.strokeStyle = 'rgba(128, 128, 128, 0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, canvas.height - 20);
  ctx.lineTo(canvas.width - 10, canvas.height - 20);
  ctx.stroke();
  
  // Draw data
  ctx.beginPath();
  const xStep = (canvas.width - 50) / (data.length - 1);
  
  data.forEach((d, i) => {
    const x = 40 + i * xStep;
    const y = canvas.height - 20 - ((d[key] - minVal) / range) * (canvas.height - 40);
    
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function saveExperiment() {
  const experiments = JSON.parse(localStorage.getItem('sciscape-experiments') || '[]');
  const experiment = {
    id: Date.now(),
    name: `Experiment ${experiments.length + 1}`,
    date: new Date().toISOString(),
    settings: {
      gravity: physicsState.gravity,
      mass: physicsState.mass,
      bounciness: physicsState.bounciness,
      initialVx: physicsState.initialBall.vx,
      initialVy: physicsState.initialBall.vy
    }
  };
  experiments.push(experiment);
  localStorage.setItem('sciscape-experiments', JSON.stringify(experiments));
  alert('Experiment saved!');
  updateDashboard();
}

function loadExperiment() {
  const experiments = JSON.parse(localStorage.getItem('sciscape-experiments') || '[]');
  if (experiments.length === 0) {
    alert('No saved experiments');
    return;
  }
  
  const latest = experiments[experiments.length - 1];
  physicsState.gravity = latest.settings.gravity;
  physicsState.mass = latest.settings.mass;
  physicsState.bounciness = latest.settings.bounciness;
  physicsState.initialBall.vx = latest.settings.initialVx;
  physicsState.initialBall.vy = latest.settings.initialVy;
  
  // Update UI
  document.getElementById('gravitySlider').value = physicsState.gravity;
  document.getElementById('gravityValue').textContent = physicsState.gravity.toFixed(1);
  document.getElementById('massSlider').value = physicsState.mass;
  document.getElementById('massValue').textContent = physicsState.mass.toFixed(1);
  document.getElementById('bouncinessSlider').value = physicsState.bounciness;
  document.getElementById('bouncinessValue').textContent = physicsState.bounciness.toFixed(1);
  
  resetPhysics();
  alert('Experiment loaded!');
}

// ============================================
// Chemistry Lab
// ============================================

const molecules = {
  h2o: {
    name: 'Water',
    formula: 'H₂O',
    weight: '18.015 g/mol',
    bonds: 2,
    angle: '104.5°',
    polarity: 'Polar',
    atoms: [
      { element: 'O', x: 0, y: 0, z: 0, color: 'hsl(0, 70%, 50%)', radius: 30 },
      { element: 'H', x: -40, y: 30, z: 0, color: 'hsl(0, 0%, 90%)', radius: 20 },
      { element: 'H', x: 40, y: 30, z: 0, color: 'hsl(0, 0%, 90%)', radius: 20 }
    ],
    bonds: [[0, 1], [0, 2]]
  },
  co2: {
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    weight: '44.01 g/mol',
    bonds: 4,
    angle: '180°',
    polarity: 'Non-polar',
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0, color: 'hsl(0, 0%, 30%)', radius: 25 },
      { element: 'O', x: -60, y: 0, z: 0, color: 'hsl(0, 70%, 50%)', radius: 30 },
      { element: 'O', x: 60, y: 0, z: 0, color: 'hsl(0, 70%, 50%)', radius: 30 }
    ],
    bonds: [[0, 1], [0, 2]]
  },
  ch4: {
    name: 'Methane',
    formula: 'CH₄',
    weight: '16.04 g/mol',
    bonds: 4,
    angle: '109.5°',
    polarity: 'Non-polar',
    atoms: [
      { element: 'C', x: 0, y: 0, z: 0, color: 'hsl(0, 0%, 30%)', radius: 25 },
      { element: 'H', x: -40, y: -30, z: 0, color: 'hsl(0, 0%, 90%)', radius: 18 },
      { element: 'H', x: 40, y: -30, z: 0, color: 'hsl(0, 0%, 90%)', radius: 18 },
      { element: 'H', x: -40, y: 30, z: 0, color: 'hsl(0, 0%, 90%)', radius: 18 },
      { element: 'H', x: 40, y: 30, z: 0, color: 'hsl(0, 0%, 90%)', radius: 18 }
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]]
  },
  nh3: {
    name: 'Ammonia',
    formula: 'NH₃',
    weight: '17.03 g/mol',
    bonds: 3,
    angle: '107°',
    polarity: 'Polar',
    atoms: [
      { element: 'N', x: 0, y: 0, z: 0, color: 'hsl(220, 70%, 50%)', radius: 28 },
      { element: 'H', x: -45, y: 25, z: 0, color: 'hsl(0, 0%, 90%)', radius: 18 },
      { element: 'H', x: 45, y: 25, z: 0, color: 'hsl(0, 0%, 90%)', radius: 18 },
      { element: 'H', x: 0, y: -35, z: 0, color: 'hsl(0, 0%, 90%)', radius: 18 }
    ],
    bonds: [[0, 1], [0, 2], [0, 3]]
  },
  o2: {
    name: 'Oxygen',
    formula: 'O₂',
    weight: '32.00 g/mol',
    bonds: 2,
    angle: 'N/A',
    polarity: 'Non-polar',
    atoms: [
      { element: 'O', x: -35, y: 0, z: 0, color: 'hsl(0, 70%, 50%)', radius: 30 },
      { element: 'O', x: 35, y: 0, z: 0, color: 'hsl(0, 70%, 50%)', radius: 30 }
    ],
    bonds: [[0, 1]]
  },
  n2: {
    name: 'Nitrogen',
    formula: 'N₂',
    weight: '28.01 g/mol',
    bonds: 3,
    angle: 'N/A',
    polarity: 'Non-polar',
    atoms: [
      { element: 'N', x: -30, y: 0, z: 0, color: 'hsl(220, 70%, 50%)', radius: 28 },
      { element: 'N', x: 30, y: 0, z: 0, color: 'hsl(220, 70%, 50%)', radius: 28 }
    ],
    bonds: [[0, 1]]
  },
  c6h6: {
    name: 'Benzene',
    formula: 'C₆H₆',
    weight: '78.11 g/mol',
    bonds: 12,
    angle: '120°',
    polarity: 'Non-polar',
    atoms: [
      { element: 'C', x: 0, y: -50, z: 0, color: 'hsl(0, 0%, 30%)', radius: 22 },
      { element: 'C', x: 43, y: -25, z: 0, color: 'hsl(0, 0%, 30%)', radius: 22 },
      { element: 'C', x: 43, y: 25, z: 0, color: 'hsl(0, 0%, 30%)', radius: 22 },
      { element: 'C', x: 0, y: 50, z: 0, color: 'hsl(0, 0%, 30%)', radius: 22 },
      { element: 'C', x: -43, y: 25, z: 0, color: 'hsl(0, 0%, 30%)', radius: 22 },
      { element: 'C', x: -43, y: -25, z: 0, color: 'hsl(0, 0%, 30%)', radius: 22 },
      { element: 'H', x: 0, y: -85, z: 0, color: 'hsl(0, 0%, 90%)', radius: 15 },
      { element: 'H', x: 74, y: -42, z: 0, color: 'hsl(0, 0%, 90%)', radius: 15 },
      { element: 'H', x: 74, y: 42, z: 0, color: 'hsl(0, 0%, 90%)', radius: 15 },
      { element: 'H', x: 0, y: 85, z: 0, color: 'hsl(0, 0%, 90%)', radius: 15 },
      { element: 'H', x: -74, y: 42, z: 0, color: 'hsl(0, 0%, 90%)', radius: 15 },
      { element: 'H', x: -74, y: -42, z: 0, color: 'hsl(0, 0%, 90%)', radius: 15 }
    ],
    bonds: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]]
  }
};

let chemistryState = {
  currentMolecule: 'h2o',
  viewMode: 'ball-stick',
  rotation: 0,
  isDragging: false,
  lastX: 0
};

function initChemistryLab() {
  const canvas = document.getElementById('moleculeCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = 400;
  
  // Molecule buttons
  document.querySelectorAll('.molecule-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.molecule-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      chemistryState.currentMolecule = btn.dataset.molecule;
      updateMoleculeProperties();
    });
  });
  
  // View mode
  document.querySelectorAll('.molecule-controls .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.molecule-controls .btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      chemistryState.viewMode = btn.dataset.view;
    });
  });
  
  // Drag to rotate
  canvas.addEventListener('mousedown', (e) => {
    chemistryState.isDragging = true;
    chemistryState.lastX = e.clientX;
  });
  
  canvas.addEventListener('mousemove', (e) => {
    if (chemistryState.isDragging) {
      chemistryState.rotation += (e.clientX - chemistryState.lastX) * 0.02;
      chemistryState.lastX = e.clientX;
    }
  });
  
  canvas.addEventListener('mouseup', () => chemistryState.isDragging = false);
  canvas.addEventListener('mouseleave', () => chemistryState.isDragging = false);
  
  updateMoleculeProperties();
  initPeriodicTable();
  requestAnimationFrame(() => renderMolecule(ctx, canvas));
}

function updateMoleculeProperties() {
  const mol = molecules[chemistryState.currentMolecule];
  document.getElementById('molName').textContent = mol.name;
  document.getElementById('molFormula').textContent = mol.formula;
  document.getElementById('molWeight').textContent = mol.weight;
  document.getElementById('molBonds').textContent = mol.bonds;
  document.getElementById('molAngle').textContent = mol.angle;
  document.getElementById('molPolarity').textContent = mol.polarity;
}

function renderMolecule(ctx, canvas) {
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--card').trim() || '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const mol = molecules[chemistryState.currentMolecule];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Auto-rotate
  if (!chemistryState.isDragging) {
    chemistryState.rotation += 0.01;
  }
  
  // Transform atoms for rotation
  const transformedAtoms = mol.atoms.map(atom => {
    const cos = Math.cos(chemistryState.rotation);
    const sin = Math.sin(chemistryState.rotation);
    return {
      ...atom,
      screenX: centerX + atom.x * cos - atom.z * sin,
      screenY: centerY + atom.y,
      depth: atom.x * sin + atom.z * cos
    };
  });
  
  // Sort by depth
  const sortedAtoms = [...transformedAtoms].sort((a, b) => a.depth - b.depth);
  
  // Draw bonds
  if (chemistryState.viewMode === 'ball-stick') {
    mol.bonds.forEach(([i, j]) => {
      const a1 = transformedAtoms[i];
      const a2 = transformedAtoms[j];
      
      ctx.beginPath();
      ctx.moveTo(a1.screenX, a1.screenY);
      ctx.lineTo(a2.screenX, a2.screenY);
      ctx.strokeStyle = 'hsl(220, 10%, 50%)';
      ctx.lineWidth = 6;
      ctx.stroke();
    });
  }
  
  // Draw atoms
  sortedAtoms.forEach(atom => {
    const scale = chemistryState.viewMode === 'space-fill' ? 1.8 : 1;
    const radius = atom.radius * scale;
    
    const gradient = ctx.createRadialGradient(
      atom.screenX - radius * 0.3,
      atom.screenY - radius * 0.3,
      0,
      atom.screenX,
      atom.screenY,
      radius
    );
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.3, atom.color);
    gradient.addColorStop(1, atom.color.replace('50%', '30%'));
    
    ctx.beginPath();
    ctx.arc(atom.screenX, atom.screenY, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Label
    if (chemistryState.viewMode === 'ball-stick') {
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px Space Grotesk';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(atom.element, atom.screenX, atom.screenY);
    }
  });
  
  requestAnimationFrame(() => renderMolecule(ctx, canvas));
}

// Periodic Table
const elements = [
  { n: 1, s: 'H', name: 'Hydrogen', type: 'nonmetal', row: 1, col: 1 },
  { n: 2, s: 'He', name: 'Helium', type: 'noble', row: 1, col: 18 },
  { n: 3, s: 'Li', name: 'Lithium', type: 'alkali', row: 2, col: 1 },
  { n: 4, s: 'Be', name: 'Beryllium', type: 'alkaline', row: 2, col: 2 },
  { n: 5, s: 'B', name: 'Boron', type: 'basic', row: 2, col: 13 },
  { n: 6, s: 'C', name: 'Carbon', type: 'nonmetal', row: 2, col: 14 },
  { n: 7, s: 'N', name: 'Nitrogen', type: 'nonmetal', row: 2, col: 15 },
  { n: 8, s: 'O', name: 'Oxygen', type: 'nonmetal', row: 2, col: 16 },
  { n: 9, s: 'F', name: 'Fluorine', type: 'halogen', row: 2, col: 17 },
  { n: 10, s: 'Ne', name: 'Neon', type: 'noble', row: 2, col: 18 },
  { n: 11, s: 'Na', name: 'Sodium', type: 'alkali', row: 3, col: 1 },
  { n: 12, s: 'Mg', name: 'Magnesium', type: 'alkaline', row: 3, col: 2 },
  { n: 13, s: 'Al', name: 'Aluminum', type: 'basic', row: 3, col: 13 },
  { n: 14, s: 'Si', name: 'Silicon', type: 'basic', row: 3, col: 14 },
  { n: 15, s: 'P', name: 'Phosphorus', type: 'nonmetal', row: 3, col: 15 },
  { n: 16, s: 'S', name: 'Sulfur', type: 'nonmetal', row: 3, col: 16 },
  { n: 17, s: 'Cl', name: 'Chlorine', type: 'halogen', row: 3, col: 17 },
  { n: 18, s: 'Ar', name: 'Argon', type: 'noble', row: 3, col: 18 },
  { n: 19, s: 'K', name: 'Potassium', type: 'alkali', row: 4, col: 1 },
  { n: 20, s: 'Ca', name: 'Calcium', type: 'alkaline', row: 4, col: 2 }
];

function initPeriodicTable() {
  const table = document.getElementById('periodicTable');
  if (!table) return;
  
  // Create grid
  for (let row = 1; row <= 7; row++) {
    for (let col = 1; col <= 18; col++) {
      const element = elements.find(e => e.row === row && e.col === col);
      
      if (element) {
        const el = document.createElement('div');
        el.className = `element ${element.type}`;
        el.innerHTML = `
          <span class="number">${element.n}</span>
          <span class="symbol">${element.s}</span>
        `;
        el.style.gridColumn = col;
        el.style.gridRow = row;
        el.addEventListener('click', () => showElementInfo(element));
        table.appendChild(el);
      }
    }
  }
}

function showElementInfo(element) {
  const info = document.getElementById('elementInfo');
  info.innerHTML = `
    <h4>${element.name} (${element.s})</h4>
    <p>Atomic Number: ${element.n}</p>
    <p>Type: ${element.type.charAt(0).toUpperCase() + element.type.slice(1)}</p>
  `;
}

// ============================================
// Biology Explorer
// ============================================

const organelleInfo = {
  nucleus: {
    name: 'Nucleus',
    description: 'The control center of the cell, containing DNA and controlling gene expression.',
    function: 'Stores genetic material and coordinates cell activities including growth, metabolism, and reproduction.'
  },
  nucleolus: {
    name: 'Nucleolus',
    description: 'A dense region inside the nucleus.',
    function: 'Produces ribosomal RNA (rRNA) and assembles ribosomes.'
  },
  mitochondria: {
    name: 'Mitochondria',
    description: 'The powerhouse of the cell.',
    function: 'Generates ATP through cellular respiration, converting nutrients into usable energy.'
  },
  er: {
    name: 'Endoplasmic Reticulum',
    description: 'A network of membranes throughout the cytoplasm.',
    function: 'Synthesizes proteins (rough ER) and lipids (smooth ER), and transports materials.'
  },
  golgi: {
    name: 'Golgi Apparatus',
    description: 'A stack of membrane-bound structures.',
    function: 'Modifies, packages, and ships proteins and lipids to their destinations.'
  },
  ribosome: {
    name: 'Ribosome',
    description: 'Small organelles made of RNA and protein.',
    function: 'Synthesizes proteins by translating messenger RNA.'
  },
  lysosome: {
    name: 'Lysosome',
    description: 'Membrane-bound organelles containing digestive enzymes.',
    function: 'Breaks down waste materials and cellular debris through enzymatic digestion.'
  },
  vacuole: {
    name: 'Vacuole',
    description: 'Large membrane-bound storage compartment.',
    function: 'Stores water, nutrients, and waste products; maintains cell pressure.'
  },
  centriole: {
    name: 'Centriole',
    description: 'Cylindrical structures near the nucleus.',
    function: 'Organizes microtubules during cell division and helps form the spindle apparatus.'
  }
};

const quizOrganelles = ['nucleus', 'mitochondria', 'er', 'golgi', 'ribosome', 'lysosome', 'vacuole'];
let biologyState = {
  quizMode: false,
  quizScore: 0,
  quizTotal: 0,
  targetOrganelle: ''
};

function initBiologyExplorer() {
  const organelles = document.querySelectorAll('.organelle');
  
  organelles.forEach(org => {
    org.addEventListener('click', () => {
      const name = org.dataset.organelle;
      
      if (biologyState.quizMode) {
        handleQuizAnswer(name);
      } else {
        showOrganelleInfo(name);
        organelles.forEach(o => o.classList.remove('active'));
        org.classList.add('active');
      }
    });
  });
  
  // Labels toggle
  document.getElementById('showLabels')?.addEventListener('change', (e) => {
    const labels = document.getElementById('cellLabels');
    labels.style.display = e.target.checked ? 'block' : 'none';
  });
  
  // Quiz mode
  document.getElementById('quizMode')?.addEventListener('change', (e) => {
    biologyState.quizMode = e.target.checked;
    document.getElementById('quizPanel').style.display = e.target.checked ? 'block' : 'none';
    
    if (e.target.checked) {
      document.getElementById('showLabels').checked = false;
      document.getElementById('cellLabels').style.display = 'none';
      biologyState.quizScore = 0;
      biologyState.quizTotal = 0;
      nextQuizQuestion();
    }
  });
  
  // Body systems
  document.querySelectorAll('.system-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.system-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // System switching would show different diagrams - simplified for this version
    });
  });
}

function showOrganelleInfo(name) {
  const info = organelleInfo[name];
  if (!info) return;
  
  const panel = document.getElementById('organelleInfo');
  panel.innerHTML = `
    <h3>${info.name}</h3>
    <p>${info.description}</p>
    <p><strong>Function:</strong> ${info.function}</p>
  `;
}

function handleQuizAnswer(answer) {
  biologyState.quizTotal++;
  
  if (answer === biologyState.targetOrganelle) {
    biologyState.quizScore++;
    // Visual feedback
    document.querySelector(`[data-organelle="${answer}"]`).style.stroke = 'green';
  } else {
    document.querySelector(`[data-organelle="${answer}"]`).style.stroke = 'red';
    document.querySelector(`[data-organelle="${biologyState.targetOrganelle}"]`).style.stroke = 'green';
  }
  
  document.getElementById('quizScore').textContent = biologyState.quizScore;
  document.getElementById('quizTotal').textContent = biologyState.quizTotal;
  
  setTimeout(() => {
    document.querySelectorAll('.organelle').forEach(o => o.style.stroke = '');
    nextQuizQuestion();
  }, 1000);
}

function nextQuizQuestion() {
  const random = quizOrganelles[Math.floor(Math.random() * quizOrganelles.length)];
  biologyState.targetOrganelle = random;
  const info = organelleInfo[random];
  document.getElementById('targetOrganelle').textContent = info.name;
}

// ============================================
// Concept Graph
// ============================================

const concepts = [
  { id: 'motion', name: 'Motion', subject: 'physics', prereqs: [] },
  { id: 'forces', name: 'Forces', subject: 'physics', prereqs: ['motion'] },
  { id: 'energy', name: 'Energy', subject: 'physics', prereqs: ['forces'] },
  { id: 'waves', name: 'Waves', subject: 'physics', prereqs: ['energy'] },
  { id: 'atoms', name: 'Atomic Structure', subject: 'chemistry', prereqs: [] },
  { id: 'bonds', name: 'Chemical Bonds', subject: 'chemistry', prereqs: ['atoms'] },
  { id: 'reactions', name: 'Chemical Reactions', subject: 'chemistry', prereqs: ['bonds', 'energy'] },
  { id: 'acids', name: 'Acids & Bases', subject: 'chemistry', prereqs: ['reactions'] },
  { id: 'cells', name: 'Cell Structure', subject: 'biology', prereqs: [] },
  { id: 'dna', name: 'DNA & Genetics', subject: 'biology', prereqs: ['cells'] },
  { id: 'respiration', name: 'Cellular Respiration', subject: 'biology', prereqs: ['cells', 'reactions'] },
  { id: 'photosynthesis', name: 'Photosynthesis', subject: 'biology', prereqs: ['respiration', 'energy'] },
  { id: 'thermodynamics', name: 'Thermodynamics', subject: 'physics', prereqs: ['energy'] },
  { id: 'metabolism', name: 'Metabolism', subject: 'biology', prereqs: ['respiration', 'thermodynamics'] },
  { id: 'enzymes', name: 'Enzymes', subject: 'biology', prereqs: ['reactions', 'metabolism'] }
];

let conceptState = {
  selected: null,
  filter: 'all',
  progress: JSON.parse(localStorage.getItem('sciscape-concept-progress') || '{}'),
  nodes: []
};

function initConceptGraph() {
  const canvas = document.getElementById('conceptGraph');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 800;
  canvas.height = 600;
  
  // Position nodes
  positionNodes(canvas);
  
  // Render list
  renderConceptList();
  
  // Search
  document.getElementById('conceptSearch')?.addEventListener('input', (e) => {
    renderConceptList(e.target.value);
  });
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      conceptState.filter = btn.dataset.filter;
      renderConceptList();
    });
  });
  
  // Progress buttons
  document.querySelectorAll('.progress-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!conceptState.selected) return;
      
      document.querySelectorAll('.progress-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      conceptState.progress[conceptState.selected] = btn.dataset.status;
      localStorage.setItem('sciscape-concept-progress', JSON.stringify(conceptState.progress));
      renderConceptList();
    });
  });
  
  // Canvas click
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    conceptState.nodes.forEach(node => {
      const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      if (dist < 30) {
        selectConcept(node.id);
      }
    });
  });
  
  requestAnimationFrame(() => renderConceptGraph(ctx, canvas));
}

function positionNodes(canvas) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  concepts.forEach((concept, i) => {
    const angle = (i / concepts.length) * Math.PI * 2;
    const radius = 200;
    
    conceptState.nodes.push({
      ...concept,
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    });
  });
}

function renderConceptList(search = '') {
  const list = document.getElementById('conceptsList');
  if (!list) return;
  
  list.innerHTML = '';
  
  concepts
    .filter(c => {
      if (conceptState.filter !== 'all' && c.subject !== conceptState.filter) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    })
    .forEach(concept => {
      const status = conceptState.progress[concept.id] || 'not-started';
      const item = document.createElement('div');
      item.className = `concept-item ${concept.subject}`;
      item.innerHTML = `
        <span class="concept-status ${status}"></span>
        <span>${concept.name}</span>
      `;
      item.addEventListener('click', () => selectConcept(concept.id));
      list.appendChild(item);
    });
}

function selectConcept(id) {
  conceptState.selected = id;
  const concept = concepts.find(c => c.id === id);
  if (!concept) return;
  
  document.getElementById('conceptTitle').textContent = concept.name;
  document.getElementById('conceptDescription').textContent = `Learn about ${concept.name.toLowerCase()} and its applications.`;
  
  const subjectEl = document.getElementById('conceptSubject');
  subjectEl.textContent = concept.subject.charAt(0).toUpperCase() + concept.subject.slice(1);
  subjectEl.style.background = `var(--${concept.subject})`;
  subjectEl.style.color = 'white';
  
  // Update progress buttons
  const status = conceptState.progress[id] || 'not-started';
  document.querySelectorAll('.progress-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.status === status);
  });
  
  // Prerequisites
  const prereqs = document.getElementById('conceptPrereqs');
  if (concept.prereqs.length > 0) {
    const prereqNames = concept.prereqs.map(p => concepts.find(c => c.id === p)?.name || p);
    prereqs.innerHTML = `<p><strong>Prerequisites:</strong> ${prereqNames.join(', ')}</p>`;
  } else {
    prereqs.innerHTML = '<p><strong>Prerequisites:</strong> None</p>';
  }
}

function renderConceptGraph(ctx, canvas) {
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--card').trim() || '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const colors = {
    physics: 'hsl(250, 89%, 62%)',
    chemistry: 'hsl(150, 70%, 45%)',
    biology: 'hsl(340, 75%, 55%)'
  };
  
  // Draw connections
  conceptState.nodes.forEach(node => {
    node.prereqs.forEach(prereqId => {
      const prereq = conceptState.nodes.find(n => n.id === prereqId);
      if (prereq) {
        ctx.beginPath();
        ctx.moveTo(prereq.x, prereq.y);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = 'rgba(128, 128, 128, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  });
  
  // Draw nodes
  conceptState.nodes.forEach(node => {
    const isSelected = conceptState.selected === node.id;
    const status = conceptState.progress[node.id] || 'not-started';
    
    // Node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, isSelected ? 35 : 25, 0, Math.PI * 2);
    ctx.fillStyle = colors[node.subject];
    ctx.fill();
    
    if (status === 'learned') {
      ctx.strokeStyle = 'hsl(150, 70%, 45%)';
      ctx.lineWidth = 4;
      ctx.stroke();
    } else if (status === 'in-progress') {
      ctx.strokeStyle = 'hsl(45, 90%, 55%)';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    
    // Label
    ctx.fillStyle = 'white';
    ctx.font = '10px Space Grotesk';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const words = node.name.split(' ');
    if (words.length > 1) {
      ctx.fillText(words[0], node.x, node.y - 5);
      ctx.fillText(words.slice(1).join(' '), node.x, node.y + 7);
    } else {
      ctx.fillText(node.name, node.x, node.y);
    }
  });
  
  requestAnimationFrame(() => renderConceptGraph(ctx, canvas));
}

// ============================================
// Dashboard
// ============================================

function initDashboard() {
  updateDashboard();
}

function updateDashboard() {
  const experiments = JSON.parse(localStorage.getItem('sciscape-experiments') || '[]');
  const progress = JSON.parse(localStorage.getItem('sciscape-concept-progress') || '{}');
  
  const learned = Object.values(progress).filter(p => p === 'learned').length;
  
  document.getElementById('experimentsSaved').textContent = experiments.length;
  document.getElementById('conceptsLearned').textContent = learned;
  
  // Update experiments list
  const list = document.getElementById('experimentsList');
  if (experiments.length > 0) {
    list.innerHTML = experiments.map(exp => `
      <div class="activity-item">
        <span class="activity-icon">⚡</span>
        <span class="activity-text">${exp.name}</span>
        <span class="activity-time">${new Date(exp.date).toLocaleDateString()}</span>
      </div>
    `).join('');
  }
}
