const { ConnectDatabase }  = require("./connect")
const { Config } = require("./config/config")
const songs = require("./tables/Songs")

async function getSongsPreview(event,amount,categoryName,db){
    event.returnValue = await songs.getPreviews(amount,categoryName,db)
}
async function getSongsByPrefix(event,prefix,categoryName,db){
    event.returnValue = await songs.getByPrefix(prefix,categoryName,db)
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