/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const supertest = require('supertest-as-promised')(require('../../src/app.js'))

// const agent = session(supertest);
const videogame = {
  name: "Super Mario Bros IV",
  genres: ["Action"],
  released: "2006-06-01",
  description: "First game created in this database.",
  rating: 4,
  image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
  platforms: [
    {
      platform: {
      name: "Linux"
      }
    }]
};

const badVideogame = {
  genres: ["Action"],
  released: "2006-06-01",
  description: "First game created in this database.",
  rating: 4,
  image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
  platforms: [
    {
      platform: {
      name: "Linux"
      }
    }]
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Videogame.sync({ force: true }))
      // .then(() => Videogame.create(videogame)));
  
  describe('GET /videogame', () => {
    it('Should get 200 in route /videogame', function () {
      return supertest
        .get('/videogame')
          .expect(200)
          .expect('Content-Type', /json/)
    });
    it('Should get an array with lenght above 100 in route /videogame', () => {
      return supertest
        .get('/videogame')
          .expect(function (res) {
              expect(res.body).to.have.lengthOf.above(100);
          })
    });
  });

  describe('GET /videogame?name=batman', () => {
    it('Should get all Games with name "Batman" in route /videogame?name=batman', function () {
      return supertest
        .get('/videogame?name=batman')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect( function (res) {
              expect(res.body[0].name).to.eql('Batman')
          })
          .expect( function (res) {
            expect(res.body[1].name).to.eql('Batman: Vengeance')
          })
          .expect( function (res) {
            expect(res.body[2].name).to.eql('Batman: Arkham City')
          });          
      });
  });

  describe('POST /videogame', () => {
    it('Should get 200 in route POST/videogame with correct sent data', function () {
      return supertest
        .post('/videogame')
        .send(videogame)
          .expect(200)
          .expect('Content-Type', /json/)
    });
    it('Should get an array with lenght above 100 in route /videogame', () => {
      return supertest
        .post('/videogame')
        .send(videogame)
          .expect(function (res) {
              expect(res.body.name).to.eql("Super Mario Bros IV");
              expect(res.body.description).to.eql("First game created in this database.");
              expect(res.body.image).to.eql("https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg");
              expect(res.body.released).to.eql("2006-06-01");
              expect(res.body.rating).to.eql(4);
              expect(res.body.platforms).to.eql([ { platform: { name: "Linux" } } ])
          })
    });
    it('Should get 500 in route POST/videogame with invalid sent data', function () {
      return supertest
        .post('/videogame')
          .send(badVideogame)
          .expect(500)
    });
  });

  describe('GET /genres', () => {
    it('Should get 200 in route /genres', function () {
      return supertest
        .get('/genres')
          .expect(200)
          .expect('Content-Type', /json/)
    });
    it('Should get an array with lenght 19 and all genres in route /genres', () => {
      return supertest
        .get('/genres')
          .expect(function (res) {
              expect(res.body).to.have.length(19);
          })
    });
  });

  describe('GET /:idVideogame', () => {
    it('Should get 200 in route with correct id in route /:idVideogame', function () {
      return supertest
        .get('/videogame/3667')
          .expect(200)
          .expect('Content-Type', /json/)
    });
    it('Should get game data in route /:idVideogame', () => {
      return supertest
        .get('/videogame/3667')
          .expect(function (res) {
            expect(res.body[0].id).to.eql(3667);
            expect(res.body[0].name).to.eql("Enemy Front");
            expect(res.body[0].released).to.eql("2014-05-01")
          })
    });
  });

});