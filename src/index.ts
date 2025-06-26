import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

import { exercisesRoutes } from './routes/exercises';

dotenv.config();

const fastify = Fastify();

fastify.register(jwt, {
  secret: process.env.SUPABASE_JWT || '',
});

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest<any>,
      reply: FastifyReply<any>
    ) => Promise<void>;
  }
}

fastify.decorate(
  'authenticate',
  async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  }
);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

fastify.register(cors, {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Если нужен доступ к HTTP cookies
});

fastify.register(exercisesRoutes);

// Start server
const start = async () => {
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0',
    });
    console.log(
      `Server running at http://localhost:${process.env.PORT || 3000}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
