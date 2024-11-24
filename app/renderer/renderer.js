

document.getElementById("play").onclick = () => {
    var data = window.electronAPI.getData()

    var dataBox = document.getElementById("databaseViewer")
    console.log(data)



    for (var element of data){
        var box = document.createElement("div")
        var name = document.createElement("h1")
        var lyrics = document.createElement("p")
        name.textContent = element[0]
        lyrics.textContent = element[1]
        box.append(name)
        box.append(lyrics)

        dataBox.append(box)
    }
}
    