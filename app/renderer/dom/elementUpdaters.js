import { construct_verse } from "./elementConstructors.js"


function updatePlayView(songs){
    var playview = document.getElementById("playView")
    playview.innerHTML = ""
    for (var lyrics of songs){
        for (var verse of lyrics){
            var verseElement = construct_verse(verse)
            playview.appendChild(verseElement)
        }
    }
}

function updatePlaylist(dbRecord){
    var playlist = document.getElementById("playlist")
    playlist.append(dbRecord)
}
function updateDatabaseViewer(dbRecord){
    var playlist = document.getElementById("databaseViewer")
    playlist.append(dbRecord)
}

export { updatePlayView, updatePlaylist, updateDatabaseViewer }
