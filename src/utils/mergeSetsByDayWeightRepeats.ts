import { ExerciseSet, ExerciseSetMerged } from '../models/ExerciseSet';

/**
 * Merge sets by same date (YYYY-MM-DD), weight and repeats.
 * Keeps one object per group, adds `merged: true` and `count`.
 */
export function mergeSetsByDayWeightRepeats(
  sets: ExerciseSet[]
): ExerciseSetMerged[] {
  const grouped = new Map<string, ExerciseSet[]>();

  for (const set of sets) {
    let createdAt = set.createdAt as string | Date;

    if (typeof createdAt === 'string') {
      createdAt = createdAt.split('T')[0]; // Extract YYYY-MM-DD from ISO date string
    }

    if (createdAt instanceof Date) {
      const year = createdAt.getFullYear();
      const month = String(createdAt.getMonth() + 1).padStart(2, '0');
      const day = String(createdAt.getDate()).padStart(2, '0');
      createdAt = `${year}-${month}-${day}`;
    }

    const key = `${createdAt}-${set.weight}-${set.reps}`;

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }

    grouped.get(key)!.push(set);
  }

  const result: ExerciseSetMerged[] = [];

  for (const [_, group] of grouped.entries()) {
    const base = group[0];

    if (group.length > 1) {
      result.push({
        ...base,
        merged: true,
        count: group.length,
        createdAt: group[group.length - 1].createdAt,
        // mergedIds: group.map(item => item.id),
      });
    } else {
      result.push(base);
    }
  }

  return result;
}
