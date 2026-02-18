import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app.js';
import { connectDB } from '../utils/db.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Auth API', () => {
  test('register and login', async () => {
    const registerPayload = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'student'
    };

    const registerRes = await request(app).post('/api/auth/register').send(registerPayload);
    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body.token).toBeDefined();

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.user.email).toBe('test@example.com');
  });
});
