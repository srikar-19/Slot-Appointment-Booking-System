const JWT = require('jsonwebtoken')

//create middleware function
module.exports = async(req,res,next)=>{
    try{
        const bearerHeader = req.headers['authorization']
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
       // console.log(token)
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(404).send({message:'Auth Falied',success:false})
                //req.body.userId=NULL;
            }
            else{
                req.body.userId = decode.id
                next()
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(401).send({message:'Auth Falied',success:false}); 
    }
}