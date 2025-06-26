import { db } from '../db/knex';
import { Exercise } from '../models/Exercise';
import { exerciseRepository } from '../repositories/exerciseRepository';

/**
 * Service object for managing exercises.
 */
export const exerciseService = {
  /**
   * Creates a new exercise in the database.
   * @param data - An object containing the exercise details, such as name.
   * @returns
   */
  async createExercise(data: Omit<Exercise, 'id'>) {
    return db.transaction(async (trx) => {
      const exercise = await exerciseRepository.createExercise(data, trx);
      return exercise;
    });
  },

  /**
   * Retrieves all exercises from the database.
   * @returns An array of all exercises.
   */
  async getAllExercises() {
    return exerciseRepository.getAllExercises();
  },

  /**
   * Gets a specific exercise by its ID.
   * @param id - The ID of the exercise to retrieve.
   */
  async getById(id: number) {
    return exerciseRepository.getById(id);
  },
};
