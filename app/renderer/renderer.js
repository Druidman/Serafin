

function plus_button(button){
    button.textContent = "-"
    var parent = button.parentNode
    var playlist = document.getElementById("playlist")
    playlist.append(parent)
}
function minus_button(button){
    button.textContent = "+"
    var parent = button.parentNode
    var databaseViewer = document.getElementById("databaseViewer")
    databaseViewer.append(parent)

}
function add_click_event(button){
    button.addEventListener("click",()=>{
        switch (button.textContent){
            case "+":
                plus_button(button)
                break;
            case "-":
                minus_button(button)
                break;
        }

    })
}



function construct_db_record(element){
    var dbRecord = document.createElement("div")
    dbRecord.classList.add("dbRecord")
    dbRecord.id = element["id"]

    var title_p = document.createElement("p")
    title_p.textContent = element["title"]

    var dbButton = document.createElement("button")
    dbButton.textContent = "+"
    dbButton.classList.add("dbRecordButton")
    dbButton.classList.add("plus")

    add_click_event(dbButton)

    dbRecord.appendChild(title_p)
    dbRecord.appendChild(dbButton)

    return dbRecord

}

function load_data(){
    var data = window.electronAPI.getData(10)
    var dataBox = document.getElementById("databaseViewer")

    for (var element of data){
        var db_record = construct_db_record(element)
        dataBox.appendChild(db_record)
    }

}

load_data()