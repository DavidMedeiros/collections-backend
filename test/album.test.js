const app       = require('../app');
const request   = require('supertest');
const server    = request.agent('http://localhost:3030');
const mongoose  = require('mongoose');
const userId    = new mongoose.Types.ObjectId;
const artistId    = new mongoose.Types.ObjectId;
const albumId    = new mongoose.Types.ObjectId;
const assert    = require("assert");
require('./artist.test'); // third execution

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

  describe('CREATE Album', () => {
    let album = {
      "_id": albumId.toString(),
      "name": "ARTPOP",
      "released_date": "Sat Dec 16 2013 10:15:20 GMT-0300",
      "released_type": "Album",
      "artist_id": artistId.toString(),
      "genres": ['pop', 'rock', 'dance']
    };
    it('login', loginUser());
    it('respond with 201 created', (done) => {
      server
        .post('/api/album')
        .send(album)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('GET albums', function(){
    it('login', loginUser());
    it('respond with array that contains albums', function(done) {
      server
        .get('/api/album')
        .expect(200)
        .then(response => {
          assert(response.body[0].name, 'ARTPOP');
          assert(response.body[0].released_date, 'Sat Dec 16 2013 10:15:20 GMT-0300');
          assert(response.body[0].released_type, 'Album');
          assert(response.body[0].artist_id, artistId.toString());
          assert(response.body[0].genres, ['pop', 'rock', 'dance']);
          done()
        })
    });
  });

  describe('Check if album was added to artist', () => {
    it('login', loginUser());
    it('respond with json containing an artist', (done) => {
      server
        .get('/api/artist/' + artistId.toString())
        .expect(200)
        .then(response => {
          assert(response.body._albums[0], albumId.toString());
          done()
        })
    });
  });

  describe('GET Album', () => {
    it('login', loginUser());
    it('respond with json containing an album', (done) => {
      server
        .get('/api/album/' + albumId.toString())
        .expect(200)
        .then(response => {
          assert(response.body.name, 'ARTPOP');
          assert(response.body.released_date, 'Sat Dec 16 2013 10:15:20 GMT-0300');
          assert(response.body.released_type, 'Album');
          assert(response.body.artist_id, artistId.toString());
          assert(response.body.genres, ['pop', 'rock', 'dance']);
          done()
        })
    });
  });

  describe('DELETE Album', () => {
    it('Check if album was deleted', (done) => {
      server
        .delete('/api/album/' + albumId.toString())
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
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