const jwt=require('jsonwebtoken')
const USER=require('../models/user')



const auth = async(req,res,next)=>{
    try{    
        const token=req.cookies.userData.token
        const ismatch=jwt.verify(token,process.env.JWT_TOKEN)
        const user=await USER.findOne({_id:ismatch._id,'tokens.token':token})
        if(!user){
            throw new Error('New error')
        }
        req.token=token
        req.user=user
        next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate'})
    }
    
}

module.exports= auth