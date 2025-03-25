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
afterEach(async () => {
  // Remove todos os usuários de teste após cada teste
  await User.deleteMany({ email: "test@test.com" });
})
afterAll(
  async () => {
    await mongoose.connection.close()
  }
)
describe('Test the router post', () => {
  it('should create user', async () => {
    const res = await supertest(app).post('/create').send({
      name: 'test',
      email: 'tests@test.com',
      password: 'test'
    })
    expect(res.status).toBe(200)
  })
  it('should user exists', async () => {
    const res = await supertest(app).post('/create').send({
      name: 'test',
      email: 'tests@test.com',
      password: 'test'
    })
    expect(res.status).toBe(400)
    
  })

  
})
