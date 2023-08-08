const { compareSync } = require('bcrypt');
const { SelectUserEmail } = require('./login.service')

module.exports ={
    Login:(req,res) =>{
        const data = req.body;
        console.log(data)
        SelectUserEmail(data,(err,results) =>{
            if(err){
               return res.json({
                success:0,
                message:'Something Went Wrong',
                err: err
               })
            }else if(!results || results.length === 0){
                return res.json({
                    success:0,
                    message:'Invalid email or password'
                })
            }else{
                const isPasswordMatched = compareSync(data.password,results.password)
                if(!isPasswordMatched){
                    return res.json({
                        success:0,
                        message:'Invalid email or password'
                    })   
                }else{
                    results.password = undefined;
                    return res.json({
                        success: 1,
                        message:'Login Successfully',
                        user:results
                    })
                }
            }
        })
    }
}