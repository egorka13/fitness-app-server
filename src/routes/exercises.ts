import { FastifyInstance } from 'fastify';
import { exerciseController } from '../controllers/exerciseController';

/**
 * Registers the exercise-related routes with the provided Fastify instance.
 *
 * @param fastify - The Fastify instance to which the exercise routes will be attached.
 */
export async function exercisesRoutes(fastify: FastifyInstance) {
  /**
   * POST /exercises
   * Creates a new exercise.
   * Expects a JSON body with the exercise name.
   */
  fastify.post('/exercises', exerciseController.create);

  fastify.get('/exercises', exerciseController.getAllExercises);

  fastify.get('/exercises/:id', exerciseController.getById);
}
