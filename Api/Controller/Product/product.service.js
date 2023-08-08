const pool = require('../../Helpers/database')

module.exports = {
    Create:(data,callBack) =>{
        try {
            pool.query(`insert into itemlist(title,price,description,category,image,rate,count)values(?,?,?,?,?,?,?)`,
            [
                data.title,
                data.price,
                data.description,
                data.category,
                data.image,
                data.rate,
                data.count
            ],(err,results) =>{
                if(err){
                    callBack(err)
                }
                return callBack(null,results)
            })
            
        } catch (error) {
            console.log(err)
        }
    },
    Select:(data,callBack) =>{
        try {
            pool.query(`select * from itemlist order by title ${data.sort} limit ${data.limit}`,[],
            (err,results) =>{
                if(err){
                    callBack(err)
                }
                return callBack(null,results)
            })
        } catch (error) {
            console.log(err)
        }
    },
    Selectby:({data,category},callBack) =>{
        try {
            pool.query(`select * from itemlist where category = ? order by title ${data.sort} limit ${data.limit}`,
            [
                category
            ],
            (err,results) =>{
                if(err){
                    callBack(err)
                }
                return callBack(null,results)
            })
        } catch (error) {
            console.log(err)
        }
    },
    Category:callBack =>{
        pool.query(`select category from itemlist `,[],
        (err,results) =>{
            if(err){
                callBack(err);
            }
            return callBack(null,results)
        })
    }
}