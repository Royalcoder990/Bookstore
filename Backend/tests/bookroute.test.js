import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import bookRoute from '../routes/bookroute.js'; // adjust the path to your actual bookroute file
import Book from '../model/book.model.js'; // adjust the path to your actual Book model

// Set up the app for testing
const app = express();
app.use(express.json());
app.use('/', bookRoute);

// MongoDB in-memory database setup
let server;

beforeAll(async () => {
  // Connect to the in-memory MongoDB instance before tests
  const mongoDB = await mongoose.connect('mongodb://127.0.0.1/bookstore_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to in-memory MongoDB');
  server = mongoDB;
});

afterAll(async () => {
  // Close the database connection after tests are done
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// Test the GET / route
describe('GET /', () => {
  it('should return a list of books', async () => {
    // Create a test book in the database
    const newBook = new Book({
      name: 'The Great Gatsby',
      price: 10.99,
      category: 'Fiction',
      image: 'image-url',
      title: 'A classic novel',
    });

    await newBook.save();

    // Send GET request to the endpoint
    const response = await request(app).get('/');

    // Check that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Check that the response body is an array and contains at least one book
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);

    // Verify the contents of the book
    expect(response.body[0]).toHaveProperty('name', 'The Great Gatsby');
    expect(response.body[0]).toHaveProperty('price', 10.99);
    expect(response.body[0]).toHaveProperty('category', 'Fiction');
  });

  it('should return an empty array if no books are found', async () => {
    // Clear the database before this test
    await Book.deleteMany({});

    // Send GET request to the endpoint
    const response = await request(app).get('/');

    // Check that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Check that the response body is an empty array
    expect(response.body).toEqual([]);
  });
});