var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var noofSchema = new mongoose.Schema({
    _id: false,
    no: Number,
    of: Number
})

var FileSchema = new mongoose.Schema({
    name: String,
    path: String,
    size: String,
    type: String,
    lastModifiedDate: Date,

    title: String,
    artist: [String],
    albumartist: [String],
    album: String,
    year: String,
    track: noofSchema,
    genre: [String],
    disk: noofSchema,
    picture: [],
    duration: Number
})


FileSchema.plugin(mongoosePaginate)
const File = mongoose.model('File', FileSchema)

module.exports = File;