require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');

beforeAll(() => connect(process.env.MONGODB_URI_TEST));

afterAll(done => {
  mongoose.connection.dropDatabase()
    .then(() => mongoose.connection.close(done));
});

const createUser = (username, role = 'org') => {
  return request(app)
    .post('/auth/signup')
    .send({
      role,
      username,
      password: 'passit',
      name: 'The Wrong Org',
      email: `${username}@email.com`,
      phone: '555-123-4569',
      address: {
        street: '125 Main St.',
        city: 'Portland',
        state: 'OR',
        zip: '97203'
      }
    });
};

const createEvent = (eventName, user) => {
  return request(app)
    .post('/events')
    .set('Authorization', `Bearer ${user.token}`)
    .send({
      name: eventName,
      image: 'image.com',
      date: Date.now(),
      description: 'An event hosted by The Org',
      category: 'arts',
      ageMin: 2,
      ageMax: 14,
      price: 100,
      liability: true
    });
};

module.exports = {
  createUser,
  createEvent
};
