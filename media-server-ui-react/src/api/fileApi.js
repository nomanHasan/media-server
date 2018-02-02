
import {HttpClient} from './httpClient' 

// This is the API. The backend root URL can be set from here.

export const API = 'http://192.168.0.104:3002/api'

//Setting the Files URI

export const FILES_API_URL = `${API}/files`
export const FILE_API_URL = `${API}/file`

// The CRUD Operations of the File Resource.


//Create
const createFile = file => {
    return HttpClient.post(FILES_API_URL, file)
}

//Read
const getFiles = () => {
    return HttpClient.get(FILES_API_URL)
}

const getFile = (id) => {
    return HttpClient.get(`${FILES_API_URL}/${id}`)
}

//Update
const updateFile = file => {
    return HttpClient.put(FILES_API_URL, file)
}

//Delete
const removeFile = file => {
    return HttpClient.delete(`${FILES_API_URL}/${file._id}`)
}


//Encapsulating in a JSON object

const FileApi = {createFile, getFiles, updateFile, removeFile}

export {FileApi}