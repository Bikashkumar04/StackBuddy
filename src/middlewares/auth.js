const jwt =require('jsonwebtoken');
const User =require('../models/user');

const userAuth = async (req,res,next)=>{
    try{
        const {token} =req.cookies;

        if(!token){
            throw new Error('token is not valid!!!')
        }

        const decodeObj =await jwt.verify(token, "stackbuddy@1504")

        const{_id} =decodeObj;

       const user = await User.findById({_id:_id});
       if(!user){
        throw new Error("user not found");
       }
       req.user =user;
       next();
    }
    catch(err){
        res.status(401).send("ERROR"+ err.message)
    }
}

module.exports ={
    userAuth,
}