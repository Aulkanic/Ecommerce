const { Checkout,Orders,Cancel } = require('./order.service')

module.exports = {
    CheckoutProducts:(req,res) =>{
        const data = req.body;
        console.log(data)
        Checkout(data,(err,results) =>{
            if(err){
                console.log(err)
                return
            }
            return res.json(results)
            
        })
    },
    UserOrderlist:(req,res) =>{
        const data = req.params;
        Orders(data,(err,results) =>{
            if(err){
                console.log(err)
                return
            }
            return res.json(results)
        })   
    },
    CancelOrder:(req,res) =>{
        const data = req.body;
        console.log(data)
        Cancel(data,(err,results) =>{
            if(err){
                console.log(err)
                return
            }
            else{
                Orders(data,(err,results) =>{
                    if(err){
                        console.log(err)
                        return
                    }
                    console.log(results)
                    return res.json(results)
                })                 
            }
        })
    }
}