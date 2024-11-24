

function FillWithSampleData(db){
    const fs = require("fs")
    const path = require("path")
    
    const fill = db.prepare("INSERT INTO songs(name,lyrics) VALUES (?,?)")
  
    const filepath = path.join(__dirname,"data.json")
    var data = fs.readFileSync(filepath,'utf-8')
    data = JSON.parse(data)
  
    
    for (var sample of data["SampleDataSongs"]){
        fill.run(sample[0],sample[1])
    }

}

module.exports = { FillWithSampleData }