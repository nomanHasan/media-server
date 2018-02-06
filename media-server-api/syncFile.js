const R = require('ramda');
var mongoose = require('mongoose');
var File = require('./models/file');
var Folder = require('./models/folder');
var filex = require('./filex');
const readMetadata = require('./metadata');

const mongoURL = 'mongodb://127.0.0.1:27017/filex';

// mongoose.set('debug', true);
mongoose
    .connect(mongoURL, )
    .then(async() => {
        console.log(`Succesfully Connected to the Mongodb Database  at URL : ${mongoURL}`);

        await readFiles();
        console.log('Synced All Files');
    })
    .catch(() => {
        console.log(`Error Connecting to the Mongodb Database at URL : ${mongoURL}`)
    });

require('dotenv').config();


const getFolder = p => {
	let tree = p.split('/');
	let rootIndex = tree.indexOf("Entertainment");
    tree = tree.slice(rootIndex+1, tree.length - 1);
	return tree;
}


const readFiles = async function () {
    const fileList = filex.getFlattenedFiles(process.env.DEFAULT_DIRECTORY);
    const mp3Expression = /\.*mp3$/

    let mp3Files = fileList.filter(f => f.match(mp3Expression))

    const fileNameExpression = /\/([^\/]*)\.(\mp3)/

    const getName = expression => (source) => {
        let match = source.match(expression)
        if (match) {
            return match[1]
        } else {
            return ''
        }
    }

    mp3Files = await Promise.all(mp3Files.map(async (f, index) => {
        // console.log(index);
        let metadata = {};

        try {
            
            metadata = await readMetadata(f);
        
        } catch (error) {
            // console.error(index)
            // metadata = {}
        }
        return {
            path: f, name: getName(fileNameExpression)(f),
            ...metadata
        }
    }))

    // var getMetadatas = mp3Files.map(f => {     return readMetadata(f.path); })
    // const metadatas = await Promise.all(getMetadatas);

    await File.remove();

    // await mp3Files.forEach(async(element) => {
    //     const mf = new File({
    //         ...element
    //     });
    //     await mf.save();
    // });

    await File.insertMany(mp3Files);

    let files = await File.find();


    await Folder.remove();

    for(let f of files){

        let folders = getFolder(f.path);

        const folderName = R.last(folders);
        const tillLast = folders.slice(0, folders.length -1);

        let folder = await Folder.findOne({ name: folderName })
        

        if(!folder) {
            folder = new Folder({name: folderName});
            await folder.save();
        }

        folder.files.push(f._id);
        await folder.save();

        
        let childId = folder._id;
        for(let fName of tillLast.reverse()) {

            let pFolder = await Folder.findOne({name: fName});

            // pFolder ? console.log(pFolder.name): console.log(fName+' Null');

            if(!pFolder) {
                pFolder = new Folder({name: fName});
            }

            let cIndex = pFolder.folders.indexOf(childId);

            if(cIndex < 0) {
                pFolder.folders.push(childId)
            }
            childId = pFolder._id;
            await pFolder.save();

        }
    };

    return mp3Files;
}


createFolder = name => {
    return {
        name,
        type: "folder",
        folders: [],
        files: []
    }
}

FolderTree = {};
insertIntoTree = (fp, object) => {

	let container = FolderTree;
	for(let i =0; i< fp.length; i++){
		let folder = fp[i];
		if(!container[folder]) {
			container[folder] = {}
		}
		container = container[folder];
	}
	
	if(!container.files) {
		container.files = []
    }
	container.files.push(object);
} 

FolderTree = createFolder("FolderTree");

insertIntoTree2 = (fp, object) => {

	let container = FolderTree;
	for(let i =0; i< fp.length; i++){
		let folderName = fp[i];
		let subdir = container.directories.find(d => d.name === folderName);
		if(!subdir) {
			container.directories.push(createFolder(folderName))
		}
		container = container.directories.find(d => d.name === folderName);
	}
	
	if(!container.files) {
		container.files = []
    }
	container.files.push(object);
} 