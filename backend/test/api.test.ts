import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

describe('GET /graphql', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
