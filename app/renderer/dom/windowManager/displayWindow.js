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
    versecopy.setAttribute("id","currVerse")

    container.appendChild(versecopy)
    console.log(verse)
    if (verse.textContent != " "){
        setFontSize()
    }
    
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

function setFontSize(){
    var displayWind = getWindow("displayWind")
    var displayDoc = displayWind.document

    var verseBox = displayDoc.getElementById("currVerse")
    var boxRect = verseBox.getBoundingClientRect()

    var text = verseBox.children[0]
    var textRect = text.getBoundingClientRect()
    var fontSizeInPx = getComputedStyle(text).fontSize
    var fontSize = Number(fontSizeInPx.slice(0,fontSizeInPx.length-2))

    while (textRect.bottom < boxRect.bottom-10){
        text.style.fontSize = `${fontSize + 1}px`
        var boxRect = verseBox.getBoundingClientRect()

        text = verseBox.children[0]
        textRect = text.getBoundingClientRect()
        fontSizeInPx = getComputedStyle(text).fontSize
        fontSize = Number(fontSizeInPx.slice(0,fontSizeInPx.length-2))

    }
    text.style.fontSize = `${fontSize - 1}px`
    
    return

}

export { updateWindow, prevVerse, nextVerse, hideWindow,showWindow }