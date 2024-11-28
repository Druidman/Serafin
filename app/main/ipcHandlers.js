const { ipcMain } = require('electron')
const database = require('../../db/database')


function setupIpcHandlers(db){
    
    ipcMain.on("getSongsPreview",(Event,amount)=>{
        database.getSongsPreview(Event,amount,db)
        console.log("songsprevew",amount)
    })

    ipcMain.on("getSongsByPrefix",(Event,prefix)=>{
        database.getSongsByPrefix(Event,prefix,db)
        
    })
}

module.exports = { setupIpcHandlers }
