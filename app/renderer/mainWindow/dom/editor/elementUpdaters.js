import { getSongFullById, getSongCategories } from "../shared/ipcHandlers.js"
import { constructOptionCategoryTag } from "./elementConstructors.js"
import { createEditableText } from "./utils.js"


function resetEditor(){
    document.getElementById("textEditingArea").innerHTML = ""
    document.getElementById("category").setAttribute("value","")
    document.getElementById("idInput").setAttribute("value","")
    document.getElementById("title").setAttribute("value","")
    console.log("reseted")
}
function loadEditElement(editElement){
    var textEditor = document.getElementById("textEditingArea")
    var categorySelect = document.getElementById("category")
    var idInput = document.getElementById("idInput")
    var titleInput = document.getElementById("title")

    var categoryName = editElement.getAttribute("data-category")
  
    idInput.setAttribute("value",editElement.id)
    titleInput.setAttribute("value",editElement.textContent)

    var categories = getSongCategories()
    for (var category of categories){
        
        var categoryOption = constructOptionCategoryTag(category['category'])
        if (category['category']== categoryName){
            categoryOption.setAttribute("selected","selected")
        }   
        categorySelect.appendChild(categoryOption)
    }
    
    var lyrics = getSongFullById(editElement.id)

    textEditor.innerHTML = createEditableText(lyrics)
}


export { loadEditElement, resetEditor }