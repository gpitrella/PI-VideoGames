// const { Videogame, Genre, conn } = require('../../src/db.js');
// const { expect } = require('chai');

// // Test Videogame Model
// describe('Videogame model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Videogame.sync({ force: true }));
//     describe('Name:', () => {
//       it('Should throw an error if name is null', (done) => {
//         Videogame.create({
//           genres: ["Action"],
//           released: "2006-06-01",
//           description: "pitrelladfasdf dsf",
//           rating: 4,
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//       })
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('Should throw an error if name have a symbol.', (done) => {
//         Videogame.create({
//           name: "Super Mario Bros IV %%",
//           genres: ["Action"],
//           released: "2006-06-01",
//           description: "pitrelladfasdf dsf",
//           rating: 4,
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//       })
//           .then(() => done(new Error('It requires a valid name, without symbol.')))
//           .catch(() => done());
//       });
//       it('Should work when its a valid name', () => {
//         return Videogame.create({
//           name: "Super Mario Bros IV",
//           genres: ["Action"],
//           released: "2006-06-01",
//           description: "pitrelladfasdf dsf",
//           rating: 4,
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//         })
//           .then(game => {
//             expect(game.name).to.equal("Super Mario Bros IV");
//           })
//       });
//     });
//     describe('Description:', () => {
//       it('Should throw an error if description is null.', (done) => {
//         Videogame.create({
//           genres: ["Action"],
//           released: "2006-06-01",
//           rating: 4,
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//       })
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('Should work when its a valid description', () => {
//         return Videogame.create({
//           name: "Super Mario Bros IV",
//           genres: ["Action"],
//           released: "2006-06-01",
//           description: "First game created in this database.",
//           rating: 4,
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//         })
//           .then(game => {
//             expect(game.description).to.equal("First game created in this database.");
//           })
//       });
//     });
//     describe('Rating:', () => {
//       it('Should throw an error if rating is out of 1 to 5', (done) => {
//         Videogame.create({
//           genres: ["Action"],
//           released: "2006-06-01",
//           rating: 6,
//           description: "First game created in this database",
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//       })
//           .then(() => done(new Error('It requires a valid rating between 1 to 5.')))
//           .catch(() => done());
//       });
//       it('Should work when its a valid rating', () => {
//         return Videogame.create({
//           name: "Super Mario Bros IV",
//           genres: ["Action"],
//           released: "2006-06-01",
//           description: "First game created in this database",
//           rating: 3,
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//         })
//           .then(game => {
//             expect(game.rating).to.equal(3);
//           })
//       });
//     });
//     describe('Platforms:', () => {
//       it('Should throw an error if platforms is null', (done) => {
//         Videogame.create({
//           genres: ["Action"],
//           released: "2006-06-01",
//           rating: 6,
//           description: "First game created in this database",
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//         })
//           .then(() => done(new Error('It requires one platform valid.')))
//           .catch(() => done());
//       });
//       it('Should work when its a valid platform.', () => {
//         return Videogame.create({
//           name: "Super Mario Bros IV",
//           genres: ["Action"],
//           released: "2006-06-01",
//           description: "First game created in this database",
//           rating: 3,
//           image: "https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg",
//           platforms: [
//             {
//               platform: {
//               name: "Linux"
//               }
//             }]
//         })
//           .then(game => {
//             expect(game.platforms[0].platform.name).to.equal("Linux");
//           })
//       });
//     });
//   });
// });

// // Test Genre Model
// describe('Genre model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Genre.sync({ force: true }));
//     describe('Name:', () => {
//       it('Should throw an error if name is null.', (done) => {
//         Genre.create({})
//           .then(() => done(new Error('It requires a valid name.')))
//           .catch(() => done());
//       });
//       it('Should work when its a valid name.', () => {
//         Genre.create({ name: 'Action' });
//       });
//     });
//   });
// });