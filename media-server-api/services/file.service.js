var File = require('../models/file');
var filex = require('../filex');

_this = this;

const selectFields = 'name title artist album year'

exports.getFiles  = async (page = 1, limit = 0) => {

    const options = {
        select: selectFields,
        page,
        limit
    }

    const files = await File.paginate({}, options);
    return files;
}

exports.queryFiles = async (params, page = 1, limit = 100) => {
    const options = {
        select: selectFields,
        page,
        limit
    }

    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);


    const files = await File.paginate({
        ...params
    }, options);

    return files;
}

exports.getFile = async (id) => {
    let file;
    try {
        file = await File.findById(id);
    } catch (error) {
        throw Error('Error while getting File by ID')    
    }

    return file;
}

exports.aggregateField = async (field='album', page=0, limit=1000) => {
    let entries;
    try {
        entries = await File.aggregate([
            {
                $group: {
                    _id: `$${field}`
                }
            },
            {
                $limit: limit
            }
        ]);
    } catch (error) {
        throw Error(`Error occured when fetching ${field}s`);
    }
    return entries;
}