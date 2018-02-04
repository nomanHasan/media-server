const Folder = require('../models/folder');
const R = require('ramda');

_this = this;

const fileFields = 'name title artist album year duration path';
const folderFields = 'name type'

exports.getFolders  = async (page = 1, limit = 0) => {

    const root = R.last(process.env.DEFAULT_DIRECTORY.split("/"));

    

    const options = {
        page,
        limit
    }

    const folders = await Folder.findOne({name: root})
    .populate('files', fileFields)
    .populate('folders', folderFields);;
    return folders;
}

exports.getFolderById = async (id) => {
    const folder = await Folder.findOne({_id: id })
    .populate('files', fileFields)
    .populate('folders', folderFields);
    return folder;
}
