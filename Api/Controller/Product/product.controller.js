const { Create,Select,Category,Selectby } = require('./product.service')
const  data = require('../../Helpers/data')

module.exports = {
    CreateProduct:(req,res) =>{
        console.log(data)
        let count = 0;
        for(let i = 0;i < data.length;i++){
            const value = data[i];
            Create(value,(err,results) =>{
                if(err){
                    console.log(err)
                    return
                }
                count += 1;
                if(count === data.length){
                    res.send('done');
                }
            })
        }
    },
    SelectProduct:(req,res) =>{
        const {sort,limit} = req.query;
        const data = {sort,limit};
        console.log(data)
        Select(data,(err,results) =>{
            if(err){
                console.log(err)
                return
            }
            return res.json(results)
        })
    },
    SelectProductbyCategory:(req,res) =>{
        const {sort,limit} = req.query;
        const {category} = req.params
        const data = {sort,limit};
        console.log(data)
        Selectby({data,category},(err,results) =>{
            if(err){
                console.log(err)
                return
            }
            return res.json(results)
        })
    },
    SelectProductCategory:(req,res) =>{
        Category((err,results) =>{
            if(err){
                console.log(err)
                return
            }
            const groupedData = {};
            results.forEach(async(element) => {
                const category = element.category;
                if(!groupedData[category]){
                    groupedData[category]=[];
                }
                groupedData[category].push(element);
            });
            const list = Object.keys(groupedData);

            return res.json(list)
        })
    }
}