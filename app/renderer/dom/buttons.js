function plus_button(button){
    button.textContent = "-"
    var parent = button.parentNode
    var playlist = document.getElementById("playlist")
    playlist.append(parent)
}

function minus_button(button){
    button.textContent = "+"
    var parent = button.parentNode
    var databaseViewer = document.getElementById("databaseViewer")
    databaseViewer.append(parent)

}

export { plus_button, minus_button }