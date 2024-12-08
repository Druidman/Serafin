import * as Buttons from "./buttons.js"
import { getSongsByPrefix, getSongsFullById, getSongFullById } from "./ipcHandlers.js"
import { load_previews } from "./dbutils.js"
import { updatePlayView } from "./elementUpdaters.js"
import * as windManager from "./windowManager/window.js"
import * as displayWind from "./windowManager/displayWindow.js"

function playlistRecord_click_event(event){
    if (event.target.tagName === "BUTTON"){
        return
    }
   
    var selected = document.getElementsByClassName("playlistRecord selected")[0]
    if (selected){
        selected.classList.remove("selected")
    }
    
    event.currentTarget.classList.add("selected")
    var id = event.currentTarget.id
    var song = getSongFullById(id)
    updatePlayView(song)


}

function add_playlistRecord_click_event(playlistRecord){


    playlistRecord.addEventListener("click",playlistRecord_click_event)
    
    
        
}

function db_record_button_click_event(button){
    button.addEventListener("click",()=>{
        switch (button.textContent){
            case "+":
                Buttons.convert_to_minus_button(button)
                break;
            case "-":
                Buttons.convert_to_plus_button(button)
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
   
    

   
    // var ids = songPreviews.map((preview)=>{
    //     return preview.id
    // })
    
    
    // var songs = getSongsFullById(ids)
    // console.log(songs)

    // updatePlayView(songs)
    
    // var verseHolder = document.getElementById("playView")
    // var verse = verseHolder.getElementById("verse0")
    
    
    // if (!verse){
    //     return
    // }

    // var windName = "displayName";

    // if (!windManager.check_window_active(windName)){
    //     windManager.openNewWindow("display.html",windName)
    // }
    // displayWind.loadVerse(verse)
    // displayWind.updateWindow()

    
    
})

document.getElementById("next").addEventListener("click",()=>{
    displayWind.nextVerse()
    displayWind.updateWindow()
})
document.getElementById("prev").addEventListener("click",()=>{
    displayWind.prevVerse()
    displayWind.updateWindow()
})

export { db_record_button_click_event, playlistRecord_click_event, add_playlistRecord_click_event }