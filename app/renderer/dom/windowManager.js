var state = {
    ind: 1
}
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

function updateWindow(verses){
    if (!newWind){
        return
    }
    
    var doc = newWind.document
    

    var body = doc.body

    if (!body.innerHTML){
        return
    }
 
    body.innerHTML = ''


    var verse = verses[state.ind].cloneNode(true)
    body.appendChild(verse)
        
    
    
    

    
}

export { openNewWindow, getWindow, updateWindow, window_active, state }