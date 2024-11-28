

function preview(amount,db){
    return new Promise((resolve, reject)=>{
        db.all("SELECT title,id FROM songs LIMIT ?",[amount],(err,rows)=>{
            if (err){
                console.error(err.message)
                reject(err)
            }
            else {
                resolve(rows)
            
            }
        })
    })
}

function getByPrefix(prefix,db){
    return new Promise((resolve,reject)=>{
        db.all("SELECT title,id FROM songs WHERE title LIKE ? ",[prefix + "%"],(err,rows)=>{
            if (err) {
                console.error(err.message)
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

async function getFullById(ids,db){
    var songs = []
    for (id of ids){
        var result_row = await new Promise((resolve,reject)=>{
            db.get("SELECT lyrics FROM songs WHERE id=?",[id],(err,row)=>{
                if (err){
                    console.log("Error occured while getting lyrics from id",id," : ",err.message)
                    reject(err)
                }
                else{
                    resolve(row)
                
                }

            })

        })
        songs.push(result_row)
    }
    
    return songs
}
    
    
    
    
    


module.exports = { preview, getByPrefix, getFullById }