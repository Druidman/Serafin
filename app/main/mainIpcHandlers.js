const { ipcMain, screen } = require('electron')
const database = require('../../db/database')
const displayWind = require("./windowManager/displayWindow")


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
    ipcMain.on("updateSongById",(Event,id,rowToEdit,valueToInsert)=>{
        database.updateSongById(Event,id,rowToEdit,valueToInsert,db)
        console.debug("updateSongById: IPC")
    })
    ipcMain.on("openDisplayWindow",async (Event,cords)=>{
        
        cords = JSON.parse(cords)
        Event.returnValue = await displayWind.createWindow(cords)
    })
    ipcMain.on("checkDisplayWindowActive",(Event,id)=>{
        Event.returnValue = displayWind.checkWindowActive(id)
    })
    ipcMain.on("writeToDisplayWindow",(Event,id,data)=>{
        Event.returnValue = displayWind.write(id,data)
    })

    ipcMain.on("getAllDisplays",(Event)=>{
        Event.returnValue = screen.getAllDisplays()
    })
  
}


module.exports = { setupIpcHandlers }