var express = require('express');
var router = express.Router();
const url = require('url');
const filex = require('../../filex');
const fileService = require('../../services/files.service');

// const fileList = filex.getFlattenedFiles(process.env.DEFAULT_DIRECTORY);

router.get('/files', async function (req, res, next) {

    try {
        const data = await fileService.readFiles();
        const mp3Files = await fileService.getFiles();

    } catch (error) {
        return res.status(400).json({status: 400, message: "Not succesful"});
    }
    return res.json(mp3Files);
});

router.get('/file/:fileId', function (req, res, next) {
    let fileId = req.params.fileId;
    // fileId = fileId.replace(/%20/g, " "); console.log(fileId);

    let file = fileList[fileId];

    res.download(file);
});

module.exports = router;
