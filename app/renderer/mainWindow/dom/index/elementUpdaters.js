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
    if (Object.keys(song.chorus).length != 0){
        var mainIndex = Object.keys(song.chorus)[0]
        var chorusMainText = song.chorus[mainIndex]
    }
    else {
        var mainIndex = -1
        var chorusMainText = ""
    }
    
    
    
    console.log(chorusMainText)
    song.lyrics.push(" ") // w celu space takera
    for (var verse of song.lyrics){
        if (String(ind) in song.chorus && song.chorus[String(ind)] != "" && verse){
            var chorusElement = construct_verse(song.chorus[String(ind)])
            playview.appendChild(chorusElement)    
        }
        else if (chorusMainText && ind >= mainIndex && verse){
            var chorusElement = construct_verse(chorusMainText)
            playview.appendChild(chorusElement)    
        }
        if (verse){
            var verseElement = construct_verse(verse)
            playview.appendChild(verseElement)
            ind++
        }
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
