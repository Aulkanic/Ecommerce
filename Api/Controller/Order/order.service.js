const pool = require('../../Helpers/database')

module.exports = {
    Checkout:(data,callBack) =>{

        function getCurrentFormattedDate() {
            const months = [
              'January', 'February', 'March', 'April', 'May', 'June', 'July',
              'August', 'September', 'October', 'November', 'December'
            ];
          
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = months[currentDate.getMonth()];
            const year = currentDate.getFullYear();
          
            return `${month} ${day}, ${year}`;
          }
        function generateRandomNumber() {
            const min = 1000000; // Smallest 7-digit number
            const max = 9999999; // Largest 7-digit number
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
        const formattedDate = getCurrentFormattedDate();
        const orderNumber = generateRandomNumber();
        pool.query(`insert into userorders(userId,ordernum,item,quantity,price,images,orderedIn,paymentMethod,address)values(?,?,?,?,?,?,?,?,?)`,
        [
            data.userid,
            orderNumber,
            data.item,
            data.quantity,
            data.price,
            data.images,
            formattedDate,
            data.paymentMethod,
            data.address
        ],(err,results) =>{
            if(err){
                callBack(err)
            }
           else{
            pool.query(`select * from userorders where userId =?`,
            [
                data.userId
            ],(err,results) =>{
                if(err){
                    callBack(err)
                }
                return callBack(null,results)
            })
           }
        })
    },
    Orders:(data,callBack) =>{
        pool.query(`select * from userorders where userId = ?`,
        [
            data.userId
        ],(err,results) =>{
            if(err){
                callBack(err)
            }
            return callBack(null,results)
        })
    },
    Cancel:(data,callBack) =>{
        pool.query(`delete from userorders where orderedIn = ? and paymentMethod = ?`,
        [
            data.orderedIn,
            data.paymentMethod
        ],(err,results) =>{
            if(err){
                callBack(err)
            }
            return callBack(null,results)
        })
    }
}