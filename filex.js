const { lstatSync, readdirSync, unlinkSync } = require('fs')
const { join } = require('path')

const isDirectory = source => lstatSync(source).isDirectory()
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)
const getContents = source => readdirSync(source).map(name => join(source, name))

// let result = getDirectoryTree('./src')



const iterate = (acc, val) => {
    if (val == null) {
        return acc;
    }
    if (Array.isArray(val)) {
        return val.reduce(iterate, acc)
    }
    if (typeof val === 'object') {
        return Object.keys(val).map(k => val[k]).reduce(iterate, acc);
    }
    return acc.concat(val);
}

// let flatFiles = flatArray(result)

const count = (array, expression) => array.filter(f => f.match(expression)).length

const getDirectoryTree = source => { 
    return getContents(source).map(cont => {
        conts = []
        if (isDirectory(cont)) {
            conts = conts.concat(getDirectoryTree(cont))
        } else {
            conts.push(cont)
        }
        return conts
    })
}


const flatArray = array => {
    return array.reduce(iterate, [])
}

const getFlattenedFiles = source => flatArray(getDirectoryTree(source))

module.exports = {
    getFlattenedFiles,
    getDirectoryTree
}