import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // User and Password Validation
    if(!email || !password) {
      return res.status(400).json({message: "All fields are important!"});
    }

    if(password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      })
    }

    // Check if exist or not
    const existOrNot = await User.findOne({email: email.toLowerCase()});

    if(existOrNot) {
      return res.status(400).json({message: "Email already exist"});
    }

    // Create user
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      loggedIn: false
    });

    res.status(201).json({
      message: "User registered",
      user: {id: user._id, email: user.email}
    });



  } catch (error) {
    res.status(500).json({message: "Internal server error", error: error.message});
  }
}

const loginUser = async (req, res) => {
  try {
    
    // check user if already exist
    const {email, password} = req.body

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if(!user) return res.status(400).json({
        message: "User not found"
    });

    // compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(400).json({
      message: "Invalid credentials"
    });

    res.status(200).json({
      message: "User Logged in",
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    });


  }
}

export {
  registerUser,
  loginUser
}