export interface Atom {
  element: string;
  position: [number, number, number];
  color: string;
  radius: number;
}

export interface Bond {
  from: number;
  to: number;
  order: number; // 1 = single, 2 = double, 3 = triple
}

export interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  description: string;
  atoms: Atom[];
  bonds: Bond[];
  bondAngles: string[];
  molecularWeight: number;
  properties: {
    state: string;
    boilingPoint: string;
    meltingPoint: string;
  };
}

const ELEMENT_COLORS: Record<string, string> = {
  H: '#FFFFFF',
  C: '#404040',
  O: '#FF0000',
  N: '#3050F8',
  S: '#FFFF30',
  P: '#FF8000',
  Cl: '#1FF01F',
  Br: '#A62929',
};

const ELEMENT_RADII: Record<string, number> = {
  H: 0.25,
  C: 0.35,
  O: 0.35,
  N: 0.35,
  S: 0.40,
  P: 0.38,
  Cl: 0.38,
  Br: 0.40,
};

export const MOLECULES: MoleculeData[] = [
  {
    id: 'water',
    name: 'Water',
    formula: 'H₂O',
    description: 'Essential for life, the universal solvent',
    molecularWeight: 18.015,
    bondAngles: ['104.5° (H-O-H)'],
    properties: {
      state: 'Liquid (at room temp)',
      boilingPoint: '100°C',
      meltingPoint: '0°C',
    },
    atoms: [
      { element: 'O', position: [0, 0, 0], color: ELEMENT_COLORS.O, radius: ELEMENT_RADII.O },
      { element: 'H', position: [-0.76, -0.58, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [0.76, -0.58, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
    ],
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    formula: 'CO₂',
    description: 'Greenhouse gas, used in photosynthesis',
    molecularWeight: 44.01,
    bondAngles: ['180° (O-C-O, linear)'],
    properties: {
      state: 'Gas (at room temp)',
      boilingPoint: '-78.5°C (sublimes)',
      meltingPoint: '-56.6°C',
    },
    atoms: [
      { element: 'C', position: [0, 0, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      { element: 'O', position: [-1.16, 0, 0], color: ELEMENT_COLORS.O, radius: ELEMENT_RADII.O },
      { element: 'O', position: [1.16, 0, 0], color: ELEMENT_COLORS.O, radius: ELEMENT_RADII.O },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
      { from: 0, to: 2, order: 2 },
    ],
  },
  {
    id: 'methane',
    name: 'Methane',
    formula: 'CH₄',
    description: 'Simplest hydrocarbon, natural gas component',
    molecularWeight: 16.04,
    bondAngles: ['109.5° (H-C-H, tetrahedral)'],
    properties: {
      state: 'Gas (at room temp)',
      boilingPoint: '-161.5°C',
      meltingPoint: '-182.5°C',
    },
    atoms: [
      { element: 'C', position: [0, 0, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      { element: 'H', position: [0.63, 0.63, 0.63], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [-0.63, -0.63, 0.63], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [-0.63, 0.63, -0.63], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [0.63, -0.63, -0.63], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
      { from: 0, to: 4, order: 1 },
    ],
  },
  {
    id: 'ammonia',
    name: 'Ammonia',
    formula: 'NH₃',
    description: 'Pungent gas used in fertilizers',
    molecularWeight: 17.03,
    bondAngles: ['107° (H-N-H, trigonal pyramidal)'],
    properties: {
      state: 'Gas (at room temp)',
      boilingPoint: '-33.3°C',
      meltingPoint: '-77.7°C',
    },
    atoms: [
      { element: 'N', position: [0, 0.15, 0], color: ELEMENT_COLORS.N, radius: ELEMENT_RADII.N },
      { element: 'H', position: [0, -0.4, 0.94], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [0.81, -0.4, -0.47], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [-0.81, -0.4, -0.47], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
    ],
    bonds: [
      { from: 0, to: 1, order: 1 },
      { from: 0, to: 2, order: 1 },
      { from: 0, to: 3, order: 1 },
    ],
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    formula: 'O₂',
    description: 'Essential for respiration, 21% of atmosphere',
    molecularWeight: 32.00,
    bondAngles: ['180° (linear)'],
    properties: {
      state: 'Gas (at room temp)',
      boilingPoint: '-183°C',
      meltingPoint: '-218.8°C',
    },
    atoms: [
      { element: 'O', position: [-0.6, 0, 0], color: ELEMENT_COLORS.O, radius: ELEMENT_RADII.O },
      { element: 'O', position: [0.6, 0, 0], color: ELEMENT_COLORS.O, radius: ELEMENT_RADII.O },
    ],
    bonds: [
      { from: 0, to: 1, order: 2 },
    ],
  },
  {
    id: 'nitrogen',
    name: 'Nitrogen',
    formula: 'N₂',
    description: '78% of atmosphere, very stable triple bond',
    molecularWeight: 28.01,
    bondAngles: ['180° (linear)'],
    properties: {
      state: 'Gas (at room temp)',
      boilingPoint: '-195.8°C',
      meltingPoint: '-210°C',
    },
    atoms: [
      { element: 'N', position: [-0.55, 0, 0], color: ELEMENT_COLORS.N, radius: ELEMENT_RADII.N },
      { element: 'N', position: [0.55, 0, 0], color: ELEMENT_COLORS.N, radius: ELEMENT_RADII.N },
    ],
    bonds: [
      { from: 0, to: 1, order: 3 },
    ],
  },
  {
    id: 'benzene',
    name: 'Benzene',
    formula: 'C₆H₆',
    description: 'Aromatic ring, basis of organic chemistry',
    molecularWeight: 78.11,
    bondAngles: ['120° (all angles, planar hexagon)'],
    properties: {
      state: 'Liquid (at room temp)',
      boilingPoint: '80.1°C',
      meltingPoint: '5.5°C',
    },
    atoms: [
      // Carbon ring
      { element: 'C', position: [1.4, 0, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      { element: 'C', position: [0.7, 1.21, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      { element: 'C', position: [-0.7, 1.21, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      { element: 'C', position: [-1.4, 0, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      { element: 'C', position: [-0.7, -1.21, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      { element: 'C', position: [0.7, -1.21, 0], color: ELEMENT_COLORS.C, radius: ELEMENT_RADII.C },
      // Hydrogens
      { element: 'H', position: [2.48, 0, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [1.24, 2.15, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [-1.24, 2.15, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [-2.48, 0, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [-1.24, -2.15, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
      { element: 'H', position: [1.24, -2.15, 0], color: ELEMENT_COLORS.H, radius: ELEMENT_RADII.H },
    ],
    bonds: [
      // C-C ring (alternating single/double for visualization)
      { from: 0, to: 1, order: 2 },
      { from: 1, to: 2, order: 1 },
      { from: 2, to: 3, order: 2 },
      { from: 3, to: 4, order: 1 },
      { from: 4, to: 5, order: 2 },
      { from: 5, to: 0, order: 1 },
      // C-H bonds
      { from: 0, to: 6, order: 1 },
      { from: 1, to: 7, order: 1 },
      { from: 2, to: 8, order: 1 },
      { from: 3, to: 9, order: 1 },
      { from: 4, to: 10, order: 1 },
      { from: 5, to: 11, order: 1 },
    ],
  },
];

export function getMoleculeById(id: string): MoleculeData | undefined {
  return MOLECULES.find(m => m.id === id);
}
