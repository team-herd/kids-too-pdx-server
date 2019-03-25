require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');
const Referral = require('../../lib/models/Referral');

describe('Referral model', () => {
  beforeAll(() => connect());
  
  beforeEach(() => mongoose.connection.dropDatabase());

  afterAll(() => mongoose.connection.close());

  it('creates a referral', () => {
    return Referral.create({
      user: 'kidstoopdx@email.com',
      eventName: 'KidsToo PDX',
      date: Date.now()
    })
      .then(referral => expect(referral.toJSON()).toEqual({
        _id: expect.any(mongoose.Types.ObjectId),
        __v: expect.any(Number),
        user: 'kidstoopdx@email.com',
        eventName: 'KidsToo PDX',
        date: expect.any(Date)
      }));
  });
});
