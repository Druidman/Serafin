const { ipcMain } = require('electron')
const database = require('../../db/database')


function setupIpcHandlers(db){
    
    ipcMain.on("getSongsPreview",(Event,amount,categoryName)=>{
        database.getSongsPreview(Event,amount,categoryName,db)
        console.debug("getSongsPreview: IPC")
    })

    ipcMain.on("getSongsByPrefix",(Event,prefix,categoryName)=>{
        database.getSongsByPrefix(Event,prefix,categoryName,db)
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
