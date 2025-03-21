

async function getPreviews(categoryName,db){
    return await new Promise((resolve, reject)=>{
        if (categoryName == "wszystko"){
            db.all("SELECT title,id,category FROM songs WHERE id IN (SELECT MIN(id) FROM songs GROUP BY title) ORDER BY title ASC",(err,rows)=>{
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
            db.all("SELECT title,id,category FROM songs WHERE category=? ORDER BY title ASC",[categoryName],(err,rows)=>{
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
        prefix = prefix.replace(",","")
        if (categoryName == "wszystko"){
            db.all("SELECT title,id,category FROM songs WHERE UPPER(REPLACE(title,',','')) LIKE UPPER(?) AND id IN (SELECT MIN(id) FROM songs GROUP BY title) ORDER BY title ASC",["%" + prefix + "%"],(err,rows)=>{
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
            db.all("SELECT title,id,category FROM songs WHERE UPPER(REPLACE(title,',','')) LIKE UPPER(?) AND category=? ORDER BY title ASC",["%" + prefix + "%",categoryName],(err,rows)=>{
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

async function getFullById(id,db){
    
    return await new Promise((resolve,reject)=>{
        db.get("SELECT chorus,lyrics FROM songs WHERE id=?",[id],(err,row)=>{
            if (err){
                console.log("Error occured while getting lyrics and chorus from id",id," : ",err.message)
                reject(err)
            }
            else{
                resolve(row)

            }

        })

    })
        
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
            `UPDATE songs SET title=?, category=?, chorus=?, lyrics=?  WHERE id=?`,
            [
                String(values["title"]),
                String(values["category"]),
                JSON.stringify(values["chorus"]),
                JSON.stringify(values["lyrics"]),
                id
            ],
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
        db.run(
            "INSERT INTO songs(title,category,chorus,lyrics) VALUES (?,?,?,?)",
            [
                String(values["title"]),
                String(values["category"]),
                JSON.stringify(values["chorus"]),
                JSON.stringify(values["lyrics"])
            ],
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