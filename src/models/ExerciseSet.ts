export interface ExerciseSet {
  id: number;
  exerciseId: number;
  userId: string;
  reps: number;
  weight: string;
  createdAt: string;
}

export interface ExerciseSetMerged extends ExerciseSet {
  merged?: boolean;
  count?: number;
}
