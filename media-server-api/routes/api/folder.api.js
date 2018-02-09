var express = require('express');
var router = express.Router();
const url = require('url');
const filex = require('../../filex');
const folderService = require('../../services/folder.service');

router.get('/', async function (req, res, next) {
    
    let folders;
    
    try {

        folders = await folderService.getFolders();
        
    } catch (error) {
           return res.status(400).json({status: 400, message: 'File not Found'});
    }

    return res.status(200).json(folders);
});

router.get('/:id/alltracks', async function (req, res, next) {

    let folderId = req.params.id;

    let folder;
    
    try {

        folder = await folderService.getFolderByIdWithAllTracks(folderId);
        
    } catch (error) {
           return res.status(400).json({status: 400, message: 'File not Found'});
    }

    return res.status(200).json(folder);
});

router.get('/:id', async function (req, res, next) {
    
    let folderId = req.params.id;

    let folder;
    
    try {

        folder = await folderService.getFolderById(folderId);
        
    } catch (error) {
           return res.status(400).json({status: 400, message: 'File not Found'});
    }

    return res.status(200).json(folder);
});

module.exports = router;
