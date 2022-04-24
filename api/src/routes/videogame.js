const axios = require("axios");
// const e = require("express");
require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const { Videogame } = require('../../src/db.js')
const router = Router();

router.get('/', async (req, res, next)=>{
    
    try{
        const { name } = req.query;
        const allApiVideogames = []
        let data = [1, 2, 3, 4, 5].map((n) => {
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

        await Promise.all(data)

        const dbVideogames = await Videogame.findAll();
        if(!name){
                res.status(200).json(dbVideogames.concat(allApiVideogames));
        } else {
            const filterApiVideogames = dbVideogames.concat(allApiVideogames).filter(game => game.name.includes(name));
            filterApiVideogames.length > 0
                ? res.status(200).json(filterApiVideogames.slice(0, 15))
                : res.status(400).send("Don't found any Game with this name. Try again please ...");
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
                    res.status(200).json(idApiVideogame)
                });                
        } else {
            const dbIdVideogame = await Videogame.findByPk(idVideogame);
            console.log(dbIdVideogame)
            dbIdVideogame
                ? res.status(200).json(dbIdVideogame)
                : res.status(404).send("DB: Game don't exist, try with other game.");
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next)=>{
    const { name, description, released, rating, platforms } = req.body;
    try{
        const newVideogame = await Videogame.create(req.body);
        res.status(200).send(newVideogame);
    } catch (error){
        next(error)
    }
});


module.exports = router;