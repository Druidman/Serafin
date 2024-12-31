import { 
    add_playlistRecord_click_event, 
    add_playlistRecord_button_click_event,
    add_db_record_button_click_event, 
    add_verseBox_click_event,
    add_categoryRecord_click_event,
    add_editor_button_click_event 
} from "./indexEventHandlers.js"

function construct_verse(verse){
    var box = document.createElement("div")
    box.classList.add("verseBox")

    console.log(verse)

    var p_tag = document.createElement("p")
    p_tag.innerText = verse

    box.appendChild(p_tag)
    add_verseBox_click_event(box)
    return box
}

function construct_db_record(element){
    var dbRecord = document.createElement("div")

    dbRecord.classList.add("dbRecord")
    dbRecord.id = element["id"]

    var title_p = document.createElement("p")
    title_p.textContent = element["title"]

    var buttonHolder = document.createElement("div")
    buttonHolder.classList.add("dbRecordButtonHolder")

    var dbButton = document.createElement("button")
    dbButton.textContent = "+"
    dbButton.classList.add("dbRecordButton")

    var editorButton = document.createElement("button")
    editorButton.textContent = "✎"
    editorButton.classList.add("editorButton")

    add_editor_button_click_event(editorButton)
    add_db_record_button_click_event(dbButton)

    buttonHolder.appendChild(dbButton)
    buttonHolder.appendChild(editorButton)

    dbRecord.appendChild(title_p)
    dbRecord.appendChild(buttonHolder)


    return dbRecord
}
function construct_category_record(element){
    var categoryRecord = document.createElement("div")
    categoryRecord.classList.add("categoryRecord")

    categoryRecord.classList.add("categoryRecord")
    
    var title_p = document.createElement("p")

    title_p.textContent = element["category"]

    categoryRecord.appendChild(title_p)
    add_categoryRecord_click_event(categoryRecord)
 
    return categoryRecord
}

function construct_spaceTaker(){
    var body = document.createElement("div")
    var text = document.createElement("p")
    body.appendChild(text)

    body.classList.add("spaceTaker")
    return body

}

function construct_playlist_record(dbRecord){

    var text = dbRecord.getElementsByTagName("p")[0].innerHTML
    


    var playlistRecord = document.createElement("div")
    playlistRecord.classList.add("playlistRecord")
    playlistRecord.setAttribute("id",dbRecord.id)

    var textHolder = document.createElement("p")
    textHolder.innerHTML = text

    var buttonHolder = document.createElement("div")
    buttonHolder.classList.add("dbRecordButtonHolder")

    var editorButton = document.createElement("button")
    editorButton.textContent = "✎"
    editorButton.classList.add("editorButton")

    

    var dbButton = document.createElement("button")
    dbButton.classList.add("playlistRecordButton")
    dbButton.textContent = "-"

    add_editor_button_click_event(editorButton)
    add_playlistRecord_button_click_event(dbButton)

    buttonHolder.appendChild(editorButton)
    buttonHolder.appendChild(dbButton)

    playlistRecord.append(textHolder)
    playlistRecord.append(buttonHolder)

    add_playlistRecord_click_event(playlistRecord)

    return playlistRecord

}

function construct_stylesheet(name){
    var linkElement = document.createElement("link")
    linkElement.setAttribute("id","localStylesheet")
    linkElement.setAttribute("rel", "stylesheet")
    linkElement.setAttribute("href","../styles/" + name)
    return linkElement
}
function construct_displayOption(display){
    var option = document.createElement("option")
    var bounds = display.bounds
    var nativeOrigin = {x: bounds.x, y: bounds.y}
    option.setAttribute("value",JSON.stringify(nativeOrigin))
    

    if (nativeOrigin.x == 0){
        option.innerHTML = `${display.label}(Główny)`
    }
    else {
        option.innerHTML = display.label
    }
    return option
    
}

export { 
    construct_db_record,
    construct_category_record,
    construct_verse, 
    construct_spaceTaker, 
    construct_playlist_record,
    construct_stylesheet,
    construct_displayOption }
