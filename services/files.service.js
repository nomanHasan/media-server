var File = require('../models/file');
var filex = require('../filex');


const fileList = filex.getFlattenedFiles(process.env.DEFAULT_DIRECTORY);

exports.readFiles = async function() {
    const mp3Expression = /\.*mp3$/

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
        return {
            path: f,
            name: getName(fileNameExpression)(f)
        }
    })


    await mp3Files.forEach(async (element )=> {
        const mf = new File({...element});
        await mf.save();
    });

    return mp3Files;
}


exports.getFiles  = async function() {
    const files = await File.find();
    return files;
}