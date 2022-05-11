const { Router } = require('express');
const axios = require("axios");
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require('../../src/db.js')

const router = Router();

router.get('/', async (req, res, next)=>{
    try{
        const dataGenre = await Genre.findAll()
        if(dataGenre.length === 0){
            await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(genres => genres.data.results)
            .then(genres => {
                genres.map(g => 
                    Genre.create({
                        id: g.id,
                        name: g.name
                    }))
                })
            const dataGenre1 = await Genre.findAll()
            res.status(200).json(dataGenre1);
        } else {
            res.status(200).json(dataGenre); 
        } 
        
    } catch (error){
        next(error)
    }
})

module.exports = router;