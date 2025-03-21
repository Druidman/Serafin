
import { 
    getSongsByPrefix, 
    getSongFullById,
    getSongsPreview,
    getSongCategories, 
    saveConfig
} from "../shared/ipcHandlers.js"
import { scrollPlayView, switchToEditor, movePlaylistRecord

 } from "../shared/viewModifiers.js"
import { load_categories, load_previews, sortPreviews } from "../shared/utils.js"
import { updatePlayView, appendToPlaylist, removeFromPlaylist } from "./elementUpdaters.js"
import * as displayWind from "../shared/displayWindowControl.js"

let dbViewerTimeout;
var mouseDown = true

function add_editor_button_click_event(button){
    button.addEventListener("click",(event)=>{
        var editElement = event.currentTarget.parentNode.parentNode
        switchToEditor(editElement)
    })
}


function add_categoryRecord_events(categoryRecord){
    categoryRecord.addEventListener("click",(event)=>{
        var categoryRecord = event.currentTarget
        var categoryName = categoryRecord.getAttribute("data-category")
        
        var categorySelector = document.getElementById("categorySelector")
        categorySelector.setAttribute("data-value",categoryName)

        var prevs = getSongsPreview(categoryName)
        prevs = sortPreviews(prevs)
        load_previews(prevs)
    })
    
}
function add_dbRecord_events(dbRecord){
    var addButton = dbRecord.querySelector(".dbRecordAddButton")
    var editorButton = dbRecord.querySelector(".dbRecordEditorButton")
    addButton.addEventListener("click",()=>{
        var button = event.currentTarget

        var dbRecord = button.parentNode.parentNode.cloneNode(true)
        appendToPlaylist(dbRecord)
    })
    add_editor_button_click_event(editorButton)
}
function add_playlistRecord_events(playlistRecord){
    let delButton = playlistRecord.querySelector(".playlistRecordDelButton")
    let editorButton = playlistRecord.querySelector(".editorButton")

    playlistRecord.addEventListener("dragstart",()=>{
        console.log("dragstart")
        playlistRecord.classList.toggle("dragging")
    })
    playlistRecord.addEventListener("dragend",()=>{
        console.log("dragend")
        playlistRecord.classList.toggle("dragging")
    })


    playlistRecord.addEventListener("click",(event)=>{
        if (event.target.tagName === "BUTTON" || event.target.tagName === "IMG"){
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
    
    }) 
    delButton.addEventListener("click",(event)=>{
        var playlistRecord = event.currentTarget.parentNode.parentNode
        if (!playlistRecord){
            return
        }

        if (playlistRecord.classList.contains("selected")){
            var playView = document.getElementById("playView")
            playView.innerHTML = ""
            if (playlistRecord.previousElementSibling){
                handlePrevPlaylistRecord()
            }
            else {
                handleNextPlaylistRecord()
            }
            
        }
        
        removeFromPlaylist(playlistRecord)
    })
    add_editor_button_click_event(editorButton)
}
function add_verseBox_events(verseBox){
    verseBox.addEventListener("click",(event)=>{
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
    })
}


function dbSearchEvent(event){
    console.log(event.data)
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

    console.log(playButton)
    switch(state){
        case "shown":
            playButton.innerHTML = "Pokaż ekran"
            
            playButton.style.backgroundColor = "#8b8b8b"
            playButton.setAttribute("data-value","hidden")
            displayWind.hideWindow()
            
            break
        case "hidden":
            playButton.innerHTML = "Ukryj ekran"
          
            playButton.style.backgroundColor = "#FFFFFF"
            playButton.setAttribute("data-value","shown")
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
function handleNextPlaylistRecord(){
    var selected = document.getElementsByClassName("selected")[0]
    if (selected == null){
        return
    }

    var nextSelected = selected.nextElementSibling
    console.log(nextSelected)
    if (!nextSelected){
       
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
function handlePrevPlaylistRecord(){
    var selected = document.getElementsByClassName("selected")[0]
    
    if (selected == null){
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
function handleMainEditorButtonClickEvent(){
    switchToEditor()
}

function handleKeyPressEvent(event){
    console.log("event")
    if (document.activeElement === document.getElementById("databaseSearch")){
        return
    }
    switch (event.code){
        case "Enter":
        case "Numpad0":
            event.preventDefault()
            handlePlayButtonEvent(event)
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
            handlePrevPlaylistRecord()
            
            break

        case "ArrowDown":
        case "Numpad2":
            event.preventDefault()
            handleNextPlaylistRecord()
            break

        case "Numpad0":
            event.preventDefault()
            displayWind.showWindow()
    }
}

function handleDbViewerFocusEvent(event){
    clearTimeout(dbViewerTimeout)
    let elements =  Array.prototype.slice.call(document.getElementsByClassName("dbRecord"))
    console.log("focus")
    for (let element of elements){
        if (element.style.display != "none"){
            continue
        }
        element.style.display = "flex"
    }
    event.currentTarget.classList.remove("hiddenScrollBar")
}
function handleDbViewerUnFocusEvent(event){
    let elements =  Array.prototype.slice.call(document.getElementsByClassName("dbRecord"))
    console.log("unfocus")
    let dbViewer = event.currentTarget
    let dbViewerRect = dbViewer.getBoundingClientRect()


    let safeZone = []
    for (let i=0; i<elements.length;i++){
        let element = elements[i]
        let rect = element.getBoundingClientRect()
        if ((rect.top <= dbViewer.scrollTop && rect.top >= dbViewerRect.top) 
            || 
            (rect.top >= dbViewer.scrollTop && rect.top <= dbViewerRect.bottom)){
            let safePrev = i-50
            let safeNext = i+50
            if (safePrev < 0){
                safePrev = 0
            }
            if (safeNext > elements.length){
                safeNext = elements.length
            }
            safeZone = [safePrev,safeNext]
            break
        }
    }
    
    dbViewerTimeout = setTimeout(()=>{
        for (let i=0; i<elements.length;i++){
            if (i <=safeZone[1] && i>=safeZone[0]){
                continue
            }
            elements[i].style.display = "none"
        }
        dbViewer.classList.add("hiddenScrollBar")
    },1125)
    


        
        
}

function setupIndexEventHandlers(){
    document.getElementById("databaseSearch").addEventListener("input",dbSearchEvent)
    
    document.getElementById("play").addEventListener("click",handlePlayButtonEvent)
    document.getElementById("next").addEventListener("click",handleNextVerseEvent)
    document.getElementById("prev").addEventListener("click",handlePrevVerseEvent)
    document.getElementById("categorySelector").addEventListener("click",handleCategorySelectorEvent)
    document.getElementById("stashButton").addEventListener("click",handleStashButtonEvent)
    document.getElementById("mainEditorButton").addEventListener("click",handleMainEditorButtonClickEvent)
    document.getElementById("databaseViewer").addEventListener("mouseenter",handleDbViewerFocusEvent)
    document.getElementById("databaseViewer").addEventListener("mouseleave",handleDbViewerUnFocusEvent)

    document.getElementById("availableDisplays").addEventListener("change",saveConfig)

    document.addEventListener("keydown",handleKeyPressEvent)

    
    document.addEventListener("mousedown",()=>{
        

        setTimeout(()=>{
            if (!mouseDown){
                return
            }
        },100)
    })
    document.addEventListener("mouseup",()=>{
        mouseDown = false
    })
}   





export { 
    
    
    add_dbRecord_events,
    add_playlistRecord_events,
    add_verseBox_events,
    add_categoryRecord_events,

    add_editor_button_click_event,
    handleKeyPressEvent,

    setupIndexEventHandlers
}
