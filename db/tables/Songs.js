

async function getPreviews(amount,db){
    return await new Promise((resolve, reject)=>{
        db.all("SELECT title,id FROM songs ORDER BY title ASC LIMIT ? ",[amount],(err,rows)=>{
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

async function getByPrefix(prefix,db){
    return await new Promise((resolve,reject)=>{
        db.all("SELECT title,id FROM songs WHERE title LIKE ? ORDER BY title ASC",[prefix + "%"],(err,rows)=>{
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
                    row = JSON.parse(row.lyrics)
                    
                    resolve(row)
                
                }

            })

        })
        songs.push(result_row)
    }
    
    return songs
}

async function getCategories(db){
    return await new Promise((resolve,reject)=>{
        db.all("SELECT DISTINCT category FROM songs", (err,rows)=>{
            if (err){
                console.debug("Error while fetching category rows from db: ", err.message)
                reject(err)
            }
            else{
                resolve(rows)
            }
        })

    })
}
    
    
    
    
    


module.exports = { getPreviews, getByPrefix, getFullById, getCategories }