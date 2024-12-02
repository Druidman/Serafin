
var newWind = null
function openNewWindow(filename){
    newWind = window.open(filename,"_blank","width=1000,height=500")
    
    return newWind
}

function getWindow(){
    return newWind
}

function updateWindow(){
    var doc = newWind.document

    
    
    
}

export { openNewWindow, getWindow, updateWindow }