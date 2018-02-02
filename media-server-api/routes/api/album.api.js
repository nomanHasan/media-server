const express = require('express');
const router = express.Router();
const url = require('url');
const File = require('../../models/file');
const fileService = require('../../services/file.service');

router.get('/', async (req, res, next) => {
    let albums;

    try {
        
        albums = await fileService.aggregateField('album', 1, 1000);

    } catch (error) {
        return res.status(400).json({error});
    }
    return res.status(200).json({albums});

});

router.get('/tracks', async (req, res, next) => {
    let tracks;

    const {album} = req.query;

    if(!album) {
        return res.status(400).json({error: 'Not a valid Album'});
    }

    try {
        
        tracks = await fileService.queryFiles({album});

    } catch (error) {
        return res.status(400).json({error});
    }
    return res.status(200).json({tracks});
})

module.exports = router;
