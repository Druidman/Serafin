import { 
    construct_verse, 
    construct_spaceTaker, 
    construct_playlist_record 
} from "./elementConstructors.js"





function updatePlayView(song){

    song = {
        "chorus": JSON.parse(song.chorus), 
        "lyrics": JSON.parse(song.lyrics)
    }

    var playview = document.getElementById("playView")
    playview.innerHTML = ""
    playview.scrollTop = 0

    if (!song.lyrics[0]){
        return false
    }

    var ind = 0
    console.log(song.chorus)
    var mainIndex = Object.keys(song.chorus)[0]
    var chorusMainText = song.chorus[mainIndex]
    console.log(chorusMainText)
    for (var verse of song.lyrics){
        if (String(ind) in song.chorus && song.chorus[String(ind)] != ""){
            var chorusElement = construct_verse(song.chorus[String(ind)])
            playview.appendChild(chorusElement)    
        }
        else if (chorusMainText && ind >= mainIndex){
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
