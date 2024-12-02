import { construct_db_record } from "./elementConstructors.js"

function load_previews(data){
    var dataBox = document.getElementById("databaseViewer")
    dataBox.innerHTML = ""

    for (var element of data){
        var db_record = construct_db_record(element)
        dataBox.appendChild(db_record)
    }

}

export { load_previews }

