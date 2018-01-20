var express = require('express');
var router = express.Router();
const url = require('url');
const filex = require('../../filex');

const fileList = filex.getFlattenedFiles(process.env.DEFAULT_DIRECTORY);

router.get('/files', function (req, res, next) {

    const mp3Expression = /\.*$/

    let mp3Files = fileList.filter(f => f.match(mp3Expression))

    const fileNameExpression = /\/([^\/]*)\.(\mp3)/


    const getName = expression => (source) => {
        let match = source.match(expression)
        if (match) {
            return match[1]
        } else {
            return ''
        }
    }

    mp3Files = mp3Files.map(f => {
        return [
            f,
            getName(fileNameExpression)(f)
        ]
    })


    res.json(mp3Files);
});

router.get('/file/:fileId', function(req, res, next) {
    let fileId = req.params.fileId;
    // fileId = fileId.replace(/%20/g, " ");
    // console.log(fileId);
    
    let file = fileList[fileId];



    res.download(file);
});

module.exports = router;
