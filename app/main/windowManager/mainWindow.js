
const { BrowserWindow } = require('electron')
const path = require("path")

function createMainWindow(){
  

  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preloads/mainWindowPreload.js')
    },
    show: false
 
  })

  return win
}

module.exports = {
    createMainWindow
}
