const express = require('express');
const router = express.Router();
const url = require('url');
const filex = require('../../filex');
const fileService = require('../../services/file.service');

router.get('/', async (req, res, next) => {
    let artists;

    try {
        
        artists = await fileService.aggregateField('artist', 1, 1000);

    } catch (error) {
        return res.status(400).json({error});
    }
    return res.status(200).json({artists});

})

router.get('/tracks', async (req, res, next) => {
    let tracks;

    const {artist} = req.query;

    if(!album) {
        return res.status(400).json({error: 'Not a valid Artist'});
    }

    try {
        
        tracks = await fileService.queryFiles({artist});

    } catch (error) {
        return res.status(400).json({error});
    }
    return res.status(200).json({tracks});
})



module.exports = router;
