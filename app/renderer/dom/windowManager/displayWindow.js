import { getWindow } from "./window.js"

var verse = null

function nextVerse(){
    verse = document.getElementsByClassName("currentVerse")[0]
    if (!verse || verse.nextSibling == null || !verse.nextSibling.classList.contains("verseBox")){
        return false
    }
    verse.classList.remove("currentVerse")

    verse.nextSibling.classList.add("currentVerse")
    
    if (!updateWindow()){
        return false
    }

    return true
}

function prevVerse(){
    verse = document.getElementsByClassName("currentVerse")[0]
    if (!verse || verse.previousSibling == null || !verse.previousSibling.classList.contains("verseBox")){
        return false
    }
    verse.classList.remove("currentVerse")

    verse.previousSibling.classList.add("currentVerse")
    
    if (!updateWindow()){
        return false
    }
    return true
    
}

function updateWindow(){
    var displayWind = getWindow("displayWind")
    verse = document.getElementsByClassName("currentVerse")[0]

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

function hidWindow(){
    var doc = getWindow("displayWind").document
    var container = doc.getElementById("container")
    container.innerHTML = ''

}

export { updateWindow, prevVerse, nextVerse, hidWindow }