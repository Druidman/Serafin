import { updateSongById } from "../index/ipcHandlers.js"
function editorSaveButton_click_event(event){
    var editedText = document.getElementById("textEditingArea").textContent
    
    var verses = editedText.split(/\( SLAJD \d+ \)/)
    verses.shift()

    const id = document.getElementById("editorOptions").getAttribute("data-value")
    const rowToEdit = "lyrics"
    const valueToInsert = verses

    updateSongById(id,rowToEdit,valueToInsert)

}

document.getElementById("editorSaveButton").addEventListener("click",editorSaveButton_click_event)

