import { getWindow } from "./window.js"
import { scrollPlayView } from "../viewModifiers.js"


var verse = null

function loadVerse(firstverse){
    verse = firstverse
    verse.style.backgroundColor = "#ffffb5"
}

function nextVerse(){
    if (verse.nextSibling == null || !verse.nextSibling.classList.contains("verseBox")){
        return false
    }
    verse.style.backgroundColor = ""
    scrollPlayView("down")

    verse = verse.nextSibling
    verse.style.backgroundColor = "#ffffb5"
    
    if (!updateWindow()){
        return false
    }

    return true
}

function prevVerse(){
    if (verse.previousSibling == null || !verse.previousSibling.classList.contains("verseBox")){
        return false
    }
    verse.style.backgroundColor = ""
    scrollPlayView("up")

    verse = verse.previousSibling
    verse.style.backgroundColor = "#ffffb5"
    
    if (!updateWindow()){
        return false
    }
    return true
    
}

function updateWindow(){
    var displayWind = getWindow("displayWind")
    console.log(displayWind)
    console.log(verse)

    if (!displayWind || !verse){
        return false
    }
    console.log("passes")
    
    var doc = displayWind.document
    var container = doc.getElementById("container")
    container.innerHTML = ''

    var versecopy = verse.cloneNode(true)
    versecopy.style.backgroundColor = "black"

    container.appendChild(versecopy)
    return true
}

export { updateWindow, loadVerse, prevVerse, nextVerse, verse }