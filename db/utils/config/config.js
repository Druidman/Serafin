const migrations = require("../Migrations/migrations")
const { FillWithData } = require("../utils/FillDatabase")


async function Config(db){
    console.debug("CONFIG STARTED")

    db.serialize(()=>{
        migrations.MigrateSongs(db)
    })

    
    await FillWithData(db)
    
    
    console.debug("CONFIG ENDED")
    
}

module.exports = { Config }