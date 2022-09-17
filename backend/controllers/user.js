import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";



const secret = "test";
//signin//
 
export const signin = async(req,res)=>{
    const {email, password, fname, lname}=req.body;
    try{
        const olduser = await userModel.findOne({ email });
        if(!olduser){
            return res.status(404).json({message:"USER NOT EXISTED"})
        }
        const passwordvalid =  await bcrypt.compare(password,olduser.password);
        if(!passwordvalid) {
            return res.status(404).json({ message: "Invalid Email or Password "});
        } 
        const token = jwt.sign({email: olduser.email, id: olduser._id}, secret,{expiresIn: "1h"} )
        res.status(200).json({result: olduser, token})

    }
    catch(error){
        res.status(500).json({message: "ERROR OCCURED"});
        console.log(error);
    }
}

//signup//

export const signup = async (req, res) => {
    const { email, password, fname, lname } = req.body;

    console.log("password",password)
    try {
      const olduser = await userModel.findOne({ email });
         if (olduser) {
        return res.status(400).json({ message: "User already exists" });
        }
        
      const hashedPassword = await bcrypt.hash(password, 12)
      const result = await userModel.create({
        email,
        password: hashedPassword,
        name: `${fname} ${lname}`,
      });
      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "1h",
      })
  return    res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" ,errorDetails:error});
      console.log(error);
    }
  };

  