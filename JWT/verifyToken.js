import jwt from "jsonwebtoken";

export const verifyToken =(req,res,next)=>{
    const authHeader =req.headers.authorization;
    const token =authHeader &&  authHeader.split(" ")[1];

    if(!token){
        return res.status(400).json({message:"no token found!!"})
    }
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        req.user=decoded
        next(); 
    }
    catch(err){
        console.error(err,"error is found on creating token")
        res.status(401).json({message:"expaired token"})
    }
}