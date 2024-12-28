const { BrowserWindow } = require("electron")
const path = require("path")


function createWindow(){
    const window = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, '../preloads/displayWindowPreload.js')
        }
    })
    const path_to_display = path.join(__dirname,"../../renderer/windows/displayWindow.html")
    window.loadFile(path_to_display)
    
    return window.id

}

function checkWindowActive(id){
    const wind = BrowserWindow.fromId(id)
    if (!wind){
        return false
    }
    return true
}
function write(id,data){
    const wind = BrowserWindow.fromId(id)
    wind.webContents.send("dataToWrite",data)
    
    console.log("wrote")
    console.log(data)

}

module.exports = { createWindow, checkWindowActive, write }
