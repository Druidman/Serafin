
import * as displayWind from "./window.js"

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

    if (!verse || !displayWind.checkWindowActive()){
        return false
    }

    displayWind.writeToWindow(verse.textContent)
    
    return true
}

function hideWindow(){
    displayWind.writeToWindow("")
    console.log("hide wind")
    
}
function showWindow(){
    updateWindow()
}

export { updateWindow, prevVerse, nextVerse, hideWindow,showWindow }