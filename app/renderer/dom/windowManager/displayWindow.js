import { getWindow } from "./window.js"


var verse = null

function loadVerse(firstverse){
    verse = firstverse
}

function nextVerse(){
    if (verse.nextSibling == null){
        return false
    }
    verse = verse.nextSibling
    if (!updateWindow()){
        return false
    }

    return true
}

function prevVerse(){
    if (verse.previousSibling == null){
        return false
    }
    verse = verse.previousSibling
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

    container.appendChild(verse.cloneNode(true))
    return true
}

export { updateWindow, loadVerse, prevVerse, nextVerse, verse }