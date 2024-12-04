import * as Buttons from "./buttons.js"
import { getSongsByPrefix, getSongsFullById } from "./ipcHandlers.js"
import { load_previews } from "./dbutils.js"
import { updatePlayView } from "./elementUpdaters.js"
import { openNewWindow, updateWindow, window_active, state } from "./windowManager.js"
import { get_ids } from "./utils.js"


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
    var ids = get_ids()

    var songs = getSongsFullById(ids)

    updatePlayView(songs)
    
    var verseHolder = document.getElementById("playView")
    var verses = verseHolder.querySelectorAll(".verseBox")
    
    if (verses.length == 0){
        return
    }
    if (!window_active()){
        
        openNewWindow("display.html")
    }
    updateWindow(verses,true)
})

document.getElementById("next").addEventListener("click",()=>{
    var verseHolder = document.getElementById("playView")
    var verses = verseHolder.querySelectorAll(".verseBox")
    if (verses.length == 0){
        return
    }
    if (state.ind < verses.length-1){
        state.ind+=1
        updateWindow(verses,false)
    }
})
document.getElementById("prev").addEventListener("click",()=>{
    var verseHolder = document.getElementById("playView")
    var verses = verseHolder.querySelectorAll(".verseBox")
    if (verses.length == 0){
        return
    }
    if (state.ind > 0){
        state.ind-=1
        updateWindow(verses,false)
    }

})

export { add_click_event }