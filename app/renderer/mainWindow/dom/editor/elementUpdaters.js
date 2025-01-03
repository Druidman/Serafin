import { getSongFullById  } from "../shared/ipcHandlers.js"
function resetEditor(){
    document.getElementById("textEditingArea").innerHTML = ""
    document.getElementById("category").setAttribute("value","")
    document.getElementById("idInput").setAttribute("value","")
    document.getElementById("title").setAttribute("value","")
}
function loadEditElement(editElement){



    var textEditor = document.getElementById("textEditingArea")
    var editorOptions = document.getElementById("editorOptions")
    var categoryInput = document.getElementById("category")
    var idInput = document.getElementById("idInput")

    categoryInput.setAttribute("value",editElement.getAttribute("data-category"))
  
    idInput.setAttribute("value",editElement.id)
    
    
    
    var fullText = ""
  
    var slideNum = 1
    var lyrics = getSongFullById(editElement.id)
    for (var verse of lyrics){
        fullText += `<br><br>( SLAJD ${slideNum} )<br>${verse}`
        slideNum++
    }
    textEditor.innerHTML = fullText.replaceAll("\n","<br>")
    
    editorOptions.setAttribute("data-value",editElement.id)
}

export { loadEditElement, resetEditor }