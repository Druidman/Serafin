

function scrollPlayView(){
    var currVerse = document.getElementsByClassName("currentVerse")[0]
    var rect = currVerse.getBoundingClientRect()

    var playView = document.getElementById("playView")
    var header = document.getElementsByTagName("header")[0].offsetHeight

    if (rect.bottom > playView.clientHeight+header){
        playView.scrollBy({"top": rect.top-header})
        

    }
    else if (rect.top < header){
        playView.scrollBy({"top": rect.bottom-playView.clientHeight})
        
    }
    
}
export{ scrollPlayView }