var Folder = require('../models/folder');

_this = this;

exports.getFolders  = async (page = 1, limit = 0) => {

    const options = {
        page,
        limit
    }

    const folders = await Folder.findOne({name: "Music"});
    return folders;
}

exports.getFolderById = async (id) => {
    const folder = await Folder.findOne({_id: id }).populate('files');
    return folder;
}
