

async function getPreviews(categoryName,db){
    return await new Promise((resolve, reject)=>{
        console.log(categoryName)
        if (categoryName == "wszystko"){
            db.all("SELECT title,id,category FROM songs ORDER BY title ASC LIMIT 100",(err,rows)=>{
                if (err){
                    console.error(err.message)
                    reject(err)
                }
                else {
                    console.log(rows)
                    resolve(rows)
                
                }
            })
        }
        else{
            db.all("SELECT title,id,category FROM songs WHERE category=? ORDER BY title ASC LIMIT 100",[categoryName],(err,rows)=>{
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
            db.all("SELECT title,id,category FROM songs WHERE title LIKE ? ORDER BY title ASC LIMIT 100",[prefix + "%"],(err,rows)=>{
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
            db.all("SELECT title,id,category FROM songs WHERE title LIKE ? AND category=? ORDER BY title ASC LIMIT 100",[prefix + "%",categoryName],(err,rows)=>{
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

async function updateById(id,values,db){
    return await new Promise((resolve,reject)=>{
    
        
        db.run(
            `UPDATE songs SET title=?,  category=?, lyrics=?  WHERE id=?`,
            [String(values["title"]),String(values["category"]),JSON.stringify(values["lyrics"]),id],
            (err)=>{
            if (err){
                console.debug("Error occured while updating songs table: ", err)
                reject(err)
            }
            else{
                resolve(true)
            }

        })
    
    })
}

async function createSong(values,db){
    return new Promise((resolve,reject)=>{
        db.run("INSERT INTO songs(title,lyrics,category) VALUES (?,?,?)",
            [String(values["title"]),JSON.stringify(values["lyrics"]),String(values["category"])],
        (err)=>{
            if (err){
                console.debug("Error occured while creating record in songs table: ", err)
                reject(err)
            }
            else{
                resolve(true)
            }
        })
    })

}
    
    
    
    
    


module.exports = { getPreviews, getByPrefix, getFullById, getCategories, updateById,createSong }