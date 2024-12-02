import { add_click_event } from "./eventHandlers.js"

function construct_verse(verse){
    var box = document.createElement("div")
    box.classList.add("verseBox")

    var p_tag = document.createElement("p")
    p_tag.innerText = verse

    box.appendChild(p_tag)
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
    dbButton.classList.add("plus")

    add_click_event(dbButton)

    dbRecord.appendChild(title_p)
    dbRecord.appendChild(dbButton)

    return dbRecord

}
export { construct_db_record, construct_verse }