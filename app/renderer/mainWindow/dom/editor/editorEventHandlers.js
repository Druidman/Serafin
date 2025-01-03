import { updateSongById, openFileDialog } from "../shared/ipcHandlers.js"
import { switchToIndex } from "../shared/viewModifiers.js"
import { createEditableText } from "./utils.js"

function editorSaveButton_click_event(event){
    var editedText = document.getElementById("textEditingArea").textContent
    
    var verses = editedText.split(/\( SLAJD \d+ \)/)
    verses.shift()
    

    const id = document.getElementById("idInput").getAttribute("value")
    const rowToEdit = "lyrics"
    

    updateSongById(id,rowToEdit,verses)

}
function handleReturnIndexButtonClickEvent(event){
    const confirmMsg = "Zmiany nie zostaną zapisane!\nCzy napewno chcesz wyłączyć edytor?"
    if (window.confirm(confirmMsg)){
        switchToIndex()
    }
    
}
function handleTxtFileLoadButtonClickEvent(event){
    const properties = ["openFile"]
    var dataFromFile = openFileDialog(properties)[0]
    var lyrics = dataFromFile.split(";")
    
    var textEditor = document.getElementById("textEditingArea")
    textEditor.innerHTML = createEditableText(lyrics)
}
function handleJsonFileLoadButtonClickEvent(event){
    const properties = ["openFile"]
    var dataFromFile = openFileDialog(properties)[0]
    var lyrics = JSON.parse(dataFromFile)["lyrics"]

    var textEditor = document.getElementById("textEditingArea")
    textEditor.innerHTML = createEditableText(lyrics)
}


function handleUndoButtonClickEvent(event){

    document.execCommand("undo")
}
function handleRedoButtonClickEvent(event){
    document.execCommand("redo")
    
}



document.getElementById("editorSaveButton").addEventListener("click",editorSaveButton_click_event)
document.getElementById("returnIndexButton").addEventListener("click",handleReturnIndexButtonClickEvent)
document.getElementById("txtFileLoadButton").addEventListener("click",handleTxtFileLoadButtonClickEvent)
document.getElementById("jsonFileLoadButton").addEventListener("click",handleJsonFileLoadButtonClickEvent)
document.getElementById("undoButton").addEventListener("click",handleUndoButtonClickEvent)
document.getElementById("redoButton").addEventListener("click",handleRedoButtonClickEvent)
