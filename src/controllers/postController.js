//models
const Post = require("../model/post");

//user profile

const addPost = async (req, res) => {
  const { title, body } = req.body;

  try {
    const newposts = new Post({
      title,
      body,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    const savedPost = await newposts.save();
    res.header(
      "Access-Control-Allow-Origin",
      "https://dorfvilleadmin.netlify.app"
    );
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

    const data = posts.map((post) => {
      const item = post.toJSON();
      if (item.image) {
        item.image = {
          data: item.image.data.toString("base64"),
          contentType: item.image.contentType,
        };
      }
      return item;
    });
    res.header(
      "Access-Control-Allow-Origin",
      "https://dorfvilleadmin.netlify.app"
    );
    res.status(200).json(data);
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
    res.header(
      "Access-Control-Allow-Origin",
      "https://dorfvilleadmin.netlify.app"
    );
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

    // Delete the post and return a success message
    const removedpost = await post.remove();
    res.header(
      "Access-Control-Allow-Origin",
      "https://dorfvilleadmin.netlify.app"
    );
    res.json(removedpost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title;
    post.body = body;
    post.updatedAt = Date.now();

    if (req.file) {
      post.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedPost = await post.save();
    res.header(
      "Access-Control-Allow-Origin",
      "https://dorfvilleadmin.netlify.app/"
    );
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
