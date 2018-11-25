const app       = require('../app');
const request   = require('supertest');
const server    = request.agent('http://localhost:3030');
const mongoose  = require('mongoose');
const userId    = new mongoose.Types.ObjectId;
const artistId    = new mongoose.Types.ObjectId;
const albumId    = new mongoose.Types.ObjectId;
const trackId    = new mongoose.Types.ObjectId;
const assert    = require("assert");
require('./album.test'); // fourth execution

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

  describe('CREATE Track', () => {
    let track = {
      "_id": trackId.toString(),
      "name": "Applause",
      "length": "3:40",
      "album_id": albumId.toString(),
    };
    it('login', loginUser());
    it('respond with 201 created', (done) => {
      server
        .post('/api/track')
        .send(track)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });
  });

  describe('GET tracks', function(){
    it('login', loginUser());
    it('respond with array that contains tracks', function(done) {
      server
        .get('/api/track')
        .expect(200)
        .then(response => {
          assert(response.body[0].name, 'Applause');
          assert(response.body[0].length, '3:40');
          done()
        })
    });
  });

  describe('Check if track was added to album', () => {
    it('login', loginUser());
    it('respond with json containing an album', (done) => {
      server
        .get('/api/album/' + albumId.toString())
        .expect(200)
        .then(response => {
          assert(response.body._tracks[0], trackId.toString());
          done()
        })
    });
  });

  describe('GET track', () => {
    it('login', loginUser());
    it('respond with json containing a track', (done) => {
      server
        .get('/api/track/' + trackId.toString())
        .expect(200)
        .then(response => {
          assert(response.body.name, 'Applause');
          done()
        })
    });
  });

  describe('DELETE track', () => {
    it('Check if album was deleted', (done) => {
      server
        .delete('/api/track/' + trackId.toString())
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
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