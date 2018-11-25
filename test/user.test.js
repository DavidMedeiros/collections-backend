const app       = require('../app');
const request   = require('supertest');
const server    = request.agent('http://localhost:3030');
const mongoose  = require('mongoose');
const userId    = new mongoose.Types.ObjectId;
const assert    = require("assert");

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
  describe('Create User', () => {
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

  describe('GET users', function(){
    it('login', loginUser());
    it('respond with array of json containing user', function(done) {
      server
        .get('/api/user')
        .expect(200)
        .then(response => {
          assert(response.body[0].bio, 'my bio description');
          assert(response.body[0]._collections, '[]');
          assert(response.body[0]._following_users, '[]');
          assert(response.body[0]._following_collections, '[]');
          assert(response.body[0]._followers, '[]');
          assert(response.body[0]._liked_collections, '[]');
          assert(response.body[0].name, 'user');
          assert(response.body[0].username, 'myusername');
          assert(response.body[0].email, 'user@email.com');
          assert(response.body[0].birthday, '1195-12-16T13:15:20.000Z');
          assert(response.body[0].gender, 'other');

          done()
        })
    });
  });

  describe('GET User', () => {
    it('login', loginUser());
    it('respond with json containing a user', (done) => {
      server
        .get('/api/user/' + userId.toString())
        .expect(200)
        .then(response => {
          assert(response.body.bio, 'my bio description');
          assert(response.body._collections, '[]');
          assert(response.body._following_users, '[]');
          assert(response.body._following_collections, '[]');
          assert(response.body._followers, '[]');
          assert(response.body._liked_collections, '[]');
          assert(response.body.name, 'user');
          assert(response.body.username, 'myusername');
          assert(response.body.email, 'user@email.com');
          assert(response.body.birthday, '1195-12-16T13:15:20.000Z');
          assert(response.body.gender, 'other');

          done()
        })
    });
  });

  describe('Edit User', () => {
    it('login', loginUser());
    let user = {
      "name": "User Edited",
      "email": "user-edited@email.com",
    };
    it('respond with 200 edited', (done) => {
      server
        .put('/api/user/' + userId.toString())
        .send(user)
        .expect(200, done);
    });
    it('get user edited', (done) => {
      server
        .get('/api/user/' + userId.toString())
        .expect(200)
        .then(response => {
          assert(response.body.name, 'User Edited');
          assert(response.body.email, 'user-edited@email.com');

          done()
        })
    });
  });

  describe('Delete User', () => {
    it('Check if user was deleted', (done) => {
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