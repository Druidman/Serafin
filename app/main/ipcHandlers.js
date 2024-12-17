const { ipcMain } = require('electron')
const database = require('../../db/database')


function setupIpcHandlers(db){
    
    ipcMain.on("getSongsPreview",(Event,amount)=>{
        database.getSongsPreview(Event,amount,db)
        console.debug("getSongsPreview: IPC")
    })

    ipcMain.on("getSongsByPrefix",(Event,prefix)=>{
        database.getSongsByPrefix(Event,prefix,db)
        console.debug("getSongsByPrefix: IPC")
    })
    ipcMain.on("getSongsFullById",(Event,ids)=>{
        database.getSongsFullById(Event,ids,db)
        console.debug("getSongsFullById: IPC")
        
    })
    ipcMain.on("getSongFullById", (Event,id)=>{
        database.getSongFullById(Event,id,db)
        console.debug("getSongFullById: IPC")
    })
    ipcMain.on("getSongCategories", (Event)=>{
        database.getSongCategories(Event,db)
        console.debug("getSongCategories: IPC")
    })
}


module.exports = { setupIpcHandlers }
