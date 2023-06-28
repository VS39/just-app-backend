const User = require("../models/user");

const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    const sendData = {
      id: user._id,
    };
    res.status(200).json({
      Data: user._id,
      Success: true,
      message: "User created successfully.",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: e.message,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      Data: users,
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

const viewUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: `User not found.` });
    }
    res.status(200).json({
      Data: user,
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: `User not found.` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json({
      Data: updatedUser,
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: `User not found.` });
    }
    res.status(200).json({
      Data: user,
      Success: true,
      message: "User deleted successfully.",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      message: e.message,
    });
  }
};

module.exports = {
  signUp,
  allUsers,
  viewUser,
  updateUser,
  deleteUser,
};
