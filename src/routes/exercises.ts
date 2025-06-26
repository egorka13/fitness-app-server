import { FastifyInstance } from 'fastify';
import { exerciseController } from '../controllers/exerciseController';
import { exerciseSetsController } from '../controllers/exerciseSetsController';

/**
 * Registers the exercise-related routes with the provided Fastify instance.
 *
 * @param fastify - The Fastify instance to which the exercise routes will be attached.
 */
export async function exercisesRoutes(fastify: FastifyInstance) {
  /**
   * GET /exercises
   * Retrieves all exercises.
   */
  fastify.get(
    '/exercises',
    { preHandler: [fastify.authenticate] },
    exerciseController.getAllExercises
  );

  /**
   * GET /exercises/:id
   * Retrieves a specific exercise by its ID.
   * Expects the ID to be a number in the URL parameters.
   */
  fastify.get(
    '/exercises/:id',
    { preHandler: [fastify.authenticate] },
    exerciseController.getById
  );

  /**
   * POST /exercises
   * Creates a new exercise.
   * Expects a JSON body with the exercise name.
   */
  fastify.post(
    '/exercises',
    { preHandler: [fastify.authenticate] },
    exerciseController.create
  );

  /**
   * Get /exercises/:id/history
   * Retrieves all sets for a specific exercise by its ID.
   */
  fastify.get(
    '/exercises/:id/history',
    { preHandler: [fastify.authenticate] },
    exerciseSetsController.getSetsByExerciseId
  );

  /**
   * POST /exercises/:id/history
   * Creates a new set for a specific exercise by its ID.
   * Expects the ID to be a number in the URL parameters and the set data in the request body.
   */
  fastify.post(
    '/exercises/:id/history',
    { preHandler: [fastify.authenticate] },
    exerciseSetsController.createSetByExerciseId
  );
}
