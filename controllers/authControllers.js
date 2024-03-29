const dataModel = require("../models/dataModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const registerController = async (req, res) => {
  try {
    const existingUser = await dataModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const user = new dataModel(req.body);

    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error: error.message,
    });
  }
};

//login callback

const loginController = async(req,res) => {
  try {
    const user = await dataModel.findOne({ email: req.body.email });
    if(!user){
      return res.status(404).send({
        success:false,
        message:"invalid credentials"
      })
    }
    console.log("User Role:", user.role);
    console.log("Request Role:", req.body.role);
    //checkrole
    if(user.role !== req.body.role){
      return res.status(500).send({
        success: false,
        message:"role doesn't match",
      });
    }
    //compare password
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if(!comparePassword){
      return res.status(500).send({
        success:false,
        message:"invalid credentials"
      })
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,{expiresIn:'10d'})
    return res.status(200).send({
      success:true,
      message:"Login Successfully",
      token,
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error in login API',
      error,
    })
  }
};

//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await dataModel.findOne({_id:req.body.userId})
    return res.status(200).send({
      success:true,
      message:"user fetched successfully",
      user
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"unable to get current user",
      error
    })
  }
}


module.exports = { registerController, loginController, currentUserController };
