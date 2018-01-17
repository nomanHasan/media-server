var express = require('express');
var router = express.Router();
const filex = require('../filex');
const api = require('./api/files');

router.use('/api', api);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'File Explorer'});
});

module.exports = router;
