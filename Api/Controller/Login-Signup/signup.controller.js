const { Select,Create } = require('./signup.service')
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
    CreateAccount:(req,res) =>{
        const data = req.body;
        Select(data,(err,results) =>{
            if(err){
               return res.json({
                success:0,
                message:'Server Error',
                error: err
               })
            }else if(results.length > 0){
                return res.json({
                    success:0,
                    message:'Email Address already registered!!'
                })
            }else{
                const salt = genSaltSync(10);
                data.password = hashSync(data.password, salt);
                Create(data,(err,results) =>{
                    if(err){
                        return res.json({
                            success:0,
                            message:'Server Error',
                            error: err
                        })                 
                    }
                    return res.json({
                        success:1,
                        message:'Account Created'
                })
            })
        }
    })
    }
}