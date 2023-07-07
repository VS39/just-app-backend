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

module.exports = {
  addPost,
};
