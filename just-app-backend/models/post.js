const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: { type: String },
  filename: { type: String },
});

const postSchema = mongoose.Schema(
  {
    image: [imageSchema],
    caption: { type: String },
    // likes: { type: Number, default: 0 },
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    uploadTime: { type: String },
    uploadedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uploadedByUsername: { type: String },
    uploadedByName: { type: String },
    uploadedByAvatar: { type: String },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = {
  Post,
};
