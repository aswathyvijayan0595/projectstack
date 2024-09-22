const { users, projects } = require('../modal/collection')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { username, password, email } = req.body
    try {
        const data = await users.findOne({ email })
        if (data) {
            res.status(400).json("user already exists")
        }
        else {
            const newUser = new users({
                username,
                email,
                password,
                profile: "",
                Linkedin: "",
                github: ""
            })
            await newUser.save()
            res.status(200).json(`${username} is registered successfully`)
        }
    }
    catch (err) {

        res.status(401).json("register api not working")

    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await users.findOne({ email, password })
        if (data) {
            const token = jwt.sign({ _id: data._id }, "superkey123")
            res.status(200).json({ user: data, token })

        }
        else {
            res.status(401).json("incorrect credentials")

        }
    } catch (err) {
        res.status(401).json("login api failed")
    }
}
exports.addProject = async (req, res) => {
    const { title, overView, languages, github, website } = req.body
    // project img = multer
    const proImg = req.file?.filename
    // user id = middileware jwt
    const userId = req.payload
    try {
        const existProject = await projects.findOne({ github })
        if (existProject) {

            res.status(406).json("project already uploaded add new one")

        }
        else {
            const newPro = new projects({
                title, overView, languages, github, website, proImg, userId
            })
            await newPro.save()
            res.status(200).json(newPro)
        }

    }
    catch (err) {
        res.status(401).json("Add project APi not working")


    }
}

exports.userProjects = async (req, res) => {
    const userId = req.payload
    try {
        const userAllProjects = await projects.find({ userId })
        if (userAllProjects) {
            res.status(200).json(userAllProjects)
        }
        else {
            res.status(400).json("user projects not avilable")
        }

    }
    catch (err) {
        res.status(401).json("userprojects api not working")

    }
}
exports.allLimitProjects = async (req, res) => {
    try {
        const limitProjects = await projects.find().limit(3)
        if (limitProjects) {
            res.status(200).json(limitProjects)
        }
        else {
            res.status(400).json("projects not avilable")
        }

    }
    catch (err) {
        res.status(401).json("allLimitProjects api not working")

    }
}
exports.getAllProjects = async (req, res) => {
    try {
        const allProjects = await projects.find()
        if (allProjects) {
            res.status(200).json(allProjects)
        }
        else {
            res.status(400).json("projects not avilable")
        }

    }
    catch (err) {
        res.status(400).json("getallprojects api not working")

    }
}
exports.editProject = async (req, res) => {
    const { title, overView, languages, github, website,proImg } = req.body
    // project img = multer
    const projectImage= req.file?req.file.filename:proImg
    // user id = middileware jwt
const {_id}=req.params
    try {
        const existingPro = await projects.findOne({ _id })
        if (existingPro) {
            existingPro.title=title
            existingPro.overView=overView
            existingPro.languages=languages
            existingPro.github=github
            existingPro.website=website
            existingPro.proImg=projectImage
            await existingPro.save()

            

            res.status(200).json("project updated")

        }
        else {

            res.status(400).json("project not found")
        }

    }
    catch (err) {
        res.status(401).json("update project APi not working")


    }
}
exports.deleteProject=async(req,res)=>{
    const {_id}=req.params
    try{
        const data=await projects.deleteOne({_id})
        if(data){
            res.status(200).json("project deleted")

        }
        else{
            res.status(404).json("project not found")


        }

    }
    catch(err){
        res.status(401).json("projectdelete Api not working")

    }


}


