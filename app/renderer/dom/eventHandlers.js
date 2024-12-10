import * as Buttons from "./buttons.js"
import { getSongsByPrefix, getSongFullById } from "./ipcHandlers.js"
import { scrollPlayView } from "./viewModifiers.js"
import { load_previews } from "./dbutils.js"
import { updatePlayView } from "./elementUpdaters.js"
import * as windManager from "./windowManager/window.js"
import * as displayWind from "./windowManager/displayWindow.js"

//playlist events
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

//db record buttons events
function db_record_button_click_event(event){
    var button = event.currentTarget
    switch (button.textContent){
        case "+":
            Buttons.convert_to_minus_button(button)
            break;
        case "-":
            Buttons.convert_to_plus_button(button)
            break;
    }
}

function add_db_record_button_click_event(button){
    button.addEventListener("click",db_record_button_click_event)
}
//database events
function db_search_submit_event(event){
    if (event.key == "Enter"){
       
        var previews = getSongsByPrefix(event.target.value)
        load_previews(previews)
        
    }
}
document.getElementById("databaseSearch").addEventListener("keydown",db_search_submit_event)
    
document.getElementById("play").addEventListener("click",()=>{
    var firstverse = document.getElementsByClassName("verseBox")[0]
    console.log(firstverse)
    const windName = "displayWind"
    const filename = "display.html"

    console.log("checking window active")
    console.log(windManager.check_window_active(windName))
    if (!windManager.check_window_active(windName)){
        
        windManager.openNewWindow(filename,windName)
    }

    displayWind.loadVerse(firstverse)
    displayWind.updateWindow()
})

document.getElementById("next").addEventListener("click",()=>{

    if (!displayWind.nextVerse()){
        return
    }
    scrollPlayView("down")
    
})

document.getElementById("prev").addEventListener("click",()=>{
   
    if (!displayWind.prevVerse()){
        return
    }
    scrollPlayView("up")
    
    
})

export { add_db_record_button_click_event, playlistRecord_click_event, add_playlistRecord_click_event }