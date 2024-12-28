
const { BrowserWindow } = require('electron')
const path = require("path")

function createMainWindow(){
  

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, '../preloads/mainWindowPreload.js')
    }
 
  })
  var path_to_loading = path.join(__dirname,"../../renderer/windows/loading.html")
  win.loadFile(path_to_loading)
  return win
}

module.exports = {
    createMainWindow
}