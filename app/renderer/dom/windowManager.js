var ind = 1
var newWind = null
function openNewWindow(filename){
    newWind = window.open(filename,"_blank","width=1000,height=500")
    
    return newWind
}

function window_active(){
    if (!newWind){
        return false
    }
    if (newWind.closed){
        return false
    }

    return true
}

function getWindow(){
    return newWind
}

function updateWindow(){
    var doc = newWind.document
    var verseHolder = document.getElementById("playView")
    var verses = verseHolder.querySelectorAll(".verseBox")
    console.log(verses[ind+1].outersHTML)
    var body = doc.getElementById("body")
    body.innerHTML = ''
    body.appendChild(verses[ind])
    


    

}

export { openNewWindow, getWindow, updateWindow, window_active }