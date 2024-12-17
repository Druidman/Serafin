import { 
    add_playlistRecord_click_event, 
    add_playlistRecord_button_click_event,
    add_db_record_button_click_event, 
    add_verseBox_click_event,
    add_categoryRecord_click_event 
} from "./eventHandlers.js"

function construct_verse(verse){
    var box = document.createElement("div")
    box.classList.add("verseBox")
    

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

    var dbButton = document.createElement("button")
    dbButton.textContent = "+"
    dbButton.classList.add("dbRecordButton")

    add_db_record_button_click_event(dbButton)

    dbRecord.appendChild(title_p)
    dbRecord.appendChild(dbButton)

    return dbRecord
}
function construct_category_record(element){
    var categoryRecord = document.createElement("div")
    categoryRecord.classList.add("categoryRecord")

    categoryRecord.classList.add("categoryRecord")
    
    var title_p = document.createElement("p")
    console.log(element)
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

    var button = document.createElement("button")
    button.classList.add("playlistRecordButton")
    button.textContent = "-"

    add_playlistRecord_button_click_event(button)

    playlistRecord.append(textHolder)
    playlistRecord.append(button)

    add_playlistRecord_click_event(playlistRecord)

    return playlistRecord

}

export { 
    construct_db_record,
    construct_category_record,
    construct_verse, 
    construct_spaceTaker, 
    construct_playlist_record }