const { app, BrowserWindow } = require('electron')
const path = require('path');
const database = require('../../db/database')
const { setupIpcHandlers, sendConfig } = require("./mainIpcHandlers.js")
const { createMainWindow } = require("./windowManager/mainWindow.js");




async function setup_app(){

    const path_to_index = path.join(__dirname,"../renderer/mainWindow/pages/mainWindow.html")
    const path_to_select = path.join(__dirname,"../renderer/mainWindow/pages/selectDb.html")
    const path_to_db = path.join(process.cwd(),"Songs.db")
    
    db = database.ConnectDatabase(path_to_db)
    const win = createMainWindow()
    setupIpcHandlers(db,win)
    if (!db){
      win.loadFile(path_to_select)
      
    }
    else {

      win.loadFile(path_to_index)
    }
    
    
    
    
    win.once("closed",()=>{
      app.quit()
      console.log("CLOSED")
    })
    
    win.on("ready-to-show",()=>{
      win.show()
      
    })
    
    

}

app.whenReady().then(() => {
  setup_app()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0){
    createMainWindow()
  }
})





