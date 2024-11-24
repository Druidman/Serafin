function MigrateSongs(db) {
    db.serialize(()=>{
            db.run("CREATE TABLE IF NOT EXISTS songs (id INTEGER PRIMARY KEY,name TEXT, lyrics TEXT)")
        } )
    

    
}


module.exports = { MigrateSongs }