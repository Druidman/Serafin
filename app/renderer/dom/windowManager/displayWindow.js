import { getWindow } from "./window.js"

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

    var displayWind = getWindow("displayWind")
  
    var verse = document.getElementsByClassName("currentVerse")[0]

    if (!displayWind || !verse){
        return false
    }

    
    var doc = displayWind.document
    var container = doc.getElementById("container")
    container.innerHTML = ''

    var versecopy = verse.cloneNode(true)
    versecopy.classList.remove("currentVerse")

    container.appendChild(versecopy)
    return true
}

function hideWindow(){
    var doc = getWindow("displayWind").document
    var container = doc.getElementById("container")
    container.innerHTML = ''
}
function showWindow(){
    updateWindow()
}

export { updateWindow, prevVerse, nextVerse, hideWindow,showWindow }