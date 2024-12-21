

async function getPreviews(amount,categoryName,db){
    return await new Promise((resolve, reject)=>{
        console.log(categoryName)
        if (categoryName == "wszystko"){
            db.all("SELECT title,id FROM songs ORDER BY title ASC LIMIT ? ",[amount],(err,rows)=>{
                if (err){
                    console.error(err.message)
                    reject(err)
                }
                else {
                    resolve(rows)
                
                }
            })
        }
        else{
            db.all("SELECT title,id FROM songs WHERE category=? ORDER BY title ASC LIMIT ? ",[categoryName,amount],(err,rows)=>{
                if (err){
                    console.error(err.message)
                    reject(err)
                }
                else {
                    resolve(rows)
                
                }
            })
        }
    
        
    })
}

async function getByPrefix(prefix,categoryName,db){
    return await new Promise((resolve,reject)=>{
        if (categoryName == "wszystko"){
            db.all("SELECT title,id FROM songs WHERE title LIKE ? ORDER BY title ASC",[prefix + "%"],(err,rows)=>{
                if (err) {
                    console.error(err.message)
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            })
        }
        else{
            db.all("SELECT title,id FROM songs WHERE title LIKE ? AND category=? ORDER BY title ASC",[prefix + "%",categoryName],(err,rows)=>{
                if (err) {
                    console.error(err.message)
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            })
        }
        
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
        db.all("SELECT DISTINCT category FROM songs ORDER BY category ASC", (err,rows)=>{
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