import { verse } from "./windowManager/displayWindow.js"

function scrollPlayView(direction){
    
    switch (direction){
        case "up":
            var scrollVal = -verse.offsetHeight - 5
            break
        case "down":
            var scrollVal = verse.offsetHeight + 5
            break
    }
  
    var verseHolder = document.getElementById("playView")
    verseHolder.scrollBy({ top: scrollVal})

}
export{ scrollPlayView }