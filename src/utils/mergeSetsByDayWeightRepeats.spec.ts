import { describe, it, expect } from '@jest/globals';
import { mergeSetsByDayWeightRepeats } from './mergeSetsByDayWeightRepeats';
import { ExerciseSet } from '../models/ExerciseSet';

describe('mergeSetsByDayWeightRepeats', () => {
  it('returns empty array for empty input', () => {
    expect(mergeSetsByDayWeightRepeats([])).toEqual([]);
  });

  it('returns single set unchanged if no merge needed', () => {
    const sets: ExerciseSet[] = [
      {
        id: 1,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '50.00',
        createdAt: '2024-06-01T10:00:00Z',
      },
    ];
    expect(mergeSetsByDayWeightRepeats(sets)).toEqual(sets);
  });

  it('merges sets with same date, weight, and reps', () => {
    const sets: ExerciseSet[] = [
      {
        id: 1,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '50.00',
        createdAt: '2024-06-01T10:00:00Z',
      },
      {
        id: 2,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '50.00',
        createdAt: '2024-06-01T12:00:00Z',
      },
    ];
    const result = mergeSetsByDayWeightRepeats(sets);
    expect(result).toHaveLength(1);
    result.forEach((item) => {
      expect(item.count).toBe(2);
      expect(item.merged).toBe(true);
      expect(item.createdAt).toBe('2024-06-01T12:00:00Z');
    });
  });

  it('does not merge sets with different dates', () => {
    const sets: ExerciseSet[] = [
      {
        id: 1,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '50.00',
        createdAt: '2024-06-01T10:00:00Z',
      },
      {
        id: 2,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '50.00',
        createdAt: '2024-06-02T10:00:00Z',
      },
    ];
    const result = mergeSetsByDayWeightRepeats(sets);
    expect(result).toHaveLength(2);
    expect(result).toEqual(sets); // nothing changed
    expect(result[0].merged).toBeUndefined();
    expect(result[1].merged).toBeUndefined();
  });

  it('does not merge sets with different weights or reps', () => {
    const sets: ExerciseSet[] = [
      {
        id: 1,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '50.00',
        createdAt: '2024-06-01T10:00:00Z',
      },
      {
        id: 2,
        exerciseId: 1,
        userId: 'u',
        reps: 12,
        weight: '50.00',
        createdAt: '2024-06-01T10:00:00Z',
      },
      {
        id: 3,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '55.00',
        createdAt: '2024-06-01T10:00:00Z',
      },
    ];
    const result = mergeSetsByDayWeightRepeats(sets);
    expect(result).toHaveLength(3);
    expect(result).toEqual(sets); // nothing changed
    result.forEach((item) => {
      expect(item.merged).toBeUndefined();
    });
  });

  it('merges only matching sets and leaves others unmerged', () => {
    const sets: ExerciseSet[] = [
      {
        id: 1,
        exerciseId: 1,
        userId: 'u',
        reps: 8,
        weight: '40.00',
        createdAt: '2024-06-01T10:00:00Z',
      },
      {
        id: 2,
        exerciseId: 1,
        userId: 'u',
        reps: 8,
        weight: '40.00',
        createdAt: '2024-06-01T11:00:00Z',
      },
      {
        id: 3,
        exerciseId: 1,
        userId: 'u',
        reps: 10,
        weight: '40.00',
        createdAt: '2024-06-01T12:00:00Z',
      },
    ];
    const result = mergeSetsByDayWeightRepeats(sets);
    expect(result).toHaveLength(2);
    const merged = result.filter((r) => r.merged);
    expect(merged).toHaveLength(1);
    merged.forEach((item) => expect(item.count).toBe(2));
    const unmerged = result.find((r) => !r.merged);
    expect(unmerged?.reps).toBe(10);
  });
});
