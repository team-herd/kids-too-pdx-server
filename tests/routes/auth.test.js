const { createUser } = require('../dataHelper');
const request = require('supertest');
const app = require('../../lib/app');

describe('auth routes', () => {
  let currentUser = null;

  beforeAll(done => {
    createUser('org1234')
      .then(userRes => {
        currentUser = userRes.body;
        done();
      });
  });

  it('sings up an organization', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        role: 'org',
        username: 'org2123',
        password: 'passit2',
        name: 'The Org2',
        email: 'theorg2@email.com',
        phone: '555-123-4568',
        address: {
          street: '124 Main St.',
          city: 'Portland',
          state: 'OR',
          zip: '97203'
        },
        payment: {
          cardNumber: '1234567890123456',
          cardName: 'The Org2',
          expMonth: '01',
          expYear: '2020',
          securityCode: '123',
          method: 'visa'
        }
      })
      .then(res => expect(res.body).toEqual({
        user: {
          _id: expect.any(String),
          role: 'org',
          username: 'org2123',
          name: 'The Org2',
          email: 'theorg2@email.com',
          phone: '555-123-4568',
          address: {
            street: '124 Main St.',
            city: 'Portland',
            state: 'OR',
            zip: '97203'
          }
        },
        token: expect.any(String)
      }));
  });

  it('signs in to an org with username', () => {
    return request(app)
      .post('/auth/signin')
      .send({
        username: 'org1234',
        password: 'passit'
      })
      .then(res => expect(res.body).toEqual({
        user: {
          _id: expect.any(String),
          role: 'org',
          username: 'org1234',
          name: 'The Org',
          email: 'org1234@email.com',
          phone: '555-123-4567',
          address: {
            street: '123 Main St.',
            city: 'Portland',
            state: 'OR',
            zip: '97203'
          }
        },
        token: expect.any(String)
      }));
  });

  it('signs in to an org with email', () => {
    return request(app)
      .post('/auth/signin')
      .send({
        username: 'org1234@email.com',
        password: 'passit'
      })
      .then(res => expect(res.body).toEqual({
        user: {
          _id: expect.any(String),
          role: 'org',
          username: 'org1234',
          name: 'The Org',
          email: 'org1234@email.com',
          phone: '555-123-4567',
          address: {
            street: '123 Main St.',
            city: 'Portland',
            state: 'OR',
            zip: '97203'
          }
        },
        token: expect.any(String)
      }));
  });

  it('updates user info', () => {
    return request(app)
      .patch(`/auth/${currentUser.user._id}`)
      .set('Authorization', `Bearer ${currentUser.token}`)
      .send({
        username: 'orgChanged',
        role: 'admin',
        name: 'Changed Org',
        email: 'thechangedorg@email.com',
        phone: '555-111-2222',
        address: {
          street: '456 Main St.',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90210'
        }
      })
      .then(patchRes => expect(patchRes.body).toEqual({
        _id: expect.any(String),
        role: 'org',
        username: 'orgChanged',
        name: 'Changed Org',
        email: 'thechangedorg@email.com',
        phone: '555-111-2222',
        address: {
          street: '456 Main St.',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90210'
        }
      }));
  });

  it('does not update role', () => {
    return request(app)
      .patch(`/auth/${currentUser.user._id}`)
      .set('Authorization', `Bearer ${currentUser.token}`)
      .send({
        role: 'admin'
      })
      .then(patchRes => expect(patchRes.body).toEqual({
        _id: expect.any(String),
        role: 'org',
        username: 'orgChanged',
        name: 'Changed Org',
        email: 'thechangedorg@email.com',
        phone: '555-111-2222',
        address: {
          street: '456 Main St.',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90210'
        }
      }));
  });

  it('updates password', () => {
    return request(app)
      .patch(`/auth/${currentUser.user._id}`)
      .set('Authorization', `Bearer ${currentUser.token}`)
      .send({
        password: 'changedPass'
      })
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'orgChanged',
            password: 'changedPass'
          })
          .then(userRes => expect(userRes.body).toEqual({
            user: {
              _id: expect.any(String),
              role: 'org',
              username: 'orgChanged',
              name: 'Changed Org',
              email: 'thechangedorg@email.com',
              phone: '555-111-2222',
              address: {
                street: '456 Main St.',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90210'
              }
            },
            token: expect.any(String)
          }));
      });
  });

  it('does not update the wrong user', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        role: 'org',
        username: 'hacker123',
        name: 'Hacker',
        password: 'hackpass',
        phone: '503-888-9999',
        email: 'hackeremail@email.com',
        address: {
          street: '123 Main St.',
          city: 'Portland',
          state: 'OR',
          zip: '97203'
        },
        payment: {
          cardNumber: '1234567890123456',
          cardName: 'Hacker Card',
          expMonth: '01',
          expYear: '2020',
          securityCode: '123',
          method: 'visa'
        }
      })
      .then(hackerUser => {
        return request(app)
          .patch(`/auth/${currentUser.user._id}`)
          .set('Authorization', `Bearer ${hackerUser.body.token}`)
          .send({
            name: 'Hacker Org',
            phone: '503-555-1234',
            username: 'hackerOrg'
          })
          .then(patchedRes => expect(patchedRes.body).toEqual({ error: 'Access denied' }));
      });
  });

  it('signs up an admin', () => {
    return createUser('admin1', 'The Admin1', 'admin')
      .then(adminRes => expect(adminRes.body).toEqual({
        user: {
          _id: expect.any(String),
          role: 'admin',
          username: 'admin1',
          name: 'The Admin1',
          email: 'admin1@email.com',
          phone: '555-123-4567',
          address: {
            street: '123 Main St.',
            city: 'Portland',
            state: 'OR',
            zip: '97203'
          }
        },
        token: expect.any(String)
      }));
  });

  it('does not sign up inauthentic admin', () => {
    return request(app)
      .post('/auth/signup')
      .send({
        role: 'admin',
        username: 'hacker',
        password: 'hackpass',
        name: 'Admin Hacker',
        email: 'adminhacker@email.com',
        phone: '111-123-4567',
        address: {
          street: '123 Main St.',
          city: 'Portland',
          state: 'OR',
          zip: '97203'
        },
        payment: {
          cardNumber: 1234567890123456,
          cardName: 'Admin Hacker',
          expDate: '01/20',
          securityCode: 123,
          method: 'visa'
        }
      })
      .then(adminRes => expect(adminRes.body).toEqual({ error: 'Inauthentic admin' }));
  });
});
