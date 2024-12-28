import { openDisplayWindow,checkDisplayWindowActive,writeToDisplayWindow} from "../index/ipcHandlers.js"

var displayWindId = null
async function openNewWindow(){
    
    displayWindId = openDisplayWindow()
    console.log(displayWindId)
    
}

function checkWindowActive(){
    if (!displayWindId){
        return false
    }
    if (!checkDisplayWindowActive(displayWindId)){
        return false
    }
    return true
    
  
}

function writeToWindow(data){
    writeToDisplayWindow(displayWindId,data)
}


export { openNewWindow, checkWindowActive,writeToWindow }