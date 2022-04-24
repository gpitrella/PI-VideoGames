const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../../src/db.js')

const router = Router();

router.get('/', async (req, res, next)=>{
    try{
        await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(genres => genres.data.results)
            .then(genres => {
                console.log(genres)
                genres.map(genre => 
                    Genre.create({
                        id: genre.id,
                        name: genre.name
                }))
            })
        res.status(200).send("Generos Cargados");
    } catch (error){
        next(error)
    }
})

module.exports = router;