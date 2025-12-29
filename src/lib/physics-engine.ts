export interface PhysicsState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  mass: number;
  time: number;
  trail: Array<{ x: number; y: number }>;
}

export interface PhysicsConfig {
  gravity: number;
  airResistance: number;
  bounciness: number;
  groundY: number;
  maxTrailLength: number;
}

export interface EnvironmentPreset {
  name: string;
  gravity: number;
  description: string;
}

export const ENVIRONMENT_PRESETS: EnvironmentPreset[] = [
  { name: 'Earth', gravity: 9.81, description: 'Standard Earth gravity' },
  { name: 'Moon', gravity: 1.62, description: 'Lunar surface gravity' },
  { name: 'Mars', gravity: 3.71, description: 'Martian surface gravity' },
  { name: 'Jupiter', gravity: 24.79, description: 'Jupiter surface gravity' },
  { name: 'Zero-G', gravity: 0, description: 'No gravity (space)' },
  { name: 'Custom', gravity: 9.81, description: 'Set your own value' },
];

export function createInitialState(
  startX: number = 0,
  startY: number = 5,
  velocityX: number = 0,
  velocityY: number = 0,
  mass: number = 1
): PhysicsState {
  return {
    position: { x: startX, y: startY },
    velocity: { x: velocityX, y: velocityY },
    acceleration: { x: 0, y: 0 },
    mass,
    time: 0,
    trail: [{ x: startX, y: startY }],
  };
}

export function updatePhysics(
  state: PhysicsState,
  config: PhysicsConfig,
  dt: number
): PhysicsState {
  const newState = { ...state };
  
  // Calculate acceleration (gravity + air resistance)
  const dragForce = {
    x: -config.airResistance * state.velocity.x * Math.abs(state.velocity.x),
    y: -config.airResistance * state.velocity.y * Math.abs(state.velocity.y),
  };
  
  newState.acceleration = {
    x: dragForce.x / state.mass,
    y: -config.gravity + dragForce.y / state.mass,
  };
  
  // Update velocity
  newState.velocity = {
    x: state.velocity.x + newState.acceleration.x * dt,
    y: state.velocity.y + newState.acceleration.y * dt,
  };
  
  // Update position
  newState.position = {
    x: state.position.x + newState.velocity.x * dt,
    y: state.position.y + newState.velocity.y * dt,
  };
  
  // Ground collision
  if (newState.position.y <= config.groundY) {
    newState.position.y = config.groundY;
    newState.velocity.y = -newState.velocity.y * config.bounciness;
    newState.velocity.x *= 0.95; // Friction on ground
    
    // Stop if velocity is very small
    if (Math.abs(newState.velocity.y) < 0.1) {
      newState.velocity.y = 0;
    }
  }
  
  // Wall boundaries
  if (newState.position.x < -10) {
    newState.position.x = -10;
    newState.velocity.x = -newState.velocity.x * config.bounciness;
  }
  if (newState.position.x > 10) {
    newState.position.x = 10;
    newState.velocity.x = -newState.velocity.x * config.bounciness;
  }
  
  // Update trail
  newState.trail = [...state.trail, { x: newState.position.x, y: newState.position.y }];
  if (newState.trail.length > config.maxTrailLength) {
    newState.trail = newState.trail.slice(-config.maxTrailLength);
  }
  
  // Update time
  newState.time = state.time + dt;
  
  return newState;
}

export interface SavedExperiment {
  id: string;
  name: string;
  createdAt: string;
  config: PhysicsConfig;
  initialState: {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    mass: number;
  };
  dataPoints: Array<{
    time: number;
    position: number;
    velocity: number;
  }>;
}
