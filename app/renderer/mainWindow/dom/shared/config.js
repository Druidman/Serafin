function setupDisplay(coords){
    var availableDisplays = document.getElementById("availableDisplays").childNodes
    for (let display of availableDisplays){
        let dCoords = JSON.parse(display.getAttribute("value"))
        console.log(coords)
        console.log(dCoords)
        
        if (coords["x"] == dCoords.x && coords["y"] == dCoords.y){
            display.setAttribute("selected","selected")
            console.log("selected")
            return
        }
    }

}



export {
    setupDisplay
}