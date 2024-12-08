import { getWindow } from "./window.js"


var verse = null

function loadVerse(firstverse){
    verse = firstverse
}

function nextVerse(){
    verse = verse.nextSibling
}

function prevVerse(){
    verse = verse.previousSibling
}

function updateWindow(){
    var displayWind = getWindow("displayWind")

    if (!displayWind || verse){
        return
    }
    
    var doc = displayWind.document
    var body = doc.body

    if (!body.innerHTML){
        return
    }
    body.innerHTML = ''

    body.appendChild(verse.cloneNode(true))
}

export { updateWindow, loadVerse, prevVerse, nextVerse }