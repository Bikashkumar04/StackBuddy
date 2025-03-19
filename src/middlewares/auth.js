const adminAuth =(req,res,next)=>{
    console.log("admin auth is getting checked !! ")
    const token ="axyz";
    const isAdminAuthorized =token =="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized request")
    }else{
        next()
    }
}
const userAuth =(req,res,next)=>{
    console.log("admin auth is getting checked !! ")
    const token ="xyza";
    const isAdminAuthorized =token =="xyz"
    if(!isAdminAuthorized){
        res.status(401).send("unAuthorized request")
    }else{
        next()
    }
}

module.exports ={
    adminAuth,
    userAuth,
};