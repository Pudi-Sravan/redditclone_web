const { validationResult } = require("express-validator");
const Post = require('../models/postModel')
const createPost = async(req,res) =>{
    try{
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }
    const{title,description} = req.body;

    var obj ={
        title,
        description
    }

    if(req.body.categories){
        obj.categories=req.body.categories;
    }
   const post= new Post(obj);

const postData =await post.save();
const postfullData = await Post.findOne({_id: postData._id}).populate('categories')
return res.status(200).json({
    success: true,
    msg: 'Post created successfully!',
    data:postfullData
    
  });

    }catch (error) {
    return res.status(400).json({
      success: failure,
      msg: error.message,
    });
  }
};
const getPost = async(req,res) =>{
    try{
        
        const postData = await Post.find({}).populate('categories')
return res.status(200).json({
    success: true,
    msg: 'Post fetched successfully!',
    data:postData
    
  });

    }catch (error) {
        return res.status(400).json({
          success: failure,
          msg: error.message,
        });
      }
    }

    const deletePost = async(req,res) =>{
        try{
            const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }
          
       const{id} = req.body;
       const isExist = await Post.findOne({_id:id})
        if(!isExist){
            return res.status(400).json({
                success: failure,
                msg: 'Post does not exist',
              });
        }

        await Post.findByIdAndDelete({_id:id})
        return res.status(200).json({
            success: true,
            msg: 'Post deleted successfully!',
          });
    
        }catch (error) {
            return res.status(400).json({
              success: failure,
              msg: error.message,
            });
          }
        }

        const updatePost = async(req,res) =>{
            try{
                const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            success: false,
            msg: "Errors",
            errors: errors.array(),
          });
        }
          const {id,title,description} =req.body;    
          const isExist = await Post.findOne({_id:id})
          if(!isExist){
              return res.status(400).json({
                  success: failure,
                  msg: 'Post does not exist',
                });
          }
          var updateObj={
            title,
            description
          }

          if(req.body.categories){
            updateObj.categories=req.body.categories
          }
         const updatedData= await Post.findByIdAndUpdate({_id:id},{
            $set:updateObj
         },{new:true})
         return res.status(200).json({
            success: true,
             msg: 'Post updated successfully!',
             data:updatedData
            
          });
        
            }catch (error) {
                return res.status(400).json({
                  success: failure,
                  msg: error.message,
                });
              }
            }
module.exports={
    createPost,
    getPost,
    deletePost,updatePost
}