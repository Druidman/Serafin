

function read_names(amount,db){
    return new Promise((resolve, reject)=>{
        console.log(amount)
        db.all("SELECT name FROM songs LIMIT ?",[amount],(err,rows)=>{
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


module.exports = { read_names }