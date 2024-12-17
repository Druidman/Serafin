function getSongsPreview(amount){
    var data = window.electronAPI.getSongsPreview(amount)
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

function getSongsByPrefix(prefix){
    var data = window.electronAPI.getSongsByPrefix(prefix)
    return data
}

function getSongCategories(){
    var data = window.electronAPI.getSongCategories()
    return data
}

export { getSongsFullById, getSongsPreview, getSongsByPrefix, getSongFullById, getSongCategories }