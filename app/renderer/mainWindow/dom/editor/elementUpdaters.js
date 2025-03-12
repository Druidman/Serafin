import { getSongFullById, getSongCategories } from "../shared/ipcHandlers.js"
import { constructOptionCategoryTag } from "./elementConstructors.js"
import { addEditableText } from "./utils.js"

function setEditorControls(){
    var categories = getSongCategories()
    var categorySelect = document.getElementById("category")

    for (var category of categories){
        
        var categoryOption = constructOptionCategoryTag(category['category'])
     
        categorySelect.appendChild(categoryOption)
     
    }
}
function resetEditor(){
    document.getElementById("lyricsEditingArea").innerHTML = ""
    document.getElementById("chorusEditingArea").innerHTML = ""
    document.getElementById("category").setAttribute("value","")
    document.getElementById("idInput").setAttribute("value","")
    document.getElementById("title").setAttribute("value","")
    console.log("reseted")
}
function loadEditElement(editElement){
    var lyricsEditor = document.getElementById("lyricsEditingArea")
    var chorusEditor = document.getElementById("chorusEditingArea")
    var categorySelect = document.getElementById("category")
    var idInput = document.getElementById("idInput")
    var titleInput = document.getElementById("title")

    var categoryName = editElement.getAttribute("data-category")
  
    idInput.setAttribute("value",editElement.id)
    titleInput.setAttribute("value",editElement.textContent)
    var categories = categorySelect.getElementsByTagName("option")
    for (var category of categories){
        if (category.value == categoryName){
            category.setAttribute("selected","selected")
        }
    }
  
    
    var songContent = getSongFullById(editElement.id)
    addEditableText(JSON.parse(songContent.lyrics),lyricsEditor)
    addEditableText(songContent.chorus,chorusEditor)
    
}


export { loadEditElement, resetEditor, setEditorControls }