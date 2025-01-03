import { getSongFullById  } from "../shared/ipcHandlers.js"
import { createEditableText } from "./utils.js"
function resetEditor(){
    document.getElementById("textEditingArea").innerHTML = ""
    document.getElementById("category").setAttribute("value","")
    document.getElementById("idInput").setAttribute("value","")
    document.getElementById("title").setAttribute("value","")
}
function loadEditElement(editElement){



    var textEditor = document.getElementById("textEditingArea")
    var categoryInput = document.getElementById("category")
    var idInput = document.getElementById("idInput")

    categoryInput.setAttribute("value",editElement.getAttribute("data-category"))
  
    idInput.setAttribute("value",editElement.id)
    
    
    var lyrics = getSongFullById(editElement.id)

    textEditor.innerHTML = createEditableText(lyrics)
}

export { loadEditElement, resetEditor }