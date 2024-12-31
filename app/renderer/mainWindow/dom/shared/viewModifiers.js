import { loadStylesheet } from "./utils.js"
import { getSongFullById } from "./ipcHandlers.js"
import { handleKeyPressEvent } from "../index/indexEventHandlers.js"



function scrollPlayView(){
    var currVerse = document.getElementsByClassName("currentVerse")[0]
    var verseRect = currVerse.getBoundingClientRect()

    var playView = document.getElementById("playView")
    var playViewRect = playView.getBoundingClientRect()
    
    if (verseRect.bottom > playViewRect.bottom)
        currVerse.scrollIntoView({
            behavior: "smooth", 
            block: "start"
        })
    else if (verseRect.top < playViewRect.top){
        currVerse.scrollIntoView({
            behavior: "smooth", 
            block: "end"
        })
    }

   
}
function switchToEditor(editElement){
    
    document.removeEventListener("keydown",handleKeyPressEvent)
    loadStylesheet("editorStyles.css")
    var textEditor = document.getElementById("textEditingArea")
    var editorOptions = document.getElementById("editorOptions")
    
    var fullText = ""
  
    var slideNum = 1
    var lyrics = getSongFullById(editElement.id)
    for (var verse of lyrics){
        fullText += `<br><br>( SLAJD ${slideNum} )<br>${verse}`
        slideNum++
    }
    textEditor.innerHTML = fullText.replaceAll("\n","<br>")
    
    editorOptions.setAttribute("data-value",editElement.id)
}
function switchToIndex(){
    console.log(index)
    document.addEventListener("keydown",handleKeyPressEvent)
    loadStylesheet("indexStyles.css")
}
export{ 
    scrollPlayView,
    switchToEditor,
    switchToIndex }