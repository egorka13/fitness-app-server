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

  async getAllExercises() {
    return exerciseRepository.getAllExercises();
  },

  async getById(id: number) {
    return exerciseRepository.getById(id);
  },
};
