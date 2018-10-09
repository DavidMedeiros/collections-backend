const app       = require('../app');
const request   = require('supertest');
const server    = request.agent('http://localhost:3000');
const mongoose  = require('mongoose');
const userId    = new mongoose.Types.ObjectId;
const collectionId    = new mongoose.Types.ObjectId;
const assert    = require("assert");
require('./track.test'); // fourth execution

const prepareData = async () => {
  runTests();
};

function loginUser() {
  return function(done) {
    server
      .post('/api/auth')
      .send({ username: 'myusername', password: '123456' })
      .expect(200)
      .end(onResponse);

    function onResponse(err, res) {
      if (err) return done(err);
      return done();
    }
  };
}

const runTests = () => {
  describe('CREATE User', () => {
    let user = {
      "_id": userId.toString(),
      "name": "User",
      "username": "myusername",
      "email": "user@email.com",
      "password": "123456",
      "birthday": "Sat Dec 16 1195 10:15:20 GMT-0300",
      "gender": "other",
      "bio": "my bio description"
    };
    it('respond with 201 created', (done) => {
      request(app)
        .post('/api/user')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('CREATE collection', () => {
    let collection = {
      "_id": collectionId.toString(),
      "name": "My Divas Albums",
      "description": "My favourite albums collection",
    };
    it('login', loginUser());
    it('respond with 201 created', (done) => {
      server
        .post('/api/collection')
        .send(collection)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('GET collection', () => {
    it('login', loginUser());
    it('respond with json containing a collection', (done) => {
      server
        .get('/api/collection/' + collectionId.toString())
        .expect(200)
        .then(response => {
          assert(response.body.name, "My Divas Albums");
          done()
        })
    });
  });

  describe('DELETE Collection', () => {
    it('Check if collection was deleted', (done) => {
      server
        .delete('/api/collection/' + collectionId.toString())
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Delete User', () => {
    it('Check if user used to tests was deleted', (done) => {
      server
        .delete('/api/user/' + userId.toString())
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
};

prepareData();