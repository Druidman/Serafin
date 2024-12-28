

function updateSongById(id,rowToEdit,valueToInsert){
    window.electronAPI.updateSongById(id,rowToEdit,valueToInsert)
}

function getSongsPreview(amount,categoryName){
    var data = window.electronAPI.getSongsPreview(amount,categoryName)
    return data
}

function getSongsFullById(ids){
    var songs = window.electronAPI.getSongsFullById(ids)
    return songs
}

function getSongFullById(id){
    var song = window.electronAPI.getSongFullById(id)[0]

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

function openDisplayWindow(){
    var data = window.electronAPI.openDisplayWindow()
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

export { 
    getSongsFullById, 
    getSongsPreview, 
    getSongsByPrefix, 
    getSongFullById, 
    getSongCategories, 
    updateSongById,

    openDisplayWindow,
    checkDisplayWindowActive,
    writeToDisplayWindow,
    setDisplayWindowFontSize }