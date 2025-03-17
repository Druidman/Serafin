document.getElementById("databaseLoaderButtonJSON").addEventListener("click",(event)=>{
    var JSONData = JSON.parse(window.electronAPI.openFileDialog(["openFile"]))[0]["data"]
    var result = window.electronAPI.createDatabaseFromJSON(JSONData)
    if (!result){
        console.log("creatingDb from went wrong")
    }
    window.electronAPI.switchToIndex()
})

document.getElementById("databaseLoaderButtonDB").addEventListener("click",(event)=>{
    var DBPath = JSON.parse(window.electronAPI.openFileDialog(["openFile"]))[0]["filePath"]
    console.log(DBPath)
    var result = window.electronAPI.loadDatabase(DBPath)
    if (!result){
        console.log("creatingDb from db went wrong")
    }
    window.electronAPI.switchToIndex()
})