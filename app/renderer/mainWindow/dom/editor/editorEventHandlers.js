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
function handleReturnButtonClickEvent(event){
    const confirmMsg = "Zmiany nie zostaną zapisane!\nCzy napewno chcesz wyłączyć edytor?"
    if (window.confirm(confirmMsg)){
        switchToIndex()
    }
    
}
function handleTxtFileLoadButtonClick(event){
    const properties = ["openFile"]
    var dataFromFile = openFileDialog(properties)[0]
    var lyrics = dataFromFile.split(";")
    
    var textEditor = document.getElementById("textEditingArea")
    textEditor.innerHTML = createEditableText(lyrics)

    

    

}

document.getElementById("editorSaveButton").addEventListener("click",editorSaveButton_click_event)
document.getElementById("returnButton").addEventListener("click",handleReturnButtonClickEvent)
document.getElementById("txtFileLoadButton").addEventListener("click",handleTxtFileLoadButtonClick)
