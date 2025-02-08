import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fastifyJWT from '@fastify/jwt';
import fastifyMongo from '@fastify/mongodb';

dotenv.config();

const fastify: FastifyInstance = Fastify({ logger: true });

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

// MongoDB connection
fastify
  .register(fastifyMongo, {
    forceClose: true,
    url: process.env.MONGO_URI as string,
  })
  .after(async () => {
    try {
      const db = fastify.mongo.db;
      if (!db) {
        fastify.log.error('MongoDB client is not initialized!');
        process.exit(1);
      } else {
        fastify.log.info('MongoDB connected successfully!');
      }
    } catch (err) {
      fastify.log.error('Error connecting to MongoDB', err);
      process.exit(1);
    }
  });

// Register JWT
fastify.register(fastifyJWT, {
  secret: process.env.JWT_SECRET as string,
});

// Extend Fastify types
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

// Authentication middleware
fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Health check route
fastify.get('/health', async (_, reply) => {
  try {
    const db = fastify.mongo.db;
    if (!db) {
      return reply
        .code(500)
        .send({ status: 'error', message: 'Database not initialized' });
    }

    await db.command({ ping: 1 });

    return reply.send({ status: 'ok', message: 'Server is healthy' });
  } catch (error) {
    return reply
      .code(500)
      .send({ status: 'error', message: 'Database connection error' });
  }
});

// Register route
fastify.post('/register', async (request, reply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  const users = fastify.mongo.db?.collection('users');

  if (!users)
    return reply.code(500).send({ error: 'Database not initialized' });

  const existingUser = await users.findOne({ username });
  if (existingUser)
    return reply.code(400).send({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await users.insertOne({ username, password: hashedPassword });

  reply.send({ message: 'User registered successfully' });
});

// Login route
fastify.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };
  const users = fastify.mongo.db?.collection('users');

  if (!users)
    return reply.code(500).send({ error: 'Database not initialized' });

  const user = await users.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.code(400).send({ error: 'Invalid credentials' });
  }

  const token = fastify.jwt.sign({ username });
  reply.send({ token });
});

// Protected route
fastify.get(
  '/protected',
  { preHandler: [fastify.authenticate] },
  async (request, reply) => {
    return { message: 'This is a protected route', user: request.user };
  }
);

fastify.get('/test-db', async (request, reply) => {
  const users = fastify.mongo.db?.collection('users');
  const count = await users?.countDocuments();
  return { message: 'Database connected!', userCount: count };
});

fastify.get('/test-db2', async (request, reply) => {
  try {
    const users = fastify.mongo.db?.collection('users');
    const count = await users?.countDocuments();
    return { message: 'Database connected!', userCount: count };
  } catch (error) {
    console.error('Error accessing MongoDB:', error);
    return reply.code(500).send({ error: 'Database not initialized' });
  }
});

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
