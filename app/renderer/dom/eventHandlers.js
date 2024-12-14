import * as Buttons from "./buttons.js"
import { getSongsByPrefix, getSongFullById } from "./ipcHandlers.js"
import { scrollPlayView } from "./viewModifiers.js"
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
function verseBox_click_event(event){
    var curr = document.getElementsByClassName("currentVerse")[0]
    if (!curr){
        return
    }
    curr.classList.remove("currentVerse")
    event.currentTarget.classList.add("currentVerse")
    displayWind.updateWindow()
    
}
function db_search_submit_event(event){
    

    var previews = getSongsByPrefix(event.target.value)
    load_previews(previews)
    
    
}
function add_playlistRecord_click_event(playlistRecord){


    playlistRecord.addEventListener("click",playlistRecord_click_event)
    
    
        
}
function add_db_record_button_click_event(button){
    button.addEventListener("click",db_record_button_click_event)
}
function add_verseBox_click_event(verse){
    verse.addEventListener("click",verseBox_click_event)
}


document.getElementById("databaseSearch").addEventListener("input",db_search_submit_event)
    
document.getElementById("play").addEventListener("click",(event)=>{
    var button = event.currentTarget
    const windName = "displayWind"
    const filename = "display.html"

    if (!windManager.check_window_active(windName)){
            
        windManager.openNewWindow(filename,windName)
    }
    if (button.innerHTML == "Show"){
        displayWind.updateWindow()
        button.innerHTML = "Hid"
        console.log("button")
        button.style["background-color"] = "#666666"
    }
    else if (button.innerHTML == "Hid"){
        displayWind.hidWindow()
        button.innerHTML = "Show"
        button.style["background-color"] = "#FFFFFF"


    }
    
})

document.getElementById("next").addEventListener("click",()=>{
    var playbutton = document.getElementById("play")
    if (playbutton.innerHTML == "Show"){
        return
    }
    if (!displayWind.nextVerse()){
        return
    }
    scrollPlayView("s")
    
})

document.getElementById("prev").addEventListener("click",()=>{
   
    if (!displayWind.prevVerse()){
        return
    }
    scrollPlayView("s")
    
    
})

export { 
    add_db_record_button_click_event, 
    playlistRecord_click_event, 
    add_playlistRecord_click_event,
    add_verseBox_click_event }
