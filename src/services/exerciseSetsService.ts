import { exerciseSetsRepository } from '../repositories/exerciseSetsRepository';

/**
 * Service object for managing exercise sets.
 */
export const exerciseSetsService = {
  /**
   * Retrieves all sets for a specific exercise by its ID.
   *
   * @param id - The ID of the exercise to retrieve sets for.
   * @param userId - The ID of the user to filter sets by.
   */
  async getSetsByExerciseId(id: number, userId: string) {
    return exerciseSetsRepository.getSetsByExerciseId(id, userId);
  },

  /**
   * Creates a new set for a specific exercise by its ID.
   *
   * @param id - The ID of the exercise to create a set for.
   * @param userId - The ID of the user to filter sets by.
   * @param data - An object containing the set details, such as repeats, weight, and optional createdAt timestamp.
   */
  async createSetByExerciseId(
    id: number,
    userId: string,
    data: { repeats: number; weight: number; createdAt?: number }
  ) {
    return exerciseSetsRepository.createSetByExerciseId(id, userId, data);
  },
};
