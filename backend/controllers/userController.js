import User from '../models/user.js';

// Register user
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  // Check if email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists." });
  }

  // Create new user
  const user = new User({ fullname, email, password });
  await user.save();

  res.status(201).json({ message: "User registered successfully", user });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  res.status(200).json({ message: "Login successful", userId: user._id, user: { fullname: user.fullname } });
};


const logoutUser = (req, res) => {
  res.status(200).json({ message: "User logged out successfully." });
};

const GetAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
    
    // Check if no users were found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // Respond with the list of users
    res.status(200).json({ message: "All users retrieved successfully", users });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

export { registerUser, loginUser, logoutUser, GetAllUsers };
