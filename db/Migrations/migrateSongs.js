function MigrateSongs(db) {
    
    db.run("CREATE TABLE IF NOT EXISTS songs (\
        id INTEGER PRIMARY KEY,\
        title TEXT,\
        category TEXT\
        chorus TEXT,\
        lyrics TEXT\
    )")
       
    

    
}


module.exports = { MigrateSongs }