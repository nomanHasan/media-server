var express = require('express');
var router = express.Router();
const url = require('url');
const filex = require('../../filex');
const fileService = require('../../services/file.service');

router.get('/:fileId', async function (req, res, next) {
    let fileId = req.params.fileId;

    
    let file;
    
    try {

        file = await fileService.getFile(fileId);
        
    } catch (error) {
           return res.status(400).json({status: 400, message: 'File not Found'});
    }

    return res.download(file.path);
});

module.exports = router;
