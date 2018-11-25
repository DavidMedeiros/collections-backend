const app       = require('../app');
const request   = require('supertest');
const server    = request.agent('http://localhost:3030');
const mongoose  = require('mongoose');
const userId    = new mongoose.Types.ObjectId;
const artistId    = new mongoose.Types.ObjectId;
const assert    = require("assert");
require('./user.test'); // second execution

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

  describe('CREATE Artist', () => {
    let artist = {
      "_id": artistId.toString(),
      "name": "Lady Gaga",
      "country": "ITALY"
    };
    it('login', loginUser());
    it('respond with 201 created', (done) => {
      server
        .post('/api/artist')
        .send(artist)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('GET artists', function(){
    it('login', loginUser());
    it('respond with array containing artists', function(done) {
      server
        .get('/api/artist')
        .expect(200)
        .then(response => {
          assert(response.body[0].name, 'Lady Gaga');
          assert(response.body[0].country, 'ITALY');
          assert(response.body[0]._albums, '[]');
          done()
        })
    });
  });

  describe('GET Artist', () => {
    it('login', loginUser());
    it('respond with json containing an artist', (done) => {
      server
        .get('/api/artist/' + artistId.toString())
        .expect(200)
        .then(response => {
          assert(response.body.name, 'Lady Gaga');
          assert(response.body.country, 'ITALY');
          assert(response.body._albums, '[]');
          done()
        })
    });
  });

  describe('EDIT Artist', () => {
    it('login', loginUser());
    let artist = {
      "country": "USA",
    };
    it('respond with 200 edited', (done) => {
      server
        .put('/api/artist/' + artistId.toString())
        .send(artist)
        .expect(200, done);
    });
    it('get artist edited', (done) => {
      server
        .get('/api/artist/' + artistId.toString())
        .expect(200)
        .then(response => {
          assert(response.body.name, 'Lady Gaga');
          assert(response.body.country, 'USA');
          assert(response.body._albums, '[]');
          done()
        })
    });
  });

  describe('DELETE Artist', () => {
    it('Check if artist was deleted', (done) => {
      server
        .delete('/api/artist/' + artistId.toString())
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