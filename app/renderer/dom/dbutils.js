import { construct_db_record, construct_category_record } from "./elementConstructors.js"

function load_previews(data){
    var dataBox = document.getElementById("databaseViewer")
    dataBox.innerHTML = ""
    dataBox.scrollTop = 0

    for (var element of data){
        var db_record = construct_db_record(element)
        dataBox.appendChild(db_record)
    }

}
function load_categories(data){
    var dataBox = document.getElementById("databaseViewer")
    dataBox.innerHTML = ""
    dataBox.scrollTop = 0
  
    var category_record = construct_category_record({"category": "wszystko"})
    category_record.classList.add("specialCategory")
    dataBox.appendChild(category_record)
    
    for (var element of data){
        var category_record = construct_category_record(element)
        dataBox.appendChild(category_record)
    }
}

export { load_previews, load_categories }

