const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

beforeAll(async () => {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopease_test';
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('ShopEase Auth API Tests', () => {
  it('Should register a new customer', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Customer',
        email: 'testcustomer@example.com',
        password: 'Password123!'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  it('Should fail login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testcustomer@example.com',
        password: 'WrongPassword'
      });
    expect(res.statusCode).toEqual(401);
  });
});
