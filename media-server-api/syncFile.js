const mongoURL = 'mongodb://127.0.0.1:27017/filex';
var mongoose = require('mongoose');
var File = require('./models/file');
var filex = require('./filex');
const readMetadata = require('./metadata');

mongoose
    .connect(mongoURL)
    .then(async() => {
        console.log(`Succesfully Connected to the Mongodb Database  at URL : ${mongoURL}`);

        await readFiles();
        console.log('Synced All Files');
    })
    .catch(() => {
        console.log(`Error Connecting to the Mongodb Database at URL : ${mongoURL}`)
    });

require('dotenv').config();

const readFiles = async function () {
    const fileList = filex.getFlattenedFiles(process.env.DEFAULT_DIRECTORY);
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

    mp3Files = await Promise.all(mp3Files.map(async f => {
        const metadata = await readMetadata(f);
        return {
            path: f, name: getName(fileNameExpression)(f),
            ...metadata
        }
    }))

    // var getMetadatas = mp3Files.map(f => {     return readMetadata(f.path); })
    // const metadatas = await Promise.all(getMetadatas);

    console.log(mp3Files);

    await File.remove();

    await mp3Files.forEach(async(element) => {
        const mf = new File({
            ...element
        });
        await mf.save();
    });

    return mp3Files;
}
