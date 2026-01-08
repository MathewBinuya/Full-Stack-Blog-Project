import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const {email, password} = req.body;

    // User and Password Validation
    if(!email || !password) {
      return res.status(400).json({message: "All fields are important!"});
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
    })



  } catch (error) {
    res.status(500).json({message: "Internal server error", error: error.message});
  }
}

export {
  registerUser
}