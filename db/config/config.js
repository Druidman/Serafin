const migrations = require("../Migrations/migrations")
const { FillWithSampleData } = require("../utils/FillDatabase")

async function Config(db){
    console.debug("CONFIG STARTED")
    
    db.serialize(()=>{
        migrations.MigrateSongs(db)
        

    })
    await FillWithSampleData(db)
    console.debug("CONFIG ENDED")
    


   

}

module.exports = { Config }