const express = require('express');
const router = express.Router();
const url = require('url');
const filex = require('../../filex');
const fileService = require('../../services/file.service');

router.get('/', async (req, res, next) => {
    let genres;

    try {
        
        genres = await fileService.aggregateField('genre', 1, 1000);

    } catch (error) {
        return res.status(400).json({error});
    }
    return res.status(200).json({genres});

})


router.get('/tracks', async (req, res, next) => {
    let tracks;

    const {genre} = req.query;

    if(!album) {
        return res.status(400).json({error: 'Not a valid Genre'});
    }

    try {
        
        tracks = await fileService.queryFiles({genre});

    } catch (error) {
        return res.status(400).json({error});
    }
    return res.status(200).json({tracks});
})



module.exports = router;
