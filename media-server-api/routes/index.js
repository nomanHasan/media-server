var express = require('express');
var router = express.Router();
const filex = require('../filex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    title: 'File Explorer'
  })
});

module.exports = router;
