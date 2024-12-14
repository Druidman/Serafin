function MigrateSongs(db) {
    
    db.run("CREATE TABLE IF NOT EXISTS songs (id INTEGER PRIMARY KEY,title TEXT, lyrics TEXT, category TEXT)")
       
    

    
}


module.exports = { MigrateSongs }