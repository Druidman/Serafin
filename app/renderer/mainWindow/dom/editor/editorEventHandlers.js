import { updateSongById, openFileDialog, createSong } from "../shared/ipcHandlers.js"
import { switchToIndex } from "../shared/viewModifiers.js"
import { addEditableText, elementWarning, succesfulSummary, failedSummary } from "./utils.js"


const textRegex = /<Z>|<R>/
function editorSaveButton_click_event(event){
    var editedText = document.getElementById("textEditingArea").textContent + " "

    var chorus = {}
    var lyrics = []

    var startInd =0
    var endInd =0

    

    while ( endInd != -1){
    
        var ind1 = editedText.indexOf("<Z>")
        var ind2 = editedText.indexOf("<R>")
        if (ind1 == -1 && ind2 == -1){
            break
        }

        if (ind2 == -1){
            startInd = ind1
        }
        else if (ind1 == -1){
            startInd == ind2
        }
        else {
            startInd = Math.min(ind1,ind2)
        }

        ind1 = editedText.indexOf("<Z>",startInd + 1 )
        ind2 = editedText.indexOf("<R>",startInd + 1 )
        if (ind1 == -1 && ind2 == -1){
            endInd = editedText.length
        }
    
        if (ind2 == -1){
            endInd = ind1
        }
        else if (ind1 == -1){
            endInd = ind2
        }
        else {
            endInd = Math.min(ind1,ind2)
        }


        var text = editedText.slice(startInd, endInd)
        console.log(text)
        editedText = editedText.slice(endInd)

        switch (text.slice(0,3)){
            case "<Z>":
                lyrics.push(text.slice(3))
                break
            case "<R>":
                chorus[String(lyrics.length - 1)] = text.slice(3)
                break
        }

    }
    


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
        "lyrics": lyrics,
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

document.getElementById("textEditingArea").addEventListener("paste", function(e) {
    // cancel paste
    e.preventDefault();

    // get text representation of clipboard
    var text = (e.originalEvent || e).clipboardData.getData('text');

    // insert text manually
    document.execCommand("insertHTML", false, text.replace(/\n/g,'<br>'));
});
