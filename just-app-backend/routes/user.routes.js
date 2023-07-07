const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
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
    // cb(null, "./images");
  },
  filename: (req, file, callback) => {
    // const name = file.originalname;
    const name = file.originalname.toLocaleLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    // path.extname(file.originalname)
    // console.log(file);
    callback(null, name + "-" + Date.now() + ext);
  },
});

router.post("/signUp", UserController.signUp);
router.post("/logIn", UserController.logIn);
router.post("/checkExistingUser", UserController.checkExistingUser);
router.get("/viewUser/:username", checkAuth, UserController.viewUser);
router.put(
  "/updateUser/:id",
  multer({ storage: storage }).single("profilePic"),
  checkAuth,
  UserController.updateUser
);
router.post("/resetPassword", UserController.resetPassword);
router.post("/:id/follow", UserController.follow);
router.post("/:id/unfollow", UserController.unfollow);
router.get("/:id/getfollowList", UserController.getfollowList);

router.get("/allUsers", UserController.allUsers);
router.delete("/:id", UserController.deleteUser);
router.delete("/deleteAllUsers/:id", UserController.deleteAllUsers);
router.post("/encrypt", UserController.encryptCall);
router.post("/decrypt", UserController.decryptCall);
router.get("/updateField", UserController.updateField);

module.exports = router;
