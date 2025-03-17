const fs = require("fs")
const path = require("path")

async function CheckIfRecordExists(title,category,db){
    const checkIfExists = db.prepare("SELECT * FROM songs WHERE title =? AND category =?")

    return await new Promise((resolve,reject)=>{
        checkIfExists.get(title,category,(err,row)=>{
            if (err){
                console.log("Error while checking if record already exists during insertion in db")
                reject(err)
            }
            else{
                if (!row){
                    resolve(false)
                    
                }
                else{
                    resolve(true)
                
                    
                }  
                
                
            }
        })
    })
}

async function FillDbRow(title,category,chorus,lyrics,db){
    const fillDbRow = db.prepare("INSERT INTO songs(title,category,chorus,lyrics) VALUES (?,?,?,?)")

    return new Promise((resolve,reject) =>{
        lyrics = JSON.stringify(lyrics)
        chorus = JSON.stringify(chorus)
        fillDbRow.run(title,category,chorus,lyrics, (err)=>{
            if (err){
                console.log("error while inserting data to db")
                reject(err)
            }
            else{
            
                resolve()
            }
        })
    })
}



async function FillWithData(db,data){
    console.log("filling")
    var data = data["data"]
    
    var songsByCategoryName = data["categories"]
    var categories = Object.keys(songsByCategoryName)

    for (var category of categories){
        const songs = songsByCategoryName[category]

        for (var song of songs){
            var title = song["title"]
            var chorus = song["chorus"]
            var lyrics = song["lyrics"]
            
            if (await CheckIfRecordExists(title,category,db)){
                continue
            }

            await FillDbRow(title,category,chorus,lyrics,db)

        }
    }    
    console.log("filled")
    
    
}
        

module.exports = { FillWithData }