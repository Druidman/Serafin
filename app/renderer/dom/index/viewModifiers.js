import { loadStylesheet } from "./utils.js"

function scrollPlayView(){
    var currVerse = document.getElementsByClassName("currentVerse")[0]
    var verseRect = currVerse.getBoundingClientRect()

    var playView = document.getElementById("playView")
    var playViewRect = playView.getBoundingClientRect()
    
    if (verseRect.bottom > playViewRect.bottom)
        currVerse.scrollIntoView({
            behavior: "smooth", 
            block: "start"
        })
    else if (verseRect.top < playViewRect.top){
        currVerse.scrollIntoView({
            behavior: "smooth", 
            block: "end"
        })
    }

   
}
function switchToEditor(editElement){
    console.log("editor")
    loadStylesheet("editorStyles.css")
}
function switchToIndex(){
    console.log(index)
    loadStylesheet("indexStyles.css")
}
export{ 
    scrollPlayView,
    switchToEditor,
    switchToIndex }