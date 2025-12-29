export type ConceptStatus = 'not-started' | 'in-progress' | 'learned';
export type Subject = 'physics' | 'chemistry' | 'biology';

export interface Concept {
  id: string;
  name: string;
  subject: Subject;
  description: string;
  prerequisites: string[];
  relatedConcepts: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  keyPoints: string[];
  labLink?: string;
}

export const CONCEPTS: Concept[] = [
  // Physics
  {
    id: 'motion',
    name: 'Motion',
    subject: 'physics',
    description: 'The study of objects in movement, including position, velocity, and acceleration.',
    prerequisites: [],
    relatedConcepts: ['forces', 'energy', 'vectors'],
    difficulty: 'beginner',
    keyPoints: [
      'Position describes where an object is',
      'Velocity is the rate of change of position',
      'Acceleration is the rate of change of velocity',
    ],
    labLink: '/physics',
  },
  {
    id: 'forces',
    name: 'Forces',
    subject: 'physics',
    description: 'Interactions that cause objects to change their motion state.',
    prerequisites: ['motion'],
    relatedConcepts: ['motion', 'energy', 'gravity'],
    difficulty: 'beginner',
    keyPoints: [
      'Force = Mass × Acceleration (F=ma)',
      'Forces are vectors with magnitude and direction',
      'Net force determines acceleration',
    ],
    labLink: '/physics',
  },
  {
    id: 'energy',
    name: 'Energy',
    subject: 'physics',
    description: 'The capacity to do work, existing in kinetic, potential, and other forms.',
    prerequisites: ['motion', 'forces'],
    relatedConcepts: ['forces', 'thermodynamics', 'waves'],
    difficulty: 'intermediate',
    keyPoints: [
      'Energy is conserved (cannot be created or destroyed)',
      'Kinetic energy = ½mv²',
      'Potential energy depends on position',
    ],
    labLink: '/physics',
  },
  {
    id: 'waves',
    name: 'Waves',
    subject: 'physics',
    description: 'Disturbances that transfer energy through matter or space.',
    prerequisites: ['energy'],
    relatedConcepts: ['energy', 'light', 'sound'],
    difficulty: 'intermediate',
    keyPoints: [
      'Waves have frequency, wavelength, and amplitude',
      'Wave speed = frequency × wavelength',
      'Waves can be transverse or longitudinal',
    ],
    labLink: '/physics',
  },
  {
    id: 'electricity',
    name: 'Electricity',
    subject: 'physics',
    description: 'The flow of electric charge and its effects.',
    prerequisites: ['energy', 'forces'],
    relatedConcepts: ['magnetism', 'energy', 'atoms'],
    difficulty: 'intermediate',
    keyPoints: [
      'Current is the flow of electrons',
      'Voltage is electrical pressure',
      'Ohm\'s Law: V = IR',
    ],
    labLink: '/physics',
  },
  // Chemistry
  {
    id: 'atoms',
    name: 'Atoms',
    subject: 'chemistry',
    description: 'The basic building blocks of matter, made of protons, neutrons, and electrons.',
    prerequisites: [],
    relatedConcepts: ['elements', 'bonds', 'electrons'],
    difficulty: 'beginner',
    keyPoints: [
      'Atoms have a nucleus with protons and neutrons',
      'Electrons orbit the nucleus in shells',
      'Atomic number = number of protons',
    ],
    labLink: '/chemistry',
  },
  {
    id: 'bonds',
    name: 'Chemical Bonds',
    subject: 'chemistry',
    description: 'Forces that hold atoms together to form molecules and compounds.',
    prerequisites: ['atoms'],
    relatedConcepts: ['atoms', 'molecules', 'reactions'],
    difficulty: 'beginner',
    keyPoints: [
      'Ionic bonds: electron transfer',
      'Covalent bonds: electron sharing',
      'Bond strength affects molecular properties',
    ],
    labLink: '/chemistry',
  },
  {
    id: 'molecules',
    name: 'Molecules',
    subject: 'chemistry',
    description: 'Groups of atoms bonded together, the smallest unit of a compound.',
    prerequisites: ['atoms', 'bonds'],
    relatedConcepts: ['bonds', 'reactions', 'organic'],
    difficulty: 'beginner',
    keyPoints: [
      'Molecular formula shows atom count',
      'Molecular geometry affects properties',
      'Polarity determines solubility',
    ],
    labLink: '/chemistry',
  },
  {
    id: 'reactions',
    name: 'Chemical Reactions',
    subject: 'chemistry',
    description: 'Processes that transform reactants into products by breaking and forming bonds.',
    prerequisites: ['bonds', 'molecules'],
    relatedConcepts: ['bonds', 'energy', 'thermodynamics'],
    difficulty: 'intermediate',
    keyPoints: [
      'Reactions conserve mass and atoms',
      'Activation energy starts reactions',
      'Catalysts speed up reactions',
    ],
    labLink: '/chemistry',
  },
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    subject: 'chemistry',
    description: 'The study of energy changes in chemical and physical processes.',
    prerequisites: ['energy', 'reactions'],
    relatedConcepts: ['energy', 'reactions', 'metabolism'],
    difficulty: 'advanced',
    keyPoints: [
      'Enthalpy measures heat content',
      'Entropy measures disorder',
      'Gibbs free energy predicts spontaneity',
    ],
    labLink: '/chemistry',
  },
  // Biology
  {
    id: 'cells',
    name: 'Cells',
    subject: 'biology',
    description: 'The basic structural and functional units of all living organisms.',
    prerequisites: ['molecules'],
    relatedConcepts: ['organelles', 'dna', 'membrane'],
    difficulty: 'beginner',
    keyPoints: [
      'All living things are made of cells',
      'Prokaryotes lack a nucleus',
      'Eukaryotes have membrane-bound organelles',
    ],
    labLink: '/biology',
  },
  {
    id: 'dna',
    name: 'DNA & Genetics',
    subject: 'biology',
    description: 'The molecular basis of heredity and how traits are passed on.',
    prerequisites: ['cells', 'molecules'],
    relatedConcepts: ['cells', 'proteins', 'evolution'],
    difficulty: 'intermediate',
    keyPoints: [
      'DNA is a double helix of nucleotides',
      'Genes code for proteins',
      'DNA replication is semi-conservative',
    ],
    labLink: '/biology',
  },
  {
    id: 'metabolism',
    name: 'Metabolism',
    subject: 'biology',
    description: 'All chemical reactions in an organism that sustain life.',
    prerequisites: ['cells', 'reactions', 'energy'],
    relatedConcepts: ['thermodynamics', 'enzymes', 'respiration'],
    difficulty: 'intermediate',
    keyPoints: [
      'Catabolism breaks down molecules',
      'Anabolism builds molecules',
      'ATP is the energy currency',
    ],
    labLink: '/biology',
  },
  {
    id: 'evolution',
    name: 'Evolution',
    subject: 'biology',
    description: 'Change in heritable characteristics of populations over generations.',
    prerequisites: ['dna', 'cells'],
    relatedConcepts: ['dna', 'ecology', 'genetics'],
    difficulty: 'advanced',
    keyPoints: [
      'Natural selection drives evolution',
      'Mutations provide genetic variation',
      'Species adapt to their environment',
    ],
  },
  {
    id: 'ecology',
    name: 'Ecology',
    subject: 'biology',
    description: 'The study of interactions between organisms and their environment.',
    prerequisites: ['cells', 'metabolism'],
    relatedConcepts: ['evolution', 'ecosystems', 'metabolism'],
    difficulty: 'intermediate',
    keyPoints: [
      'Ecosystems include biotic and abiotic factors',
      'Energy flows through food webs',
      'Matter cycles through ecosystems',
    ],
  },
];

export function getConceptById(id: string): Concept | undefined {
  return CONCEPTS.find(c => c.id === id);
}

export function getConceptsBySubject(subject: Subject): Concept[] {
  return CONCEPTS.filter(c => c.subject === subject);
}

export function getPrerequisites(conceptId: string): Concept[] {
  const concept = getConceptById(conceptId);
  if (!concept) return [];
  return concept.prerequisites.map(id => getConceptById(id)).filter(Boolean) as Concept[];
}

export function getRelatedConcepts(conceptId: string): Concept[] {
  const concept = getConceptById(conceptId);
  if (!concept) return [];
  return concept.relatedConcepts.map(id => getConceptById(id)).filter(Boolean) as Concept[];
}
