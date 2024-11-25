

document.getElementById("play").onclick = () => {
    var data = window.electronAPI.getData(10)

    var dataBox = document.getElementById("databaseViewer")
    console.log(data)



    for (var element of data){
        var box = document.createElement("div")
        
        var name = document.createElement("p")
        name.textContent = element["name"]
        box.append(name)

        box.classList.add("dbRecord")
        dataBox.append(box)
    }
}
    