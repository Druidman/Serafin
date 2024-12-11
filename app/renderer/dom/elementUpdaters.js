import { construct_verse, construct_spaceTaker } from "./elementConstructors.js"
import { add_playlistRecord_click_event, playlistRecord_click_event } from "./eventHandlers.js"




function updatePlayView(song){
    var playview = document.getElementById("playView")
    playview.innerHTML = ""

    
    

    for (var verse of song){
        var verseElement = construct_verse(verse)
        playview.appendChild(verseElement)
    }
    
    var spaceTaker = construct_spaceTaker()
    playview.appendChild(spaceTaker)
    var spaceTaker = construct_spaceTaker()
    playview.appendChild(spaceTaker)
    
    
    
    
}

function updatePlaylist(dbRecord){
    

    dbRecord.classList.add("playlistRecord")
    add_playlistRecord_click_event(dbRecord)
    

    var playlist = document.getElementById("playlist")
    
    playlist.append(dbRecord)
}

function updateDatabaseViewer(dbRecord){
    dbRecord.classList.remove("playlistRecord")
    
        
    dbRecord.classList.remove("selected")
    

    dbRecord.removeEventListener("click",playlistRecord_click_event)



    var playlist = document.getElementById("databaseViewer")
    playlist.append(dbRecord)
}

export { updatePlayView, updatePlaylist, updateDatabaseViewer }
