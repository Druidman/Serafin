const { app, BrowserWindow } = require('electron')
const path = require('path');
const database = require('../../db/database')
const { setupIpcHandlers, sendConfig } = require("./mainIpcHandlers.js")
const { createMainWindow } = require("./windowManager/mainWindow.js");




async function setup_app(){
    
    db = database.ConnectDatabase()
    const win = createMainWindow()
    
    await database.Config(db)
    //win.hide()

    setupIpcHandlers(db)
    var path_to_index = path.join(__dirname,"../renderer/mainWindow/pages/mainWindow.html")
    win.loadFile(path_to_index)
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





