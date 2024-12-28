const { BrowserWindow } = require("electron")
const path = require("path")


function openWindow(){
    const window = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preloadDisplay.js')
        }
    })
    const path_to_display = path.join(__dirname,"../renderer/windows/displayWindow.html")
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
    console.log("wrote")

}
function setFontSize(){
    console.log("font size")
}
module.exports = { openWindow, checkWindowActive, write,setFontSize }
