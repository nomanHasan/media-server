const express = require('express');
const router = express.Router();

const album = require('./api/album.api');
const artist = require('./api/artist.api');
const file = require('./api/file.api');
const genre = require('./api/genre.api');
const track = require('./api/track.api');



router.use('/albums', album);
router.use('/artists', artist);
router.use('/genres', genre);
router.use('/tracks', track);
router.use('/files', file);

module.exports = router;
