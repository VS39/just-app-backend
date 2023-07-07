const { Post } = require("../models/post");
const { User } = require("../models/user");

const addPost = async (req, res) => {
  try {
    const { id, caption, uploadTime } = req.body;

    const existingUser = await User.findOne({
      _id: id,
    });

    if (!existingUser) {
      return res.status(200).json({
        Data: "",
        Success: false,
        message: "User does not exist.",
      });
    }

    const url = req.protocol + "://" + req.get("host");
    const images = req.files.map((file) => ({
      path: req.body.image != "" ? url + "/images/" + file.filename : "",
      filename: file.filename,
    }));

    const newPost = new Post({
      image: images,
      caption: caption,
      uploadedById: id,
      uploadedByUsername: existingUser.username,
      uploadedByName: existingUser.name,
      uploadedByAvatar: existingUser.profilePic,
      uploadTime: uploadTime,
    });

    newPost.save();

    const currentUser = await User.findById(req.body.id);
    currentUser.userPosts.push(newPost);
    await currentUser.save();

    res.status(200).json({
      Data: "",
      Success: true,
      message: "Posted successfully.",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: e.message,
    });
  }
};

const viewPosts = async (req, res) => {
  try {
    req.params.username = req.params.username.toLowerCase();

    const existingUser = await User.findOne({
      username: req.params.username,
    });
    if (!existingUser) {
      return res.status(200).json({
        Data: "",
        Success: false,
        message: "User does not exist.",
      });
    }

    const user = await User.findById(existingUser._id);
    if (!user) {
      return res.status(404).json({ message: `User not found.` });
    }

    // Get the IDs of the users the current user follows
    const followingIds = existingUser.following.map((user) => user._id);

    // Find posts created by the users the current user follows
    const posts = await Post.find({ uploadedById: { $in: followingIds } }).sort(
      "-createdAt"
    );

    // const userImages = await User.findById(existingUser._id).populate({
    //   path: "userPosts",
    //   select:
    //     "id caption image uploadedByUsername uploadedByAvatar uploadedByName uploadedById uploadTime", // Specify the fields you want to include
    // });
    res.status(200).json({
      Data: {
        userPosts: posts,
      },
      Success: true,
      message: "Executed successfully.",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: e.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the post by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Update the post properties
    post.caption = req.body.caption;

    // Save the updated post
    const updatedPost = await post.save();
    res.status(200).json({
      Data: "",
      Success: true,
      message: "Post updated successfully.",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: e.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Post.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: `Post not found.` });
    }
    res.status(200).json({
      Data: "",
      Success: true,
      message: "Post deleted successfully.",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: e.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { postId } = req.params;
    const { imageId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Iterate over the imageIds array and remove the corresponding images from the post's image array
    imageId.forEach((id) => {
      const imageIndex = post.image.findIndex(
        (image) => image._id.toString() === id
      );

      if (imageIndex !== -1) {
        post.image.splice(imageIndex, 1);
      }
    });

    // Save the updated post
    await post.save();

    res.status(200).json({
      Data: "",
      Success: true,
      message: "Image deleted successfully.",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  addPost,
  viewPosts,
  updatePost,
  deletePost,
  deleteImage,
};
