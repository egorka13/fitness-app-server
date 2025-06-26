import { FastifyRequest, FastifyReply } from 'fastify';
import { exerciseService } from '../services/exerciseService';
import { Exercise } from '../models/Exercise';

/**
 * Controller for handling exercise-related operations.
 */
export const exerciseController = {
  /**
   * Creates a new exercise.
   *
   * @param req - FastifyRequest containing the exercise data in the request body.
   * @param reply - FastifyReply used to send the created exercise as a response.
   * @returns Sends the created exercise object in the response.
   */
  async create(req: FastifyRequest, reply: FastifyReply) {
    const {
      name,
      title,
      group,
      imageUrl,
      isPopular,
      isDoubleSided,
      isNoWeight,
    } = req.body as Exercise;
    const exercise = await exerciseService.createExercise({
      name,
      title,
      group,
      imageUrl,
      isPopular,
      isDoubleSided,
      isNoWeight,
    });
    reply.send(exercise);
  },

  /**
   * Gets all exercises.
   *
   * @param req - FastifyRequest to handle the request.
   * @param reply - FastifyReply used to send the created exercise as a response.
   * @returns Sends an array of all exercises in the response.
   */
  async getAllExercises(req: FastifyRequest, reply: FastifyReply) {
    const exercises = await exerciseService.getAllExercises();
    reply.send(exercises);
  },

  /**
   * Gets a specific exercise by its ID.
   *
   * @param req - FastifyRequest to handle the request.
   * @param reply - FastifyReply used to send the created exercise as a response.
   * @returns Sends the exercise object if found, or an error if not found.
   * @throws 400 if the ID is invalid, 404 if the exercise is not found.
   */
  async getById(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return reply.status(400).send({ error: 'Invalid ID' });
    }

    const exercise = await exerciseService.getById(id);

    if (!exercise) {
      return reply.status(404).send({ error: 'Exercise not found' });
    }

    reply.send(exercise);
  },
};
