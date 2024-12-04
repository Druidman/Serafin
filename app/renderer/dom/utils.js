
function get_ids(){ 
    var playlist = document.getElementById("playlist")
    var songPreviews = playlist.querySelectorAll(".dbRecord")

    var ids = []
    for (var preview of songPreviews){
        ids.push(preview.id)
    }
    return ids
}

export { get_ids }