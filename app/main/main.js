const { app, BrowserWindow } = require('electron')
const path = require('path');
const database = require('../../db/database')
const { setupIpcHandlers } = require("./ipcHandlers")

async function setup_app(){
    
    db = database.ConnectDatabase()
    
    await database.Config(db)
    
    setupIpcHandlers(db)

    createWindow()
}

const createWindow = () => {
  

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  var path_to_index = path.join(__dirname,"../renderer/index.html")
  win.loadFile(path_to_index)
}


app.whenReady().then(() => {
  setup_app()

  
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



