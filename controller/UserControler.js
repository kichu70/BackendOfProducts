import dotenv from "dotenv"
import { validationResult } from "express-validator";
import users from "../models/UsersSche.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config()

export const AllUserdata = async (req, res) => {
  try {
    const data = await users.find({isDeleted:false});
    res.status(201).json({ message: "data getted", data: data });
  } catch (err) {
    console.error(err, "data of user not getted");
    res.status(404).json("user not found!!");
  }
};

export const AddUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;


    const errors =validationResult(req);
    // console.log("aaaaaaaaa",req)
    if(!errors.isEmpty()){
      const FieldErrors ={};
      errors.array().forEach(err=>{
        console.log(err, 'err*************')
        const key = err.path;
        console.log(key, 'key*********')
       FieldErrors[key]= err.msg;

      })
      return res.status(400).json({
        message: 'field missing',
        msg:FieldErrors
      })
    }

    const hashedPassword = await bcrypt.hash(password,10)//used to hash password decription


    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "email already existed" });
    }
    const newUser = await users.create({ username, password:hashedPassword, email });
    res.status(201).json({ message: "data added", data: newUser });
  } catch (err) {   
    console.error(err, "server error");
    res.status(500).json("server error");
  }
};

export const DeletUser = async (req, res) => {
  const { id } = req.query;
  try {
    // const dltuser = await users.findByIdAndDelete(id); 
    // same as the product case go and read there
    const dltuser =await users.findByIdAndUpdate(id,{isDeleted:true})

    if (!dltuser) {
      return res.status(404).json({ message: "user not exist" });
    }
    res.status(201).json({ message: "data deleted", data: dltuser });
  } catch (err) {
    console.error(err, "not deleted");
    res.status(500).json({ message: "server error to do dlt" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.query;
    const { username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const update = await users.findByIdAndUpdate(id, { username, password:hashedPassword });
    if (!update) {
      return res.status(404).json({ message: "no user found" });
    }

    const passwordPattern =/^[A-Za-z].{7,}$/
    if(!passwordPattern.test(password)){
        return res.status(404).json({message:"password must contain 8 charecters and start with any letter !!"})
    }
    res.status(201).json({ message: "data have been updated", data: update });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server is error to do update" });
  }
};



export const Login =async(req,res)=>{
  const{email,username,password}=req.body

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    const FieldErrors={};
    errors.array().forEach((err)=>{
      const key =err.path
      FieldErrors[key]=err.msg;
    })
    res.status(400).json({
      message:"feild missing",
      msg:FieldErrors
    })
  }

  const user = await users.findOne({$or:[{email:email},{username:username}]})
  if(!user){
    console.log("user not found")
    return res.status(400).json({message:"no user found"})
  }
  const stored = user.password;
  const checkingHashed = /^\$2[aby]\$\d{2}\$/.test(stored);
  let isMatch= false;
  if(checkingHashed){
     isMatch = await bcrypt.compare(password,user.password)
  }
  else{
    isMatch = password === stored
  }

  if(isMatch){
    const token =jwt.sign(
      {id:user._id,username:user.username},process.env.JWT_SECRET
    )
    const userdata ={id:user._id,username:user.username,email:user.email}
    res.json({message:"login successful"
      ,Accestoken:token
      ,user:userdata,
    })
  }
  else{
    res.status(401).json({message:"Invalid password"})
  }

}