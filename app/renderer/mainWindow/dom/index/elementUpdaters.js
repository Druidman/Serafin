import { 
    construct_verse, 
    construct_spaceTaker, 
    construct_playlist_record 
} from "./elementConstructors.js"





function updatePlayView(song){
    song = {"chorus": song.chorus, "lyrics": JSON.parse(song.lyrics)}
    var playview = document.getElementById("playView")
    playview.innerHTML = ""
    playview.scrollTop = 0
    if (!song.lyrics[0]){
        return false
    }
    var firstVerseElement = construct_verse(song.lyrics[0])
    firstVerseElement.classList.add("currentVerse")
    playview.appendChild(firstVerseElement)

    var addedEmpty = false
    var chorusElement = construct_verse(song.chorus)
    for (var verse of song.lyrics.slice(1)){
        if (!verse){
            addedEmpty = true
        }
        playview.appendChild(chorusElement.cloneNode(true))
        var verseElement = construct_verse(verse)
        playview.appendChild(verseElement)
    }
    if (!addedEmpty){
        var emptyVerseElement = construct_verse("")
        playview.appendChild(emptyVerseElement)
    }
    
    
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
