
const projects = require('../Models/projectSchema')
// import token
// const jwt =require('jsonwebtoken')

exports.addProject=async(req,res)=>{
    console.log("Inside Add project method");
    const {title,language,github,livelink,overview} =req.body
    const projectImage =req.file.filename
    const userId=req.payload
    console.log(title,language,github,livelink,overview,projectImage);
    console.log(userId);
    try{
        existingProject= await projects.findOne({github})
        if(existingProject){
            res.status(404).json("Project already exists")
        }else{
            const newProject= new projects({title,language,github,livelink,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(401).json({message:err.msg})
    }
  
}


// 1.get a particular user project details
exports.getAProject=async(req,res)=>{
const userId=req.payload
try{
    const AProject= await projects.find({userId})
if(AProject){
    res.status(200).json(AProject)
}
else{
    res.status(401).json("Can't find the project")
}
}
catch(err){
    res.status(401).json({message:err.message})
}
}
// 2.get 3 project details for home project
exports.getHomeProjects=async(req,res)=>{
    
    try{
        const HomeProject= await projects.find().limit(3)
    if(HomeProject){
        res.status(200).json(HomeProject)
    }
    else{
        res.status(401).json("Can't find the project")
    }
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
    }
//3. get all user project details
exports.getAllUserProject=async(req,res)=>{
//   search
    const search=req.query.search
    console.log(search);

        let query={}
        if(search){
            query.language = {$regex:search,$options:"i"}
        }
   
        
    
    try{
        const getAllUserProject= await projects.find(query)
    if(getAllUserProject){
        res.status(200).json(getAllUserProject)
    }
    else{
        res.status(401).json("Can't find the project")
    }
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
    }

    // delete user project
    exports.deleteUserProject=async(req,res)=>{
        const {pid}=req.params //get project id
        try {
            const deleteUserProject= await projects.findOneAndDelete({_id:pid})
            // Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
            res.status(200).json(deleteUserProject)
        } catch (err) {
            res.status(401).json({message:err.message})
        }

    }

    // update user project

    exports.updateUserProject=async(req,res)=>{
        const{title,language,github,livelink,overview,projectImage}=req.body
        userId=req.payload
        const {pid}=req.params
        const uploadImage= req.file?req.file.filename:projectImage
        try{
            const updateProject= await projects.findByIdAndUpdate({_id:pid},{title,language,github,livelink,overview,projectImage:uploadImage,userId})
            await updateProject.save()
            res.status(200).json(updateProject)
        }
        catch (err) {
            res.status(401).json({message:err.message})
        }
    }