import User from "../models/Users.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id }
    }).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
