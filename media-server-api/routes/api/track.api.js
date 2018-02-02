const express = require('express');
const router = express.Router();
const url = require('url');
const filex = require('../../filex');
const fileService = require('../../services/file.service');

router.get('/', async (req, res, next) => {

    const limit = req.params.limit || 1000;
    const page = req.params.page || 1;

    let mp3Files;

    try {
        mp3Files = await fileService.getFiles(page, limit);

    } catch (error) {
        return res.status(400).json({status: 400, message: "Not succesful"});
    }
    return res.json(mp3Files);
});

router.get('/query', async (req, res, next) => {

    const {title, album, genre, artist, albumartist, year, duration} = req.query;

    let files;
    
    try {
         files = await fileService.queryFiles(
            {title, album, genre, artist, albumartist, year, duration}
        );
        
    } catch (error) {
        return res.status(400).json({status: 400, message: 'No match found'});
    }

    return res.status(200).json(files)

})




router.get('/id/:fileId', async (req, res, next) => {
    let fileId = req.params.fileId;

    
    let file;
    
    try {

        file = await fileService.getFile(fileId);
        
    } catch (error) {
           return res.status(400).json({status: 400, message: 'File not Found'});
    }

    return res.status(200).json(file);
});




module.exports = router;
