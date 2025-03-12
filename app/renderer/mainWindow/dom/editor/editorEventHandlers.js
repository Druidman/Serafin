import { updateSongById, openFileDialog, createSong } from "../shared/ipcHandlers.js"
import { switchToIndex } from "../shared/viewModifiers.js"
import { addEditableText, elementWarning, succesfulSummary, failedSummary } from "./utils.js"


const textRegex = /<Z>/
function editorSaveButton_click_event(event){
    var editedText = document.getElementById("lyricsEditingArea").textContent
    var chorus = document.getElementById("chorusEditingArea").textContent
    
    var verses = editedText.split(textRegex).filter(Boolean)


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
        "lyrics": verses,
        "chorus": chorus
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
    var editedLyrics = document.getElementById("lyricsEditingArea").textContent
    var chorus = document.getElementById("chorusEditingArea").textContent
    
    var verses = editedLyrics.split(textRegex).filter(Boolean)





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
        "lyrics": verses,
        "chorus": chorus
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
    var dataFromFile = openFileDialog(properties)
    
    if (dataFromFile.length == 0){
        return
    }
    
    var lyrics = dataFromFile[0].split(";")
    
    
    addEditableText(lyrics)
}
function handleJsonFileLoadButtonClickEvent(event){
    const properties = ["openFile"]
    var dataFromFile = openFileDialog(properties)
    if (dataFromFile.length == 0){
        return
    }
    var lyrics = JSON.parse(dataFromFile[0])["lyrics"]


    addEditableText(lyrics)
}


function handleUndoButtonClickEvent(event){

    document.execCommand("undo")
}
function handleRedoButtonClickEvent(event){
    document.execCommand("redo")
    
}

function handleZwrotkaTextAddButtonEvent(event){
    let textEditArea = document.getElementById("lyricsEditingArea")
    textEditArea.innerHTML += '<br><br>'
    textEditArea.innerText += `<Z>`
}   



document.getElementById("editorSaveButton").addEventListener("click",editorSaveButton_click_event)
document.getElementById("editorCreateButton").addEventListener("click",editorCreateButton_click_event)
document.getElementById("returnIndexButton").addEventListener("click",handleReturnIndexButtonClickEvent)
document.getElementById("txtFileLoadButton").addEventListener("click",handleTxtFileLoadButtonClickEvent)
document.getElementById("jsonFileLoadButton").addEventListener("click",handleJsonFileLoadButtonClickEvent)
document.getElementById("undoButton").addEventListener("click",handleUndoButtonClickEvent)
document.getElementById("redoButton").addEventListener("click",handleRedoButtonClickEvent)
document.getElementById("addZwrotka").addEventListener("click",handleZwrotkaTextAddButtonEvent)

document.getElementById("lyricsEditingArea").addEventListener("paste", function(e) {
    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    var text = (e.originalEvent || e).clipboardData.getData('text');

    // insert text manually
    document.execCommand("insertHTML", false, text.replace(/\n/g,'<br>'));
});