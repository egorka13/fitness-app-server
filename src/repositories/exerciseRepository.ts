import { db } from '../db/knex';
import { Exercise } from '../models/Exercise';

/**
 * Exercise Repository
 * This module provides functions to interact with the exercises table in the database.
 * It includes methods to create and retrieve exercise records.
 */
export const exerciseRepository = {
  /**
   * Creates a new exercise record in the database.
   *
   * @param data - An object containing the exercise details (e.g., name).
   * @param trx - Optional database transaction object. Defaults to the main database connection.
   * @returns The created exercise record.
   */
  async createExercise(data: Omit<Exercise, 'id'>, trx = db) {
    const [created] = await trx('exercises').insert(data).returning('*');
    return created;
  },

  /**
   * Retrieves all exercise records from the database.
   *
   * @returns A promise that resolves to an array of all exercises.
   */
  async getAllExercises(): Promise<Exercise[]> {
    return db<Exercise>('exercises').select('*');
  },

  async getById(id: number): Promise<Exercise | undefined> {
    return db<Exercise>('exercises').where({ id }).first();
  },
};
