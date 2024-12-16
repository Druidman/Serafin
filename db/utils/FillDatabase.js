const fs = require("fs")
const path = require("path")

async function CheckIfRecordExists(title){
    const checkIfExists = db.prepare("SELECT * FROM songs WHERE title =? ")

    return await new Promise((resolve,reject)=>{
        checkIfExists.get(title,(err)=>{
            if (err){
                console.log("Error while checking if record already exists during insertion in db")
                reject(err)
            }
            else{
                resolve("")
            }
        })
    })
}

async function FillDbRow(title,lyrics,category){
    const fillDbRow = db.prepare("INSERT INTO songs(title,lyrics,category) VALUES (?,?,?)")

    return await new Promise((resolve,reject) =>{
        lyrics = JSON.stringify(lyrics)
        fillDbRow.run(title,lyrics,category, (err)=>{
            if (err){
                console.log("error while inserting data to db")
                reject(err)
            }
            else{
                console.log("succesful insertion")
                resolve()
            }
        })
    })
}

async function FillWithData(db){

    const DataFilePath = path.join(__dirname,"songsData.json")
    const DataFile = fs.readFileSync(DataFilePath,'utf-8')

    var data = JSON.parse(DataFile)["data"]
    
    var songsByCategoryName = data["categories"]
    var categories = Object.keys(songsByCategoryName)

    for (var category of categories){
        const songs = songsByCategoryName[category]

        for (var song of songs){
            var title = song["title"]
            var lyrics = song["lyrics"]
            if (await CheckIfRecordExists(title)){
                continue
            }

            await FillDbRow(title,lyrics,category)

        }
    }    
    
    
}
        

module.exports = { FillWithData }