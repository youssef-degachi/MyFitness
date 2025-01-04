import User from "../models/user.js";

// create a new user
// @param fullname, email, password
// @result create a new user
// Post request
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  // if email exist show message 'email is exists'
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is exists." });
  }

  // if user not exist create it
  const user = new User({ fullname, email, password });
  await user.save();
  // return that user created succufly
  res.status(201).json({ message: "User registered successfully", user });
};

// Login user
// @param email, password
// @result return email and password
// post or get request => I use post for send the body
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // find user by email and check if psw is the same with password exist
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid email or password." });
  }
  // return userId and fullname
  res
    .status(200)
    .json({
      message: "Login successful",
      userId: user._id,
      fullname: user.fullname,
    });
};

//logout function is don't have any specific functionality yet
// Post request
const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully." });
};

// get all user to check what i have
// get request
const GetAllUsers = async (req, res) => {
  try {
    // get all users from the DB
    const users = await User.find();

    // show all user
    res
      .status(200)
      .json({ message: "All users retrieved successfully", users });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

export { registerUser, loginUser, logoutUser, GetAllUsers };
