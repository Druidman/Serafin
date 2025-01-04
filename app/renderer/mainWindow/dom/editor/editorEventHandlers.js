import { updateSongById, openFileDialog, createSong } from "../shared/ipcHandlers.js"
import { switchToIndex } from "../shared/viewModifiers.js"
import { createEditableText, elementWarning, succesfulSummary, failedSummary } from "./utils.js"

function editorSaveButton_click_event(event){
    var editedText = document.getElementById("textEditingArea").textContent
    
    var verses = editedText.split(/\( SLAJD \d+ \)/)
    verses.shift()

    var idValue = document.getElementById("idInput").getAttribute("value")
    var category = document.getElementById("category")
    var title = document.getElementById("title")
    var button = event.currentTarget


    if (!category.value){
        elementWarning(category)
        
        return
    }
    if (!title.value){
        elementWarning(title)
    
        return
    }
    if (!idValue){
        failedSummary(button)
        return
    }

    const values = {
        "title": title.value,
        "category": category.value,
        "lyrics": verses
    }
    var result = updateSongById(idValue,values)
    
    if (result === true){
        succesfulSummary(button) 
    }
    else{
        failedSummary(button)
    }
}
function editorCreateButton_click_event(event){
    var editedText = document.getElementById("textEditingArea").textContent
    
    var verses = editedText.split(/\( SLAJD \d+ \)/)
    verses.shift()

    var idValue = document.getElementById("idInput").getAttribute("value")
    var category = document.getElementById("category")
    var title = document.getElementById("title")
    var button = event.currentTarget

    if (!category.value){
        elementWarning(category)
        return
    }
    if (!title.value){
        elementWarning(title)
        return
    }
    if (idValue){
        failedSummary(button)
        return
    }

    const values = {
        "title": title.value,
        "category": category.value,
        "lyrics": verses
    }
    var result = createSong(values)
    
    if (result === true){
        succesfulSummary(button) 
    }
    else{
        failedSummary(button)
    }
    

}
function handleReturnIndexButtonClickEvent(event){
   
    switchToIndex()
    
    
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
document.getElementById("editorCreateButton").addEventListener("click",editorCreateButton_click_event)
document.getElementById("returnIndexButton").addEventListener("click",handleReturnIndexButtonClickEvent)
document.getElementById("txtFileLoadButton").addEventListener("click",handleTxtFileLoadButtonClickEvent)
document.getElementById("jsonFileLoadButton").addEventListener("click",handleJsonFileLoadButtonClickEvent)
document.getElementById("undoButton").addEventListener("click",handleUndoButtonClickEvent)
document.getElementById("redoButton").addEventListener("click",handleRedoButtonClickEvent)
