import { Post } from "../models/post.model.js"

const createPost = async ( req , res) => {
  try {
     const {name, description, age} = req.body;

     if(!name || !description || !age) {
      return res.status(400).json({
        message: "All field are required"
      });
     }

     const post = await Post.create({name, description, age});
     res.status(201).json({
      message: "Post sucessfully", post
     });

    
  } catch (error) {
      res.status(500).json({
        message: "Server Internal Error", error
      });    
  }
}


const getPosts = async ( req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error", error
    })
  }
}

const updatePosts = async (req, res) => {
  try {
    
    if(Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data provided for update"
      });
    }

     const post = await Post.findByIdAndUpdate(req.params.id, req.body, 
    {new: true});

    if(!post) return res.status(404).json({
      message: "Post not found"
    });

    res.status(200).json({
      message: "Post Updated Sucessfully", post
    });



  } catch (error) {
    res.status(500).json({
      message: "Server Internal error", error
    });
    
  }
}


const deletePosts = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndUpdate(req.params.id);

    if(!deleted) return res.status(404).json({
      message: "Post not found"
    });

    res.status(200).json({
      message: "Post Sucessfully deleted"
    });


  } catch (error) {
    res.status(500).json({
      message: "Server Internal error", error
    });
  }
}



export {
  createPost,
  getPosts,
  updatePosts,
  deletePosts
}