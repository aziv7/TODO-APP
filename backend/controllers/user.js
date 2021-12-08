const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("password name email");
  if (user && (await user.matchPassword(password))) {
    token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.json({
      user: { name: user.name, _id: user._id, email: user.email },
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("user already exists");
  }
  const createdUser = await User.create({ name, email, password });

  if (createdUser) {
    res.json(createdUser);
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

module.exports = { registerUser, authUser };
