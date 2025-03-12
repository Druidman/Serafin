const { ConnectDatabase }  = require("./connect")
const { Config } = require("./config/config")
const songs = require("./tables/Songs")

async function getSongsPreview(event,categoryName,db){
    event.returnValue = await songs.getPreviews(categoryName,db)
}
async function getSongsByPrefix(event,prefix,categoryName,db){
    event.returnValue = await songs.getByPrefix(prefix,categoryName,db)
}

async function getSongFullById(event,id,db){
    event.returnValue = await songs.getFullById(id,db)
    
}
async function getSongCategories(event,db){
    event.returnValue = await songs.getCategories(db)
}
async function updateSongById(event,id,values,db){
    event.returnValue = await songs.updateById(id,values,db)
}
async function createSong(event,values,db){
    event.returnValue = await songs.createSong(values,db)
}

module.exports = { 
    ConnectDatabase,
    getSongsPreview,
    getSongsByPrefix,
    getSongsFullById,
    getSongFullById,
    getSongCategories,
    updateSongById,
    createSong,
    Config

}