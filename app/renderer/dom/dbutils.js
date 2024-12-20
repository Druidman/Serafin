import { construct_db_record, construct_category_record } from "./elementConstructors.js"

function sortCategories(data){
    var tosort = data.map((element)=>{return element["category"]})
    tosort.sort((a,b)=>a.localeCompare(b, 'pl'))
    var ready = tosort.map((el)=>{return {"category": el}})
    return ready
}
function sortPreviews(data){
    var obj = {}
    for (var element of data){
        obj[element["title"]] = element["id"]
    }
    var toSort = Object.keys(obj)
    toSort.sort((a,b)=>a.localeCompare(b, 'pl'))
    var ready = toSort.map((title)=>{return {"title": title,"id": obj[title]}})
    return ready
}

function load_previews(data){
    var dataBox = document.getElementById("databaseViewer")
    dataBox.innerHTML = ""
    dataBox.scrollTop = 0

    data = sortPreviews(data)

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

    data = sortCategories(data)
    
    for (var element of data){
        var category_record = construct_category_record(element)
        dataBox.appendChild(category_record)
    }
}

export { load_previews, load_categories }

