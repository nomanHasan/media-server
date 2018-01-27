const filex = require('./filex');

const fileList = filex.getFlattenedFiles('/media/noman/Entertainment/Music')

// console.log(fileList);




const mp3Expression = /\.mp3$/

let mp3Files = fileList.filter(f => f.match(mp3Expression))


const fileNameExpression = /\/([^\/]*)\.(\mp3)/


const getName = expression => (source, index) => {
    let match = source.match(expression)
    if (match) {
        return match[1]
    } else { 
        return ''
    }
}


const mp3FileNames = mp3Files.map(getName(fileNameExpression))

console.log(mp3FileNames);