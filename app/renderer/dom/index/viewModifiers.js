

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
}
function switchToIndex(){
    console.log(index)
}
export{ 
    scrollPlayView,
    switchToEditor,
    switchToIndex }