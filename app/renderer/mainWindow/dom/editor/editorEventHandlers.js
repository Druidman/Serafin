import { updateSongById, openFileDialog } from "../shared/ipcHandlers.js"
import { switchToIndex } from "../shared/viewModifiers.js"
import { createEditableText, emptyElementWarning } from "./utils.js"

function editorSaveButton_click_event(event){
    var editedText = document.getElementById("textEditingArea").textContent
    
    var verses = editedText.split(/\( SLAJD \d+ \)/)
    verses.shift()

    var idValue = document.getElementById("idInput").getAttribute("value")
    var category = document.getElementById("category")
    var title = document.getElementById("title")


    if (!category.value){
        emptyElementWarning(category)
        
        return
    }
    if (!title.value){
        emptyElementWarning(title)
    
        return
    }

    if (idValue){
        
        const rowToEdit = "lyrics"
        var result = updateSongById(idValue,rowToEdit,verses)
        if (result !== true){
            var button = document.getElementById("editorSaveButton")
            button.classList.add("failedSave")
            window.setTimeout(()=>{
                button.classList.remove("failedSave")
            }, 1000)
        }
        return
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
document.getElementById("returnIndexButton").addEventListener("click",handleReturnIndexButtonClickEvent)
document.getElementById("txtFileLoadButton").addEventListener("click",handleTxtFileLoadButtonClickEvent)
document.getElementById("jsonFileLoadButton").addEventListener("click",handleJsonFileLoadButtonClickEvent)
document.getElementById("undoButton").addEventListener("click",handleUndoButtonClickEvent)
document.getElementById("redoButton").addEventListener("click",handleRedoButtonClickEvent)
document.getElementById("titleOption").addEventListener("click",(event)=>{
    console.log("clicked")
})