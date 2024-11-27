

function read_titles(amount,db){
    return new Promise((resolve, reject)=>{
        db.all("SELECT title,id FROM songs LIMIT ?",[amount],(err,rows)=>{
            if (err){
                console.error(err.message)
                reject(err)
            }
            else {
                console.log(rows)
                resolve(rows)
            }
        })
    })
}


module.exports = { read_titles }