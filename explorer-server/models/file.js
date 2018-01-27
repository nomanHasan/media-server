var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var FileSchema = new mongoose.Schema({
    name: String,
    path: String,
    size: String,
    type: Date,
    lastModifiedDate: String
})

FileSchema.plugin(mongoosePaginate)
const File = mongoose.model('File', FileSchema)

module.exports = File;