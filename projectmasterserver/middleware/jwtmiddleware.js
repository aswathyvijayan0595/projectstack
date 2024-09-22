const jwt =  require('jsonwebtoken')

const jwtMiddleWare= (req,res,next)=>{
    const token=req.headers["access_token"].split(" ")[1]
    try{
        const jwtResponse=jwt.verify(token,"superkey123")
        req.payload=jwtResponse._id
next()
    }
    catch(err){
        res.status(401).json("Autherization failed")

    }
}
module.exports=jwtMiddleWare