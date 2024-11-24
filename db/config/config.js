
function Config(db){
    const migrations = require("../Migrations/migrations")
    
    const { FillWithSampleData } = require("../utils/FillDatabase")
    
    migrations.MigrateSongs(db)
    FillWithSampleData(db)
   

}

module.exports = { Config }