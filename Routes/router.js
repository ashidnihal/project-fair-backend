//  import express
const express =require('express')

// import userCOntroller

const userController = require('../Controllers/userController')


// import projectCOntroller
// import jwt
const jwtMiddleware =require('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

const projectControl = require('../Controllers/projectControl')
//  create router objects of express to define path
const router = express.Router()

// registerapi
router.post('/register',userController.register)

// login api call
router.post('/login',userController.login)

// add project api call
router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectControl.addProject)

// particular user project
router.get('/project/get-a-project',jwtMiddleware,projectControl.getAProject)
// home project
router.get('/project/home-project',projectControl.getHomeProjects)
// all user project
router.get('/project/get-all-project',jwtMiddleware,projectControl.getAllUserProject)
// delete user project
router.delete('/project/delete-a-project/:pid',jwtMiddleware,projectControl.deleteUserProject)
// update userproject
router.put('/project/update-a-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectControl.updateUserProject)

module.exports=router