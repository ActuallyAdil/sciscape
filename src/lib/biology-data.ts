export interface Organelle {
  id: string;
  name: string;
  description: string;
  function: string;
  color: string;
  funFact: string;
}

export const ORGANELLES: Organelle[] = [
  {
    id: 'nucleus',
    name: 'Nucleus',
    description: 'The control center of the cell, containing genetic material (DNA).',
    function: 'Controls cell activities and stores genetic information in chromosomes.',
    color: '#8b5cf6',
    funFact: 'The nucleus contains about 6 feet (2 meters) of DNA packed into a space just 6 micrometers wide!',
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    description: 'Rod-shaped organelles that generate most of the cell\'s ATP.',
    function: 'Produces ATP through cellular respiration, converting glucose and oxygen into energy.',
    color: '#22c55e',
    funFact: 'Mitochondria have their own DNA and are believed to have been free-living bacteria billions of years ago!',
  },
  {
    id: 'ribosome',
    name: 'Ribosome',
    description: 'Small structures that synthesize proteins from amino acids.',
    function: 'Reads mRNA and assembles amino acids into proteins.',
    color: '#f59e0b',
    funFact: 'A single cell can contain up to 10 million ribosomes!',
  },
  {
    id: 'er',
    name: 'Endoplasmic Reticulum',
    description: 'A network of membranes involved in protein and lipid synthesis.',
    function: 'Rough ER makes proteins; Smooth ER synthesizes lipids and detoxifies.',
    color: '#3b82f6',
    funFact: 'If you stretched out all the ER in one cell, it would be about 10x the cell\'s diameter!',
  },
  {
    id: 'golgi',
    name: 'Golgi Apparatus',
    description: 'Stacks of membrane sacs that modify, sort, and package proteins.',
    function: 'Modifies proteins from the ER and packages them for secretion or use in the cell.',
    color: '#ec4899',
    funFact: 'Named after Camillo Golgi, who discovered it in 1898!',
  },
  {
    id: 'membrane',
    name: 'Cell Membrane',
    description: 'The outer boundary that controls what enters and exits the cell.',
    function: 'Regulates transport of molecules, receives signals, and maintains cell shape.',
    color: '#f43f5e',
    funFact: 'The cell membrane is about 7-8 nanometers thick - 10,000 times thinner than a human hair!',
  },
  {
    id: 'lysosome',
    name: 'Lysosome',
    description: 'Membrane-bound organelles containing digestive enzymes.',
    function: 'Breaks down waste materials, cellular debris, and foreign invaders.',
    color: '#14b8a6',
    funFact: 'Lysosomes contain over 50 different enzymes that work best in acidic conditions!',
  },
  {
    id: 'cytoplasm',
    name: 'Cytoplasm',
    description: 'The gel-like fluid filling the cell between the membrane and nucleus.',
    function: 'Provides medium for organelles, supports cell shape, and hosts metabolic reactions.',
    color: '#94a3b8',
    funFact: 'The cytoplasm is about 80% water and constantly flowing inside the cell!',
  },
];

export interface BodySystem {
  id: string;
  name: string;
  description: string;
  organs: OrganInfo[];
  color: string;
}

export interface OrganInfo {
  id: string;
  name: string;
  description: string;
  function: string;
}

export const BODY_SYSTEMS: BodySystem[] = [
  {
    id: 'skeletal',
    name: 'Skeletal System',
    description: 'The framework of bones and cartilage that supports and protects the body.',
    color: '#e2e8f0',
    organs: [
      { id: 'skull', name: 'Skull', description: 'Protects the brain', function: 'Protection of the central nervous system' },
      { id: 'spine', name: 'Spine', description: '33 vertebrae forming the backbone', function: 'Support, protection of spinal cord, flexibility' },
      { id: 'ribs', name: 'Rib Cage', description: '12 pairs of ribs', function: 'Protects heart and lungs' },
      { id: 'pelvis', name: 'Pelvis', description: 'Hip bones', function: 'Supports upper body, protects organs' },
      { id: 'femur', name: 'Femur', description: 'Thigh bone - longest bone', function: 'Supports body weight, enables walking' },
    ],
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    description: 'The heart and blood vessels that transport blood throughout the body.',
    color: '#ef4444',
    organs: [
      { id: 'heart', name: 'Heart', description: 'Muscular pump', function: 'Pumps blood through the body' },
      { id: 'arteries', name: 'Arteries', description: 'Blood vessels from heart', function: 'Carry oxygenated blood away from heart' },
      { id: 'veins', name: 'Veins', description: 'Blood vessels to heart', function: 'Return deoxygenated blood to heart' },
      { id: 'capillaries', name: 'Capillaries', description: 'Tiny blood vessels', function: 'Exchange of gases and nutrients' },
    ],
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'The brain, spinal cord, and nerves that control body functions.',
    color: '#eab308',
    organs: [
      { id: 'brain', name: 'Brain', description: 'Control center', function: 'Processes information, controls body functions' },
      { id: 'spinalcord', name: 'Spinal Cord', description: 'Neural pathway', function: 'Transmits signals between brain and body' },
      { id: 'nerves', name: 'Peripheral Nerves', description: 'Network throughout body', function: 'Carry signals to and from CNS' },
    ],
  },
];

export interface QuizQuestion {
  id: string;
  question: string;
  targetId: string;
  hint: string;
  subject: 'cell' | 'body';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Cell questions
  { id: 'q1', question: 'Click on the "powerhouse of the cell"', targetId: 'mitochondria', hint: 'It produces ATP', subject: 'cell' },
  { id: 'q2', question: 'Click on the organelle that contains DNA', targetId: 'nucleus', hint: 'It\'s the control center', subject: 'cell' },
  { id: 'q3', question: 'Click on where proteins are made', targetId: 'ribosome', hint: 'Small yellow dots', subject: 'cell' },
  { id: 'q4', question: 'Click on the cell\'s outer boundary', targetId: 'membrane', hint: 'Controls what enters and exits', subject: 'cell' },
  { id: 'q5', question: 'Click on the organelle that packages proteins', targetId: 'golgi', hint: 'Looks like stacked pancakes', subject: 'cell' },
  // Body questions
  { id: 'q6', question: 'Click on the organ that pumps blood', targetId: 'heart', hint: 'Located in the chest', subject: 'body' },
  { id: 'q7', question: 'Click on the longest bone in the body', targetId: 'femur', hint: 'In the upper leg', subject: 'body' },
  { id: 'q8', question: 'Click on the control center of the nervous system', targetId: 'brain', hint: 'Inside the skull', subject: 'body' },
];
