//models
const Post = require("../model/post");
const { deleteFromImageKit } = require("../utils/imagekit");

//user profile

const addPost = async (req, res) => {
  const { title, body,image,pdf } = req.body;
  try {
    const newposts = new Post({
      title,
      body,
      image,
      pdf
    });
    const savedPost = await newposts.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) return res.status(404).json();

    // const data = posts.map((post) => {
    //   const item = post.toJSON();
    //   if (item.image) {
    //     item.image = {
    //       data: item.image.data.toString("base64"),
    //       contentType: item.image.contentType,
    //     };
    //   }
    //   if (item.pdf) {
    //     item.pdf = {
    //       data: item.pdf.data.toString("base64"),
    //       contentType: item.pdf.contentType,
    //     };
    //   }
    //   return item;
    // });

    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
};

const getPost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json([post]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postId } = req.params;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

     await deleteFromImageKit(post.image.id);
     await deleteFromImageKit(post.pdf.id);

    // Delete the post and return a success message
    const removedpost = await post.remove();
    res.json(removedpost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body,image,pdf } = req.body;
  try {
    const post = await Post.findById(id);
  
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if(image && image.url && post.image) await deleteFromImageKit(post.image.id);
    if(pdf && pdf.url && post.pdf) await deleteFromImageKit(post.pdf.id);

    post.title = title;
    post.body = body;
    post.updatedAt = Date.now();
    if(image)post.image = image;
    if(pdf)post.pdf = pdf;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
};
