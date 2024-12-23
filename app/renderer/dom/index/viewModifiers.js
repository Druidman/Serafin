import { loadStylesheet } from "./utils.js"
import { getSongFullById } from "./ipcHandlers.js"

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
    console.log("editor")
    loadStylesheet("editorStyles.css")
    var textEditor = document.getElementById("textEditingArea")
    var fullText = ""
    var ind = 1
    
    var lyrics = getSongFullById(editElement.id)
    for (var verse of lyrics){
        fullText += `<br>${verse}<br><br>`
        ind++
    }
    textEditor.innerHTML = fullText.replaceAll("\n","<br>")
}
function switchToIndex(){
    console.log(index)
   
    loadStylesheet("indexStyles.css")
}
export{ 
    scrollPlayView,
    switchToEditor,
    switchToIndex }