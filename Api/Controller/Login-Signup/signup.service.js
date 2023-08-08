const pool = require('../../Helpers/database')

module.exports = {
    Create:(data,callBack) =>{
        try {
            pool.query(`insert into userlist(name,mobilenum,email,password)values(?,?,?,?)`,
            [
                data.name,
                data.mobileNumber,
                data.email,
                data.password
            ],(err,results) =>{
                if(err){
                    callBack(err)
                }
                return callBack(null,results)
            })
            
        } catch (error) {
            console.log(error)
        }
    },
    Select:(data,callBack) =>{
        try {
            pool.query(`select * from userlist where email = ?`,
            [
                data.email
            ],
            (err,results) =>{
                if(err){
                    callBack(err)
                }
                return callBack(null,results)
            })
        } catch (error) {
            console.log(error)
        }
    }
}