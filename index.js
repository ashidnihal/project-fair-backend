require('dotenv').config() // 1.Loads .env file contents into process.env by default.

//2 import express
const express=require('express')
// 3.import cors
const cors =require('cors')
// 7.import db
const db = require('./DB/connection')
// 8.import router
const router =require('./Routes/router')
// 9
const applicationMiddleware=require('./Middlewares/applicationMiddleware')
// 4. create a appliction using express
const pfserver =express()
// 5.use
pfserver.use(cors())
pfserver.use(express.json())//middleware
pfserver.use(applicationMiddleware)
pfserver.use(router)

// used to export images from backend
pfserver.use('/uploads',express.static('./uploads'))
//6. port creation
const PORT =4000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log('pfServer listening on port '+PORT);
})

pfserver.get('/',(req,res)=>{
    res.send('welcome to project fair')
})