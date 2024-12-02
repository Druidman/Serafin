import * as Buttons from "./buttons.js"
import { getSongsByPrefix, getSongsFullById } from "./ipcHandlers.js"
import { load_previews } from "./dbutils.js"
import { construct_verse } from "./elementConstructors.js"


function add_click_event(button){
    button.addEventListener("click",()=>{
        switch (button.textContent){
            case "+":
                Buttons.plus_button(button)
                break;
            case "-":
                Buttons.minus_button(button)
                break;
        }

    })
}

document.getElementById("databaseSearch").addEventListener("keydown",(event)=>{
    
    if (event.key == "Enter"){
       
        var previews = getSongsByPrefix(event.target.value)
        load_previews(previews)
        
    }

})

document.getElementById("play").addEventListener("click",()=>{
    var playlist = document.getElementById("playlist")
    var playview = document.getElementById("playView")
    playview.innerHTML = ""

    var songPreviews = playlist.querySelectorAll(".dbRecord")

    var ids = []
    for (var preview of songPreviews){
        ids.push(preview.id)
    }

    var songs = getSongsFullById(ids)


    for (var lyrics of songs){
        for (var verse of lyrics){
            var verseElement = construct_verse(verse)
            playview.appendChild(verseElement)
        }
       

    }
})

export { add_click_event }