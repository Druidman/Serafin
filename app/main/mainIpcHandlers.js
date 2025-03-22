const { ipcMain, screen, dialog } = require('electron')
const database = require('../../db/database')
const displayWind = require("./windowManager/displayWindow")
const fs = require("fs")
const path = require('path')
const path_to_index = path.join(__dirname,"../renderer/mainWindow/pages/mainWindow.html")
const path_to_db = path.join(process.cwd(),"Songs.db")



const configFilePath = path.join(process.cwd(),"config.json")

function getConfig(){
    if (!fs.existsSync(configFilePath)){
        return false
    }
    else {
        var data = fs.readFileSync(configFilePath,"utf-8")
        return data
    }
    

}



function setupIpcHandlers(db,win){
    
    ipcMain.on("switchToIndex",(Event)=>{
        db = database.ConnectDatabase(path_to_db)
        setupIpcHandlers(db,win)
        win.loadFile(path_to_index)
        
        Event.returnValue = true
    })
    ipcMain.on("getSongsPreview",(Event,categoryName)=>{
        database.getSongsPreview(Event,categoryName,db)
        console.debug("getSongsPreview: IPC")
       
    })

    ipcMain.on("getSongsByPrefix",(Event,prefix,categoryName)=>{
        database.getSongsByPrefix(Event,prefix,categoryName,db)
        console.debug("getSongsByPrefix: IPC")
    })

    ipcMain.on("getSongFullById", (Event,id)=>{
        database.getSongFullById(Event,id,db)
        console.debug("getSongFullById: IPC")
    })
    ipcMain.on("getSongCategories", (Event)=>{
        database.getSongCategories(Event,db)
        console.debug("getSongCategories: IPC")
    })
    ipcMain.on("updateSongById",(Event,id,values)=>{
        database.updateSongById(Event,id,values,db)
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

    ipcMain.on("openFileDialog", (Event,properties)=>{
        var paths = dialog.showOpenDialogSync({properties: properties})
        var dataFromFiles = []
        if (paths !== undefined){
            paths.map((path)=>{
                var data = fs.readFileSync(path,"utf-8")
                dataFromFiles.push({
                    "data": data,
                    "filePath": path
                })
            })
        }
        Event.returnValue = JSON.stringify(dataFromFiles)
    })
    ipcMain.on("createSong",(Event,values)=>{
        database.createSong(Event,values,db)
        console.debug("createSong: IPC")
    })

    ipcMain.on("createDatabaseFromJSON",async (Event,JSONData)=>{
        JSONData = JSON.parse(JSONData)
        await database.CreateDatabaseFromJson(path_to_db,JSONData)
        Event.returnValue = true
    })

    ipcMain.on("loadDatabase",async (Event,DbPath)=>{
    
        var newDbPath = path_to_db
        var originalDbPath = DbPath
        console.log(newDbPath)
        console.log(originalDbPath)
        fs.copyFileSync(originalDbPath,newDbPath)
        Event.returnValue = true
   
        
        
        
        

    })
  

    ipcMain.on("saveConfig",(Event,values)=>{
        if (Object.keys(values).length == 0){
            return 
        }
        fs.writeFileSync(configFilePath,JSON.stringify(values),(err)=>{
            if (!err){
                console.debug("Config state saved")
            }
            else {
                console.error("Config save FAILED")
            }
        })

        Event.returnValue = true
    })
    ipcMain.on("getConfig",(Event)=>{
    
        Event.returnValue = getConfig()
    })
  
}


module.exports = { setupIpcHandlers }
