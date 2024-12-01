const User = require('../models/User'); // Import the User model

// Controller function to handle Google Sign-In data
exports.handleGoogleSignIn = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      
      user = new User({ name, email });
      await user.save();
    }

    return res.status(200).json({ message: 'User processed successfully', user });
  } catch (error) {
    console.error('Error in Google Sign-In:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
