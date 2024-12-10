import { verse } from "./windowManager/displayWindow.js"

function scrollPlayView(direction){
    
    switch (direction){
        case "up":
            var scrollVal = -verse.offsetHeight
            break
        case "down":
            var scrollVal = verse.offsetHeight
            break
    }
    console.log("val", scrollVal)
    var verseHolder = document.getElementById("playView")
    verseHolder.scrollBy({ top: scrollVal, behavior: 'smooth' })

}
export{ scrollPlayView }