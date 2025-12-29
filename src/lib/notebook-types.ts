export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  linkedExperiment?: string;
  linkedConcept?: string;
  tags: string[];
  screenshot?: string;
}

export interface NotebookState {
  notes: Note[];
  activeNoteId: string | null;
}

export function createNote(title: string = 'Untitled Note'): Note {
  const now = new Date().toISOString();
  return {
    id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    content: '',
    createdAt: now,
    updatedAt: now,
    tags: [],
  };
}
