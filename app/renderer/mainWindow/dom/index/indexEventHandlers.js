
import { 
    getSongsByPrefix, 
    getSongFullById,
    getSongsPreview,
    getSongCategories } from "../shared/ipcHandlers.js"
import { scrollPlayView, switchToEditor } from "../shared/viewModifiers.js"
import { load_categories, load_previews } from "../shared/utils.js"
import { updatePlayView, appendToPlaylist, removeFromPlaylist } from "./elementUpdaters.js"
import * as displayWind from "../shared/displayWindowControl.js"


function categoryRecord_click_event(event){
    var categoryRecord = event.currentTarget
    var textHolder = categoryRecord.getElementsByTagName("p")[0]
    var categoryName = textHolder.innerHTML
    

    var prevs = getSongsPreview(100,categoryName)
    load_previews(prevs)
    
    var categorySelector = document.getElementById("categorySelector")
    categorySelector.setAttribute("data-value",categoryName)
 
}
function add_categoryRecord_click_event(categoryRecord){
    categoryRecord.addEventListener("click",categoryRecord_click_event)
    
}
//

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
    

    var playButton = document.getElementById("play")
    var state = playButton.getAttribute("data-value")
    if (state == "shown"){
        displayWind.updateWindow()
    }


    


}
function add_playlistRecord_click_event(playlistRecord){
    playlistRecord.addEventListener("click",playlistRecord_click_event) 
}
//
function editorButtonClickEvent(event){
    var editElement = event.currentTarget.parentNode.parentNode
    switchToEditor(editElement)
}
function add_editor_button_click_event(button){
    button.addEventListener("click",editorButtonClickEvent)

}

//
function db_record_button_click_event(event){
    var button = event.currentTarget

    var dbRecord = button.parentNode.parentNode.cloneNode(true)
    appendToPlaylist(dbRecord)
}
function add_db_record_button_click_event(button){
    button.addEventListener("click",db_record_button_click_event)
}
//

function playlist_record_button_click_event(event){
    
    var playlistRecord = event.currentTarget.parentNode.parentNode
    removeFromPlaylist(playlistRecord)
    if (playlistRecord.classList.contains("selected")){
        var playView = document.getElementById("playView")
        playView.innerHTML = ""

    }   
    
    
}
function add_playlistRecord_button_click_event(button){
    button.addEventListener("click",playlist_record_button_click_event)
}
//

function verseBox_click_event(event){
    var curr = document.getElementsByClassName("currentVerse")[0]
    if (!curr){
        return
    }
    curr.classList.remove("currentVerse")
    event.currentTarget.classList.add("currentVerse")
    var button = document.getElementById("play")
    var state = button.getAttribute("data-value")
    if (state == "shown"){
        displayWind.updateWindow()
    }
    
    
}
function add_verseBox_click_event(verse){
    verse.addEventListener("click",verseBox_click_event)
}
//


function dbSearchEvent(event){
    
    var categoryName = document.getElementById("categorySelector").getAttribute("data-value")
    if (!categoryName){
        return
    }
   
    var previews = getSongsByPrefix(event.target.value,categoryName)
    load_previews(previews)
    
    
}
function handleNextVerseEvent(event){
    if (!displayWind.nextVerse()){
        return
    }
    scrollPlayView()
}
function handlePrevVerseEvent(event){
    if (!displayWind.prevVerse()){
        return
    }
    scrollPlayView()
}
function handlePlayButtonEvent(event){


    var playButton = document.getElementById("play")
    var state = playButton.getAttribute("data-value")

    if (!displayWind.checkWindowActive()){
        displayWind.openWindow()
        
    }


    switch(state){
        case "shown":
            playButton.innerHTML = "Show"
            playButton.setAttribute("data-value","hidden")
            playButton.style["background-color"] = "#8b8b8b"
            displayWind.hideWindow()
            
            break
        case "hidden":
            playButton.innerHTML = "Hide"
            playButton.setAttribute("data-value","shown")
            playButton.style["background-color"] = "#FFFFFF"
            displayWind.showWindow()

            break
    }
    
}
function handleCategorySelectorEvent(event){
    var categories = getSongCategories()
    
    load_categories(categories)
}
function handleStashButtonEvent(event){
    var button = event.currentTarget
    
    if (button.getAttribute("data-value") == "hide"){
        button.setAttribute("data-value","show")
    }
    else if (button.getAttribute("data-value") == "show"){
        button.setAttribute("data-value","hide")
    }
}

function handleNextPlaylistRecord(event){
    var selected = document.getElementsByClassName("selected")[0]
    if (selected == null){
        return
    }

    var nextSelected = selected.nextElementSibling
    console.log(nextSelected)
    if (nextSelected == null){
        return
    }

    selected.classList.remove("selected")
    nextSelected.classList.add("selected")
    var id = nextSelected.id
    var song = getSongFullById(id)
    updatePlayView(song)

    var playButton = document.getElementById("play")
    var state = playButton.getAttribute("data-value")
    if (state == "shown"){
        displayWind.updateWindow()
    }
    
}
function handlePrevPlaylistRecord(event){
    var selected = document.getElementsByClassName("selected")[0]
    
    if (!selected){
        return
    }

    var prevSelected = selected.previousElementSibling
    
    if (!prevSelected){
        return
    }

    selected.classList.remove("selected")
    prevSelected.classList.add("selected")

    var id = prevSelected.id
    var song = getSongFullById(id)
    updatePlayView(song)

    var playButton = document.getElementById("play")
    var state = playButton.getAttribute("data-value")
    if (state == "shown"){
        displayWind.updateWindow()
    }
}

async function handleKeyPressEvent(event){
    console.log("event")
    switch (event.code){
        case "Enter":
        case "Numpad0":
            event.preventDefault()
            await handlePlayButtonEvent(event)
            break
        case "ArrowLeft":
        case "Numpad4":
            event.preventDefault()
            handlePrevVerseEvent(event)
            break

        case "ArrowRight":
        case "Numpad6":
        case "Space":
            event.preventDefault()
            handleNextVerseEvent(event)
            break
        
        case "ArrowUp":
        case "Numpad8":
            event.preventDefault()
            handlePrevPlaylistRecord(event)
            break

        case "ArrowDown":
        case "Numpad2":
            event.preventDefault()
            handleNextPlaylistRecord(event)
            break

        case "Numpad0":
            event.preventDefault()
            displayWind.showWindow()
    }
}

document.getElementById("databaseSearch").addEventListener("input",dbSearchEvent)
document.getElementById("play").addEventListener("click",handlePlayButtonEvent)
document.getElementById("next").addEventListener("click",handleNextVerseEvent)
document.getElementById("prev").addEventListener("click",handlePrevVerseEvent)
document.getElementById("categorySelector").addEventListener("click",handleCategorySelectorEvent)
document.getElementById("stashButton").addEventListener("click",handleStashButtonEvent)



document.addEventListener("keydown",handleKeyPressEvent)


export { 
    add_db_record_button_click_event, 
    add_playlistRecord_button_click_event,
    playlistRecord_click_event, 
    add_playlistRecord_click_event,
    add_verseBox_click_event,
    add_categoryRecord_click_event,
    add_editor_button_click_event }
