const axios = require("axios");
const e = require("express");
require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const { Videogame, Genre } = require('../../src/db.js')
const router = Router();

router.get('/', async (req, res, next)=>{
    
    try{
        // Trae la data en Promise
        // const apiVideogames = () => {
        //     return axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`) // 
        //         .then(res => res.data.results)
        // }
        // const dbVideogames = Videogame.findAll().then(res => {
        //     let allDbData = []
        //     res.map(e => allDbData.push(e.dataValues));
        //     return allDbData;
        // });

        // const allVideogames = await Promise.all([apiVideogames(), dbVideogames]);
        // res.status(200).json(allVideogames[0].concat(allVideogames[1]));

        // Trae data esperando cada promesa
        const { name } = req.query;
        const allApiVideogames = []
        const apiVideogames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            .then(res => res.data.results)
            .then(res => res.map(game => (
                allApiVideogames.push({
                    name: game.name,
                    id: game.id,
                    genres: game.genres,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms
                })
            )))                
        const dbVideogames = await Videogame.findAll();
        if(!name){
                res.status(200).json(dbVideogames.concat(allApiVideogames));
        } else {
            const filterApiVideogames = dbVideogames.concat(allApiVideogames).filter(game => game.name.includes(name));
            res.status(200).json(filterApiVideogames);
        }
    } catch (error){
        next(error)
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