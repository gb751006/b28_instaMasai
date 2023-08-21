const express = require("express");
const { auth } = require("../middleware/auth");
const { PostModel } = require("../models/postSchema");

const postRouter = express.Router();

// GET POSTS
postRouter.get("/", auth, async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADD POSTS
postRouter.post("/add", auth, async (req, res) => {
  try {
    const post = new PostModel(req.body);
    console.log(post)
    await post.save();
    res.status(200).json({ message: "Post created successfully." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// EDIT POSTS
postRouter.patch("/update/:postId", auth, async (req, res) => {
  const { postId } = req.params;
  const post = await PostModel.findOne({ _id: postId });

  try {
    if (req.body.userId !== post.userID) {
      res.status(400).json({ msg: "You are not authorized" });
    } else {
      await PostModel.findByIdAndUpdate(postId, req.body);
      res.status(200).json({ message: "Post updated successfully." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE POST
postRouter.delete("/delete/:postId", auth, async (req, res) => {
  const { postId } = req.params;
  const post = await PostModel.findOne({ _id: postId });

  try {
    if (req.body.userId !== post.userID) {
      res.status(400).json({ msg: "You are not authorized" });
    } else {
      await PostModel.findByIdAndDelete(postId);
      res.status(200).json({ message: "Post deleted successfully." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  postRouter,
};
