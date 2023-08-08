const pool = require('../../Helpers/database')

module.exports ={
    SelectUserEmail:(data,callBack) =>{
        pool.query(`select * from userlist where email = ?`,
        [
            data.email
        ],(err,results) =>{
            if(err){
                callBack(err)
            }
            return callBack(null,results[0])
        })
    }
}