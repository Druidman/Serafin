const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const database = require('../../db/database')

const db = database.ConnectDatabase()
async function getData(event,amount){
    console.log(amount)
    event.returnValue = await database.songs.read_titles(amount,db)
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
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


ipcMain.on("getData",getData)
