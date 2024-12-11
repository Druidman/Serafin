import { getWindow } from "./window.js"


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

    container.appendChild(verse.cloneNode(true))
    return true
}

export { updateWindow, loadVerse, prevVerse, nextVerse, verse }