import { FastifyInstance } from 'fastify';

/**
 * Registers the public routes with the provided Fastify instance.
 * @param fastify - The Fastify instance to which the public routes will be attached.
 */
export async function publicRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', async (request, reply) => {
    request.log.info(
      { url: request.url, timestamp: new Date().toISOString() },
      'Ping request received'
    );
    return { message: 'pong' };
  });
}
