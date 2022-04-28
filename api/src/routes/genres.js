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
                genres.map(g => 
                    Genre.create({
                        id: g.id,
                        name: g.name
                }))
            })
        res.status(200).send("Generos Cargados");
    } catch (error){
        next(error)
    }
})

module.exports = router;