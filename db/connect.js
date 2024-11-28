const sqlite3 = require('sqlite3').verbose()
const path = require('path')


function ConnectDatabase(){
    
    
    var path_to_file = path.join(__dirname,"Songs.db")
    const db = new sqlite3.Database(path_to_file)
    
    return db
}

module.exports = { ConnectDatabase }