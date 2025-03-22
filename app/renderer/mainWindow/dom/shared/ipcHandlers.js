import { setupDisplay } from "./config.js"

function openFileDialog(properties){
    var data = window.electronAPI.openFileDialog(properties)
    return data
}
function updateSongById(id,values){
    var data = window.electronAPI.updateSongById(id,values)
    return data
}
function createSong(values){
    var data = window.electronAPI.createSong(values)
    return data
}

function getSongsPreview(categoryName){
    var data = window.electronAPI.getSongsPreview(categoryName)

    return data
}

function getSongFullById(id){
    var song = window.electronAPI.getSongFullById(id)

    return song
}

function getSongsByPrefix(prefix,categoryName){
    var data = window.electronAPI.getSongsByPrefix(prefix,categoryName)
    return data
}

function getSongCategories(){
    var data = window.electronAPI.getSongCategories()
    
    return data
}

function openDisplayWindow(cords){
    var data = window.electronAPI.openDisplayWindow(cords)
    return data
}
function checkDisplayWindowActive(windowId){
    var data = window.electronAPI.checkDisplayWindowActive(windowId)
    return data
}
function writeToDisplayWindow(windowId,dataToWrite){
    window.electronAPI.writeToDisplayWindow(windowId,dataToWrite)
    
}
function setDisplayWindowFontSize(windowId){
    window.electronAPI.setDisplayWindowFontSize(windowId)
}

function getAllDisplays(){
    var data = window.electronAPI.getAllDisplays()
    return data
}

function saveConfig(){

    var coords = document.getElementById("availableDisplays").value
    let values = {
        "defaultDisplayCoords": coords
    }
    window.electronAPI.saveConfig(values)
    console.log("save")
}


function useConfig(){
    var values = window.electronAPI.getConfig()
    if (!values){
        return
    }

    values = JSON.parse(values)

    if (Object.keys(values).length == 0){
        return 
    }
    let keys = Object.keys(values)
    for (let key of keys){
        switch (key){
            case "defaultDisplayCoords":
                setupDisplay(JSON.parse(values[key]))
        }

    }

    
}

export { 
    createSong,
    getSongsPreview, 
    getSongsByPrefix, 
    getSongFullById, 
    getSongCategories, 
    updateSongById,
    getAllDisplays,

    openDisplayWindow,
    checkDisplayWindowActive,
    writeToDisplayWindow,
    setDisplayWindowFontSize,

    openFileDialog,


    useConfig,
    saveConfig
}