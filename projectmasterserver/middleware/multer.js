const multer = require('multer')

const storage =multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`Img-${Date.now()}-${file.originalname}`)
    }
})
// file filter
const fileFilter= (req,file,callback)=>{
    if(file.mimetype=='image/jpg' || file.mimetype=='image/jpg'|| file.mimetype=='image/jpeg' || file.mimetype=='image/png')
    {
        callback(null,true)
    }
    else{
        callback(null,false)
       return callbackl(new Error("only accepts jpg/jpeg/png file formats"))
    }
}
// upload
const upload= multer({storage,fileFilter})
module.exports=upload