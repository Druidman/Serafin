import { getWindow } from "./window.js"


var verse = null

function loadVerse(firstverse){
    verse = firstverse
}

function nextVerse(){
    if (verse.nextSibling == null){
        return
    }
    verse = verse.nextSibling
    updateWindow()
}

function prevVerse(){
    if (verse.previousSibling == null){
        return
    }
    verse = verse.previousSibling
    updateWindow()
    
}

function updateWindow(){
    var displayWind = getWindow("displayWind")
    console.log(displayWind)
    console.log(verse)

    if (!displayWind || !verse){
        return
    }
    console.log("passes")
    
    var doc = displayWind.document
    var container = doc.getElementById("container")
    container.innerHTML = ''

    container.appendChild(verse.cloneNode(true))
}

export { updateWindow, loadVerse, prevVerse, nextVerse }