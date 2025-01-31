import { openDisplayWindow,checkDisplayWindowActive,writeToDisplayWindow} from "./ipcHandlers.js"

var displayWindId = null
function nextVerse(){
    var verse = document.getElementsByClassName("currentVerse")[0]
    if (!verse || verse.nextSibling == null || !verse.nextSibling.classList.contains("verseBox")){
        return false
    }
    verse.classList.remove("currentVerse")

    verse.nextSibling.classList.add("currentVerse")
    var playButton = document.getElementById("play")
    var state = playButton.getAttribute("data-value")
    if (state == "hidden"){
        return true
    }
    if (!updateWindow()){
        return false
    }
    return true
    
}

function prevVerse(){
    var verse = document.getElementsByClassName("currentVerse")[0]
    if (!verse || verse.previousSibling == null || !verse.previousSibling.classList.contains("verseBox")){
        return false
    }
    verse.classList.remove("currentVerse")

    verse.previousSibling.classList.add("currentVerse")
    var playButton = document.getElementById("play")
    var state = playButton.getAttribute("data-value")
    if (state == "hidden"){
        return true
    }
    if (!updateWindow()){
        return false
    }
    return true
    
}

function updateWindow(){
    var playButton = document.getElementById("play")
    var state = playButton.getAttribute("data-value")
    if (state != "shown"){
        return false
    }
  
    var verse = document.getElementsByClassName("currentVerse")[0]

    if (!verse || !checkWindowActive() || !verse.textContent){
        return false
    }

    writeToWindow(verse.textContent)
    
    return true
}

function hideWindow(){
    writeToWindow("")
   
    
}
function showWindow(){
    updateWindow()
}

function openWindow(){
    
    var cords = document.getElementById("availableDisplays").value
   
    displayWindId = openDisplayWindow(cords)
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

export { updateWindow, prevVerse, nextVerse, hideWindow, showWindow, openWindow, checkWindowActive}