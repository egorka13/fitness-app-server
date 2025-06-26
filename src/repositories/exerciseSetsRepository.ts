import { db } from '../db/knex';
import { Exercise } from '../models/Exercise';

const EXERCISE_SETS_TABLE = 'exercise_sets';

/**
 * Exercise Repository
 * This module provides functions to interact with the exercises table in the database.
 * It includes methods to create and retrieve exercise records.
 */
export const exerciseSetsRepository = {
  /**
   * Retrieves all sets for a specific exercise by its ID.
   *
   * @param id - The ID of the exercise to retrieve sets for.
   * @param userId - The ID of the user to filter sets by.
   * @returns A promise that resolves to an array of exercise sets.
   */
  async getSetsByExerciseId(
    id: number,
    userId: string
  ): Promise<Exercise[] | undefined> {
    return db<Exercise>(EXERCISE_SETS_TABLE)
      .where('exerciseId', id)
      .where('userId', userId)
      .orderBy('createdAt', 'desc');
  },

  /**
   * Creates a new set for a specific exercise by its ID.
   *
   * @param id - The ID of the exercise to create a set for.
   * @param userId - The ID of the user to filter sets by.
   * @param data - An object containing the set details, such as repeats, weight, and optional createdAt timestamp.
   * @returns A promise that resolves to the created exercise set.
   */
  async createSetByExerciseId(
    id: number,
    userId: string,
    data: { repeats: number; weight: number; createdAt?: number }
  ): Promise<Exercise[] | undefined> {
    return db('exercise_sets')
      .insert({
        exerciseId: id,
        userId: userId,
        reps: data.repeats,
        weight: data.weight,
        createdAt: data.createdAt
          ? new Date(data.createdAt).toISOString()
          : new Date().toISOString(),
      })
      .returning('*'); // returns inserted row (Postgres only);
  },
};
