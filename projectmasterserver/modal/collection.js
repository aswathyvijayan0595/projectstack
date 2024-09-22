const mongoose =require('mongoose')
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:[3,'ten why you' ]
       

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    Linkedin:{
        type:String
    },
    github:{
        type:String 
    }
})
const projectSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
       

    },
    github:{
        type:String,
        required:true
    },
    overView:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true

    },
    website:{
        type:String,
        required:true

    },
    proImg:{
        type:String ,
        required:true

    },
    userId:{
        type:String ,
        required:true

    }
})



const projects=new mongoose.model("projects",projectSchema)
const users = new mongoose.model("users",userSchema)

module.exports={users,projects}