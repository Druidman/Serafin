const { BrowserWindow } = require("electron")
const path = require("path")


function createWindow(cords){
    
    const x = cords["x"]
    const y = cords["y"]

    const window = new BrowserWindow({
        x: x,
        y: y,
        fullscreen: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, '../preloads/displayWindowPreload.js')
        }
    })
    
    const path_to_display = path.join(__dirname,"../../renderer/displayWindow/pages/displayWindow.html")
    window.loadFile(path_to_display)
    return new Promise((resolve,reject)=>{
        window.once("ready-to-show",()=>{
            resolve(window.id)
        })
    })


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
