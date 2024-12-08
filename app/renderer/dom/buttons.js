import { updatePlaylist, updateDatabaseViewer } from "./elementUpdaters.js"

function convert_to_minus_button(button){
    button.textContent = "-"
    var dbRecord = button.parentNode
    updatePlaylist(dbRecord)
}

function convert_to_plus_button(button){
    button.textContent = "+"
    var dbRecord = button.parentNode
    updateDatabaseViewer(dbRecord)

}

export { convert_to_minus_button, convert_to_plus_button }