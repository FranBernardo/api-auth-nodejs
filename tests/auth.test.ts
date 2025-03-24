import mongoose from 'mongoose';
import User from '../src/model/user.model';
import express from 'express';
import supertest from 'supertest';
import { CreateRouter } from '../src/router/users';

const app = express();
app.use(express.json());
app.use('/', CreateRouter);

beforeAll(
  async () => {
    await mongoose.connect('mongodb+srv://auth:auth123@api-auth.ev31y.mongodb.net/api-auth')
  }
)
afterAll(
  async () => {
    await mongoose.connection.close()
  }
)

describe('Test the router get', () => {
  it('should get user', async () => {
    const res = await supertest(app).get('/get')
    expect(res.status).toBe(200)
  })
})
