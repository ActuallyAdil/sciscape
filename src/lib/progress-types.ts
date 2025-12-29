export interface UserProgress {
  conceptProgress: Record<string, 'not-started' | 'in-progress' | 'learned'>;
  completedExperiments: string[];
  activityLog: ActivityEntry[];
  streak: StreakData;
  stats: UserStats;
}

export interface ActivityEntry {
  id: string;
  type: 'experiment' | 'concept' | 'note' | 'quiz';
  description: string;
  timestamp: string;
  details?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface UserStats {
  experimentsRun: number;
  conceptsLearned: number;
  notesCreated: number;
  quizzesPassed: number;
  totalTimeSpent: number; // in minutes
}

export function createInitialProgress(): UserProgress {
  return {
    conceptProgress: {},
    completedExperiments: [],
    activityLog: [],
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: new Date().toISOString().split('T')[0],
    },
    stats: {
      experimentsRun: 0,
      conceptsLearned: 0,
      notesCreated: 0,
      quizzesPassed: 0,
      totalTimeSpent: 0,
    },
  };
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (progress.streak.lastActiveDate === today) {
    return progress;
  }
  
  let newStreak = progress.streak.currentStreak;
  
  if (progress.streak.lastActiveDate === yesterday) {
    newStreak += 1;
  } else if (progress.streak.lastActiveDate !== today) {
    newStreak = 1;
  }
  
  return {
    ...progress,
    streak: {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, progress.streak.longestStreak),
      lastActiveDate: today,
    },
  };
}

export function addActivity(
  progress: UserProgress,
  type: ActivityEntry['type'],
  description: string,
  details?: string
): UserProgress {
  const entry: ActivityEntry = {
    id: `activity-${Date.now()}`,
    type,
    description,
    timestamp: new Date().toISOString(),
    details,
  };
  
  return {
    ...progress,
    activityLog: [entry, ...progress.activityLog].slice(0, 100), // Keep last 100 activities
  };
}
