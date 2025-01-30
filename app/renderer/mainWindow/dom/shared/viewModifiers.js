import { loadStylesheet } from "./utils.js"

import { handleKeyPressEvent } from "../index/indexEventHandlers.js"
import { loadEditElement, resetEditor, setEditorControls } from "../editor/elementUpdaters.js"



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

    resetEditor()
    setEditorControls()
    
    if (editElement){
        loadEditElement(editElement)
    }
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