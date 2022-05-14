const axios = require("axios");
// const e = require("express");
const { Op } = require('sequelize');
require('dotenv').config();
// const { API_KEY } = process.env;
const { Router } = require('express');
const { Videogame, Genre } = require('../../src/db.js')
const router = Router();

const API_KEY = "5e76bc5e7bc046e5b6c8a1df54b55726";

router.get('/', async (req, res, next)=>{
    
    try{
        const { name, rating, genre } = req.query;
        if(!name){
            const allApiVideogames = []
            let dataGamesApi = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
                return axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${n}`)
                    .then(res => res.data.results)
                    .then(res => res.map(game => (
                        allApiVideogames.push({
                            name: game.name,
                            id: game.id,
                            genres: game.genres,
                            released: game.released,
                            rating: game.rating,
                            image: game.background_image,
                            platforms: game.platforms
                        })
                    )))   
            });    
            await Promise.all(dataGamesApi)
            
            const dbVideogames = await Videogame.findAll({
                include: Genre
            });
            const allData = dbVideogames.concat(allApiVideogames)

            if(rating){
                if(genre){
                    // Filter: With Rating and Genre - WithOut Name
                    const allDataFilterRating = allData.filter((game) => {
                        if(Math.floor(game.rating) === parseInt(rating)){
                            return game;
                        };                    
                    })
                    const allDataFilterRatingGenre = allDataFilterRating.filter((game) => {
                        if(genre !== 'none'){
                            const aux = []                          
                            game.genres.length > 0 && game.genres.forEach((g) => {
                                    aux.push(g.name)                            
                                })
                            if(aux.includes(genre)){
                                return game;
                            }            
                        } else {
                            return game;
                        }                    
                    })
                    if(allDataFilterRatingGenre.length === 0){
                        res.status(200).send(`Don't find any game with this filter (Genre and Rating).`);
                    } else {
                        res.status(200).json(allDataFilterRatingGenre);
                    }
                } else {
                    // Filter: With Rating - WithOut Name
                    const allDataFilterRating = allData.filter((game) => {
                        if(Math.floor(game.rating) === parseInt(rating)){
                            return game;
                        };                    
                    })
                    if(allDataFilterRating.length === 0){
                        res.status(200).send(`Don't find any game with this filter (Rating).`);
                    } else {
                        res.status(200).json(allDataFilterRating);
                    }
                }

            } else {
                if(genre){
                    // Filter: With Genre - WithOut Name and Rating
                    const allDataFilterGenre = allData.filter((game) => {
                        if(genre !== 'none'){
                            const aux = []                          
                            game.genres.length > 0 && game.genres.forEach((g) => {
                                    aux.push(g.name)                            
                                })
                            if(aux.includes(genre)){
                                return game;
                            }            
                        } else {
                            return game;
                        }                    
                    })

                    if(allDataFilterGenre.length === 0){
                        res.status(200).send(`Don't find any game with this filter (Genre).`);
                    } else {
                        res.status(200).json(allDataFilterGenre);
                    }

                } else {
                //Filter: None - WithOut Name, Genre and Rating
                res.status(200).json(allData);
                }
            }
        // Filter: With Search Name
        } else {
            const dbVideogames = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: '%' + name + '%'
                    }
                },
                include: Genre 
            });
            
            const filterApiVg = []
            await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
                .then(res => res.data.results)
                .then(res => res.slice(0, 15).map(game => (
                    filterApiVg.push({
                        name: game.name,
                        id: game.id,
                        genres: game.genres,
                        released: game.released,
                        rating: game.rating,
                        image: game.background_image,
                        platforms: game.platforms
                    })
                )))
            const allFilterGames = dbVideogames.concat(filterApiVg)

            if(rating){
                if(genre){
                    // Filter: With Rating, Genre and Name
                    const allDataFilterRating = allFilterGames.filter((game) => {
                        if(Math.floor(game.rating) === parseInt(rating)){
                            return game;
                        };                    
                    })
                    const allDataFilterRatingGenre = allDataFilterRating.filter((game) => {
                        if(genre !== 'none'){
                            const aux = []                          
                            game.genres.length > 0 && game.genres.forEach((g) => {
                                    aux.push(g.name)                            
                                })
                            if(aux.includes(genre)){
                                return game;
                            }            
                        } else {
                            return game;
                        }                    
                    })
                    allDataFilterRatingGenre.length > 0
                        ? res.status(200).json(allDataFilterRatingGenre.slice(0, 15))
                        : res.status(200).send( "Don't found any Game with this name and rating. Try again please ..." );
                } else {
                    // Filter: With Rating, Name - WithOut: Genre
                    const allDataFilterRating = allFilterGames.filter((game) => {
                        if(Math.floor(game.rating) === parseInt(rating)){
                            return game;
                        };                    
                    })
                    allDataFilterRating.length > 0
                            ? res.status(200).json(allDataFilterRating.slice(0, 15))
                            : res.status(200).send("Don't found any Game with this name and rating. Try again please ...");
                    }              
            } else {
                if(genre){
                    // Filter: With Genre and Name - WithOut: Rating
                    const allDataFilterGenre = allFilterGames.filter((game) => {
                        if(genre !== 'none'){
                            const aux = []                          
                            game.genres.length > 0 && game.genres.forEach((g) => {
                                    aux.push(g.name)                            
                                })
                            if(aux.includes(genre)){
                                return game;
                            }            
                        } else {
                            return game;
                        }                    
                    })
                    allDataFilterGenre.length > 0
                        ? res.status(200).json(allDataFilterGenre.slice(0, 15))
                        : res.status(200).send("Don't found any Game with this name and rating. Try again please ...");
                } else {
                    // Filter: With Name - WithOut: Genre and Rating                
                    allFilterGames.length > 0
                        ? res.status(200).json(allFilterGames.slice(0, 15))
                        : res.status(200).send("Don't found any Game with this name. Try with other name please ...");
                }             
            }
        }
    } catch (error){
        next(error)
    }
});

router.get('/:idVideogame', async (req, res, next) => {
    try {
        const { idVideogame } = req.params;
        if(idVideogame.toString().length < 15) {
            const idApiVideogame = []
            await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)                                                
                .then(game => {
                    // FALTA: AGREGAR SI NO ENCUENTRA EL GAME RESUESTA
                    idApiVideogame.push({
                            name: game.data.name,
                            id: game.data.id,
                            genres: game.data.genres,
                            released: game.data.released,
                            rating: game.data.rating,
                            description: game.data.description,
                            image: game.data.background_image,
                            platforms: game.data.platforms
                        })
                    idApiVideogame.length === 0
                        ? res.status(200).send('API: Game dont exist, try with other game')
                        : res.status(200).json(idApiVideogame)
                });                
        } else {
            const dbIdVideogame = await Videogame.findByPk(idVideogame, {
                include: Genre
            });
            dbIdVideogame
                ? res.status(200).json(dbIdVideogame)
                : res.status(200).send("DB: Game don't exist, try with other game.");
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next)=>{
    const { name, description, image, released, rating, platforms, genres } = req.body;
    console.log(req.body)
    try{
        const newVideogame = await Videogame.create({            
                name,
                description,
                image,
                released,
                rating, 
                platforms
            });
        genres.map(async (genre) => {
            let genresId = await Genre.findAll({
                where: { name: genre }
            })
            newVideogame.addGenre(genresId);
        })
        res.status(200).send(newVideogame);
    } catch (error){
        next(error)
    }
});


module.exports = router;