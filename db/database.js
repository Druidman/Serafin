const { ConnectDatabase }  = require("./connect")
const { Config } = require("./config/config")
const songs = require("./tables/Songs")

async function getSongsPreview(event,amount,db){
    event.returnValue = await songs.getPreviews(amount,db)
}
async function getSongsByPrefix(event,prefix,db){
    event.returnValue = await songs.getByPrefix(prefix,db)
}
async function getSongsFullById(event,ids,db){
    event.returnValue = await songs.getFullById(ids,db)
}
async function getSongFullById(event,id,db){
    event.returnValue = await songs.getFullById([id],db)
    
}
async function getSongCategories(event,db){
    event.returnValue = await songs.getCategories(db)
    
}

module.exports = { 
    ConnectDatabase,
    getSongsPreview,
    getSongsByPrefix,
    getSongsFullById,
    getSongFullById,
    getSongCategories,
    Config

}