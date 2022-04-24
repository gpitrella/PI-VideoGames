const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next)=>{
    try{
        res.status(200).send("Estoy en Genres");
    } catch (error){
        next(error)
    }
})

module.exports = router;