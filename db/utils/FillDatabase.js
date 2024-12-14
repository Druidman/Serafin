

async function FillWithSampleData(db){
    const fs = require("fs")
    const path = require("path")
    
    const fill = db.prepare("INSERT INTO songs(title,lyrics,category) VALUES (?,?,?)")
    const check = db.prepare("SELECT * FROM songs WHERE title =? ")

    const filepath = path.join(__dirname,"data.json")
    var data = fs.readFileSync(filepath,'utf-8')
    data = JSON.parse(data) 
  
    const category = data["Category"]
    for (var sample of data["SampleDataSongs"]){
        await new Promise((resolve, reject) => {
            check.get(sample[0], (err, row) => {
                if (err) {
                    console.error("error occurred while getting data from database in fill");
                    reject(err);
                } else {
                    if (!row) {
                        console.log(row)
                        fill.run(sample[0], JSON.stringify(sample[1]), category, (err) => {
                            if (err) {
                                console.error("error while inserting");
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    } else {
                        resolve();
                    }
                }
            });
        });

        
    }
    
    
}
        

module.exports = { FillWithSampleData }