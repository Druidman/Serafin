const { app, BrowserWindow } = require('electron')
const path = require('path');
const database = require('../../db/database')
const { setupIpcHandlers } = require("./ipcHandlers")

async function setup_app(){
    
    db = database.ConnectDatabase()
    const win = createWindow()
    
    await database.Config(db)
    
    setupIpcHandlers(db)
    var path_to_index = path.join(__dirname,"../renderer/windows/mainWindow.html")
    win.loadFile(path_to_index)


    
}

const createWindow = () => {
  

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
 
  })
  var path_to_loading = path.join(__dirname,"../renderer/windows/loading.html")
  win.loadFile(path_to_loading)
  return win
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



