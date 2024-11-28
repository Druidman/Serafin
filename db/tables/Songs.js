

function read_titles(amount,db){
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


module.exports = { read_titles, getByPrefix }