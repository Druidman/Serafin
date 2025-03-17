const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const fs = require('fs')
const { FillWithData } = require("./utils/FillDatabase.js")
const { MigrateSongs } = require("./utils/Migrations/migrations.js")

function ConnectDatabase(path_to_file){

    
    if (fs.existsSync(path_to_file)){
        const db = new sqlite3.Database(path_to_file)
        return db
    }
    else {
        return false
    }
    
}
function CreateDatabase(path_to_db){
    
    
    const db = new sqlite3.Database(path_to_db)
    db.serialize(()=>{
        MigrateSongs(db)
    })
    console.log("Migration completed")
    
    return db
}

async function CreateDatabaseFromJson(path_to_db,data){
    var db = CreateDatabase(path_to_db)
    await FillWithData(db,data)
}

module.exports = { ConnectDatabase, CreateDatabase, CreateDatabaseFromJson }