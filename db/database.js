const { ConnectDatabase }  = require("./connect")
const { Config } = require("./config/config")
const songs = require("./tables/Songs")

async function getSongsPreview(event,amount,db){
    event.returnValue = await songs.read_titles(amount,db)
}
async function getSongsByPrefix(event,prefix,db){
    event.returnValue = await songs.getByPrefix(prefix,db)
}

module.exports = { 
    ConnectDatabase,
    getSongsPreview,
    getSongsByPrefix,
    Config

}