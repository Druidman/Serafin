import { 
    construct_verse, 
    construct_spaceTaker, 
    construct_playlist_record 
} from "./elementConstructors.js"





function updatePlayView(song){
    console.log(song.chorus)
    song = {
        "chorus": JSON.parse(song.chorus), 
        "lyrics": JSON.parse(song.lyrics)
    }
    console.log(song)
    var playview = document.getElementById("playView")
    playview.innerHTML = ""
    playview.scrollTop = 0

    if (!song.lyrics[0]){
        return false
    }

    var ind = 0
    var chorusMainText = song.chorus["main"]
    for (var verse of song.lyrics){
        if (String(ind - 1  ) in song.chorus){
            let chorusText = song.chorus[String(ind - 1)]
            var chorusElement = construct_verse(chorusText)
            playview.appendChild(chorusElement)
        }
        else if (chorusMainText != ""){
            var chorusElement = construct_verse(chorusMainText)
            playview.appendChild(chorusElement)
        }   

        var verseElement = construct_verse(verse)
        playview.appendChild(verseElement)
        ind++
    }

    playview.getElementsByClassName("verseBox")[0].classList.add("currentVerse")

    
    
    var spaceTaker = construct_spaceTaker()
    playview.appendChild(spaceTaker)
    var spaceTaker = construct_spaceTaker()
    playview.appendChild(spaceTaker)
  
    
    
    
}
function appendToPlaylist(dbRecord){
    
  

    var playlistRecord = construct_playlist_record(dbRecord)
    var playlist = document.getElementById("playlist")
    playlist.append(playlistRecord)
}
function removeFromPlaylist(playlistRecord){
    var playlist = document.getElementById("playlist")
    playlist.removeChild(playlistRecord)
}

export { updatePlayView, removeFromPlaylist, appendToPlaylist }
