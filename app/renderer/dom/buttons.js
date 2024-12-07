import { updatePlaylist, updateDatabaseViewer } from "./elementUpdaters.js"

function plus_button(button){
    button.textContent = "-"
    var dbRecord = button.parentNode
    updatePlaylist(dbRecord)
}

function minus_button(button){
    button.textContent = "+"
    var dbRecord = button.parentNode
    updateDatabaseViewer(dbRecord)

}

export { plus_button, minus_button }