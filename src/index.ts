import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';

dotenv.config();

import { exercisesRoutes } from './routes/exercises';

const fastify = Fastify();

fastify.register(cors, {
  origin: 'http://localhost:3000',
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
