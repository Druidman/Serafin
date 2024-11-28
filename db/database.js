const { ConnectDatabase }  = require("./connect")
const { Config } = require("./config/config")
const songs = require("./tables/Songs")

async function getSongsPreview(event,amount,db){
    event.returnValue = await songs.preview(amount,db)
}
async function getSongsByPrefix(event,prefix,db){
    event.returnValue = await songs.getByPrefix(prefix,db)
}
async function getSongsFullById(event,ids,db){
    event.returnValue = await songs.getFullById(ids,db)
}

module.exports = { 
    ConnectDatabase,
    getSongsPreview,
    getSongsByPrefix,
    getSongsFullById,
    Config

}