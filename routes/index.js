var express = require('express');
var router = express.Router();
const filex = require('../filex');


/* GET home page. */
router.get('/', function(req, res, next) {

  const fileList = filex.getFlattenedFiles('/media/noman/Entertainment/Music')


  const mp3Expression = /\.mp3$/

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
  



  res.render('index', { title: 'Express', files: JSON.stringify(mp3Files) });
});

module.exports = router;
