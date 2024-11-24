const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const { ConnectDatabase } = require('../../db/connect')

function getData(event){
    event.returnValue = [["siemaa","g"],["siemee","f"],["siemww","d"],["siem","s"]]
}
const createWindow = () => {
  const db = ConnectDatabase()
  console.log(db)
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
