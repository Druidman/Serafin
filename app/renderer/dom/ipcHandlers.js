function getSongsPreview(amount){
    var data = window.electronAPI.getSongsPreview(amount)
    return data
}

function getSongsFullById(ids){
    var songs = window.electronAPI.getSongsFullById(ids)
    return songs
}

function getSongsByPrefix(prefix){
    var data = window.electronAPI.getSongsByPrefix(prefix)
    return data
}

export { getSongsFullById, getSongsPreview, getSongsByPrefix }