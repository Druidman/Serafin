import { updateSongById } from "../shared/ipcHandlers.js"
import { switchToIndex } from "../shared/viewModifiers.js"

function editorSaveButton_click_event(event){
    var editedText = document.getElementById("textEditingArea").textContent
    
    var verses = editedText.split(/\( SLAJD \d+ \)/)
    verses.shift()
    

    const id = document.getElementById("editorOptions").getAttribute("data-value")
    const rowToEdit = "lyrics"
    

    updateSongById(id,rowToEdit,verses)

}
function handleReturnButtonClickEvent(event){
    switchToIndex()
}

document.getElementById("editorSaveButton").addEventListener("click",editorSaveButton_click_event)
document.getElementById("returnButton").addEventListener("click",handleReturnButtonClickEvent)
