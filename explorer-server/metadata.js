var fs = require('fs');
var mm = require('musicmetadata');

module.exports = readMetadata = url => {

    const readStream = fs.createReadStream(url);

    return new Promise((resolve, reject) => {
        var parser = mm(readStream, function (err, metadata) {
            if (err) {
                return reject(err);
            }
            readStream.close();
            return resolve(metadata);
        })
    })
}
