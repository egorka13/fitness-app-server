import { FastifyRequest, FastifyReply } from 'fastify';
import { exerciseSetsService } from '../services/exerciseSetsService';

/**
 * Controller for handling exercise-sets-related operations.
 */
export const exerciseSetsController = {
  /**
   * Retrieves all sets for a specific exercise by its ID.
   *
   * @param req - FastifyRequest to handle the request.
   * @param reply - FastifyReply used to send the created exercise as a response.
   * @returns Sends an array of exercise sets in the response.
   * @throws 400 if the ID is invalid, 404 if the exercise sets are not found.
   */
  async getSetsByExerciseId(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = Number(req.params.id);
    const userId = (req.user as any).sub;

    if (isNaN(id)) {
      return reply.status(400).send({ error: 'Invalid ID' });
    }

    if (!userId) {
      return reply.status(400).send({ error: 'Invalid User ID' });
    }

    const exerciseSets = await exerciseSetsService.getSetsByExerciseId(
      id,
      userId
    );

    if (!exerciseSets) {
      return reply.status(404).send({ error: 'Exercise sets not found' });
    }

    reply.send(exerciseSets);
  },

  /**
   * Creates a new set for a specific exercise by its ID.
   *
   * @param req - FastifyRequest to handle the request.
   * @param reply - FastifyReply used to send the created exercise as a response.
   * @param req.body - The body of the request containing the set data.
   * @param req.params.id - The ID of the exercise to create a set for.
   * @returns Sends the created exercise set object in the response.
   * @throws 400 if the ID is invalid or required parameters are missing,
   */
  async createSetByExerciseId(
    req: FastifyRequest<{
      Params: { id: string };
      Body: {
        repeats: number;
        weight: number;
        createdAt?: number;
      };
    }>,
    reply: FastifyReply
  ) {
    const id = Number(req.params.id);
    const userId = (req.user as any).sub;

    if (isNaN(id)) {
      return reply.status(400).send({ error: 'Invalid ID' });
    }

    if (!userId) {
      return reply.status(400).send({ error: 'Invalid User ID', userId });
    }

    const { repeats, weight, createdAt } = req.body;

    if (!('repeats' in req.body)) {
      return reply
        .status(400)
        .send({ error: 'Mandatory parameter required: repeats' });
    }

    if (!('weight' in req.body)) {
      return reply
        .status(400)
        .send({ error: 'Mandatory parameter required: weight' });
    }

    const exerciseSets = await exerciseSetsService.createSetByExerciseId(
      id,
      userId,
      { repeats, weight, createdAt }
    );

    if (!exerciseSets) {
      return reply.status(404).send({ error: 'Exercise sets not found' });
    }

    reply.send(exerciseSets);
  },
};
