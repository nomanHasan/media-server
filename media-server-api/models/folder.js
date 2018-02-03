var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var Schema = mongoose.Schema;

var FolderSchema = new mongoose.Schema({
    name: String,
    path: String,
    size: String,
    type: String,
    lastModifiedDate: Date,


    files: [{type: Schema.Types.ObjectId, ref: 'File'}],
    folders: [{type: Schema.Types.ObjectId, ref: 'Folder'}],    
})

FolderSchema.plugin(mongoosePaginate)
const Folder = mongoose.model('Folder', FolderSchema)

module.exports = Folder;