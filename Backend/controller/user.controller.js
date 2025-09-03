// import User from "../model/user.model";

import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
//const register controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "emial already exist" });
    }
    user = new User({ name, email, password });
    await user.save();
    //   generating jwt token
    const payLoad = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payLoad,
      process.env.JWT_SECRITY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user,
          token,
          message : "login successfully"
        });
      }
    );
  } catch (error) {
    console.log("error message ", error);
    return res.status(400).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
// login controller
export const login = async (req,res)=>{
  try {
    const {email,password} =  req.body
    let user = await User.findOne({email})
    if(!user) return res.status(400).json({
      message : "email doesnot exist"
    })
    const isMatch = user.matchPassword(password);
    if(!isMatch){
      return res.status(400).json({
      message : "invalid credentail"
    })
  }
   const payLoad = { user: { id: user._id, role: user.role } };
    jwt.sign(
      payLoad,
      process.env.JWT_SECRITY,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          user,
          token,
        });
      }
    );

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return res.status(400).json({
      message : error.message
    })
  }
}
// get user detail
export const getUserDetail = async (req,res)=>{
  try {
    res.json(req.user)
  } catch (error) {
    console.log('====================================');
    console.log(error.message);
    console.log('====================================');
    
  }
}