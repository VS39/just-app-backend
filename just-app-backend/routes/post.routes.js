const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const { checkAuth } = require("../middlewares/check-auth");

const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Inavlid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "./images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];

    callback(null, name + "-" + Date.now() + ext);
  },
});

router.post(
  "/addPost",
  multer({ storage: storage }).array("image"),
  checkAuth,
  PostController.addPost
);

module.exports = router;
