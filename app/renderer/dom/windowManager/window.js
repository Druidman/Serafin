var windows = {}

function openNewWindow(filename,name){
    
    var newWind = window.open(filename,"_blank","width=1000,height=500,frame=false")
    
    windows[name] = newWind
}

function check_window_active(name){
    var currWind = windows[name]
    
    if (!currWind){
        return false
    }
    if (currWind.closed){
        return false
    }
    return true
  
}

function getWindow(name){
    return windows[name]
}

export { openNewWindow, getWindow, check_window_active }