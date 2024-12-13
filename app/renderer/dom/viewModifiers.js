

function scrollPlayView(){
    var currVerse = document.getElementsByClassName("currentVerse")[0]
    var rect = currVerse.getBoundingClientRect()

    var playView = document.getElementById("playView")

    if (rect.bottom > playView.clientHeight){
        playView.scrollBy({"top": rect.top})

    }
    else if (rect.top < 0){
        playView.scrollBy({"top": rect.bottom-playView.clientHeight})
    }
    
}
export{ scrollPlayView }