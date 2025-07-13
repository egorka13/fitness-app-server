import { FastifyInstance } from 'fastify';

/**
 * Registers the public routes with the provided Fastify instance.
 * @param fastify - The Fastify instance to which the public routes will be attached.
 */
export async function publicRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', async (request, reply) => {
    console.log(`[PING] ${new Date().toISOString()} - hit from ${request.ip}`);
    return { message: 'pong' };
  });
}
