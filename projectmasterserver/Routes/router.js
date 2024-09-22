const express =require('express')
const user= require('../controllers/logic')
const jwtMiddleWare = require('../middleware/jwtmiddleware')
const upload = require('../middleware/multer')


const router = new express.Router()

router.post('/user/register',user.register)
router.post('/user/login',user.login)
router.post('/user/add-project',jwtMiddleWare,upload.single("proImg"),user.addProject)
// user projects
router.get('/user/get-user-projects',jwtMiddleWare,user.userProjects)
// get 3 projects
router.get('/user/get-limted-projects',user.allLimitProjects)
// get all rojects
router.get('/user/get-all-projects',user.getAllProjects)
router.put('/user/edit-projects/:_id',jwtMiddleWare,upload.single("proImg"),user.editProject)
router.delete('/user/delete-project/:_id',user.deleteProject)






module.exports=router