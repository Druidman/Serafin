import { 
    construct_db_record, 
    construct_category_record, 
    construct_stylesheet,
    construct_displayOption 
} from "../index/elementConstructors.js"

function loadStylesheet(name){
    var head = document.head
    document.getElementById("localStylesheet").remove()
    
    var stylesheetElement = construct_stylesheet(name)
    head.appendChild(stylesheetElement)

}
// nie tykać
function sortCategories(data){
    var tosort = data.map((element)=>{return element["category"]})
    tosort.sort((a,b)=>a.localeCompare(b, 'pl'))
    var ready = tosort.map((el)=>{return {"category": el}})
    return ready
}
// nie tykać
function sortPreviews(data){
    var obj = {}
    for (var element of data){obj[element["title"]] = { "id": element["id"], "category": element["category"] }}
    var titles = Object.keys(obj)
    var sortedtitles = titles.sort((a,b)=>a.localeCompare(b,"pl"))
    var ready = sortedtitles.map((title)=>{return { "title": title, "id": obj[title]["id"], "category": obj[title]["category"] }})
    return ready
}

function load_previews(data){
    var dataBox = document.getElementById("databaseViewer")
    
    dataBox.innerHTML = ""
    dataBox.scrollTop = 0

    data = sortPreviews(data)
    var counter = 100
    for (var element of data){

        
        var db_record = construct_db_record(element)
        if (counter <= 0){
            db_record.style.display = "none"
            
        }
        
        dataBox.appendChild(db_record)
        counter -= 1
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

function load_displays(data){
    var displaysDropDown = document.getElementById("availableDisplays")
    for (var display of data){
        var displayOption = construct_displayOption(display)
        displaysDropDown.appendChild(displayOption)
    }
}


export { load_previews, load_categories, loadStylesheet, load_displays }

