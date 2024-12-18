
import { 
    getSongsByPrefix, 
    getSongFullById,
    getSongsPreview,
    getSongCategories } from "./ipcHandlers.js"
import { scrollPlayView } from "./viewModifiers.js"
import { load_categories, load_previews } from "./dbutils.js"
import { updatePlayView, appendToPlaylist, removeFromPlaylist } from "./elementUpdaters.js"
import * as windManager from "./windowManager/window.js"
import * as displayWind from "./windowManager/displayWindow.js"


function categoryRecord_click_event(event){
    var categoryRecord = event.currentTarget
    var textHolder = categoryRecord.getElementsByTagName("p")[0]
    var categoryName = textHolder.innerHTML
    

    var prevs = getSongsPreview(10000,categoryName)
    load_previews(prevs)
    
    var categorySelector = document.getElementById("categorySelector")
    categorySelector.setAttribute("data-value",categoryName)
 
}
function add_categoryRecord_click_event(categoryRecord){
    categoryRecord.addEventListener("click",categoryRecord_click_event)
    
}

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

    var dbRecord = button.parentNode.cloneNode(true)
    appendToPlaylist(dbRecord)
}
function playlist_record_button_click_event(event){
    var button = event.currentTarget
    var playlistRecord = event.currentTarget.parentNode
    removeFromPlaylist(playlistRecord)
    if (playlistRecord.classList.contains("selected")){
        var playView = document.getElementById("playView")
        playView.innerHTML = ""

        var playButton = document.getElementById("play")
        playButton.innerHTML = "Show"
        displayWind.hidWindow()
        playButton.style["background-color"] = "#FFFFFF"
    }   
    
    
}

function verseBox_click_event(event){
    var curr = document.getElementsByClassName("currentVerse")[0]
    if (!curr){
        return
    }
    curr.classList.remove("currentVerse")
    event.currentTarget.classList.add("currentVerse")
    var button = document.getElementById("play")
    if (button.innerHTML == "Hid"){
        displayWind.updateWindow()
    }
    
    
}

function db_search_submit_event(event){
    
    var categoryName = document.getElementById("categorySelector").getAttribute("data-value")
    if (!categoryName){
        return
    }
   
    var previews = getSongsByPrefix(event.target.value,categoryName)
    load_previews(previews)
    
    
}

function add_playlistRecord_click_event(playlistRecord){
    playlistRecord.addEventListener("click",playlistRecord_click_event) 
}
function add_playlistRecord_button_click_event(button){
    button.addEventListener("click",playlist_record_button_click_event)
}

function add_db_record_button_click_event(button){
    button.addEventListener("click",db_record_button_click_event)
}

function add_verseBox_click_event(verse){
    verse.addEventListener("click",verseBox_click_event)
}


document.getElementById("databaseSearch").addEventListener("input",db_search_submit_event)
    
document.getElementById("play").addEventListener("click",(event)=>{
    if (event.pointerType !== 'mouse') {
        return;
    }
    event.stopPropagation();
    var button = event.currentTarget
    
    const windName = "displayWind"
    const filename = "display.html"

    if (!windManager.check_window_active(windName)){
            
        windManager.openNewWindow(filename,windName)
    }
    if (button.innerHTML == "Show"){
        displayWind.updateWindow()
        button.innerHTML = "Hid"
        button.style["background-color"] = "#FFFFFF"
    }
    else if (button.innerHTML == "Hid"){
        displayWind.hidWindow()
        button.innerHTML = "Show"
        button.style["background-color"] = "#8b8b8b"


    }
    
})


document.getElementById("next").addEventListener("click",()=>{
    
    
    if (!displayWind.nextVerse()){
        return
    }
    scrollPlayView()
    
})

document.getElementById("prev").addEventListener("click",()=>{
   
    if (!displayWind.prevVerse()){
        return
    }
    scrollPlayView()
    
    
})

document.getElementById("categorySelector").addEventListener("click",(event)=>{
    var categories = getSongCategories()
    
    load_categories(categories)
})

document.onkeydown = function (e){
    var keyPressed = e.code

    switch(keyPressed){
        case "Space":
            if (!displayWind.nextVerse()){
                return
            }
            scrollPlayView()
            break
        case "ArrowRight":
            if (!displayWind.nextVerse()){
                return
            }
            scrollPlayView()
            break
        case "ArrowLeft":
            if (!displayWind.prevVerse()){
                return
            }
            scrollPlayView()
            break

    }
}



export { 
    add_db_record_button_click_event, 
    add_playlistRecord_button_click_event,
    playlistRecord_click_event, 
    add_playlistRecord_click_event,
    add_verseBox_click_event,
    add_categoryRecord_click_event }
