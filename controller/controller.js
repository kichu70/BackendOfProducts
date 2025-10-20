import { validationResult } from "express-validator"
import Product from "../models/product.js"




// ---------viewAllProduct--------------------
export const allproduct = async(req,res)=>{

    try{

            const page=parseInt(req.query.page)||1;
            const limit=parseInt(req.query.limit)||4;

            const skip =(page - 1)* limit;

            const total=await Product.countDocuments({isDeleted:false});

            const data =await Product.find({isDeleted:false})
            .skip(skip)
            .limit(limit)
            res.json({
                page,
                totalPage:Math.ceil(total/limit),
                totalIteam:total,
                products:data
            })
        }
        catch(err){ 
            console.log(err)
        }
    }


// ---------------view product of user------------

export const productsOfUser =async(req,res)=>{
    try{
        const userId=req.user.id
        const data = await Product.find({user:userId,isDeleted:false})
        res.json(data)
    }
    catch(err){
        return res.json({message:"no products",data:userId})
    }
}


// ------------AddProduct------------------------
export const AddProduct =async(req,res)=>{
    try{
        const { title, description, price,user} = req.body

        const userId = req.user.id

        const errors =validationResult(req)
        if(!errors.isEmpty()){
            const FieldErrors ={};
            errors.array().forEach(err=>{
                const key = err.path;
                FieldErrors[key]=err.msg;
            })
            return res.status(400).json({
                message:"feild messing",
                msg:FieldErrors
            })
        }

        // if (!req.file) 
        // {
        //     return res.status(400).json({ message: "Image is required" });
        // }  is used for single image uploade
        if(!req.files ||req.files.length===0){
            return res.status(400).json({message:"At least one image is required"})
        }
        const imagePaths = req.files.map(file => file.path)//make this line for multiple img and call this on new product
        
        const newProduct =await Product.create({
            title,
            description,
            price,
            user:userId,
            image:imagePaths
        })


        res.status(201).json({
            message: "New product added",
            data : newProduct
        })
    }
    catch(err){
        console.error(err, "catch")
    }
}

// ---------------EditPrductById------------------
export const UpdateProduct =async (req,res)=>{
    try{
        const{id}=req.query;
        const userId=  req.user.id
        const data =await Product.find({user:userId,_id:id,isDeleted:false})
        const data1 =data.find(p=>p.id===id)
        if(!data1){
            console.log("cant access")
            return res.json({message:"can't update the product",id,data:data1})
        }

        const {title,description,price}=req.body
        const UpdatedProduct =await Product.findByIdAndUpdate(id,{title,description,price},{
            new:true
        })
        if(!UpdatedProduct){
            return res.status(404).json({message:"product not found"})

        }
        res.status(200).json({message:"Product Updated",
            data:UpdatedProduct
        })
    }
    catch(err){
        console.error(err,"catch")
        res.status(500).json({message:"server Error",Error:err.message})
    }
}


// --------------DeleteProductById-------------
export const DeletProduct =async(req,res)=>{
    try{
        const {id}=req.query;
        const userId =req.user.id
        const data = await Product.findOne({user:userId,_id:id,isDeleted:false})
        if(!data){
            return res.status(404).json({message:"cant delet product",id})
        }

        // const dltProduct=await Product.findByIdAndDelete(id); 
        // this will delet from db so the admin cant see to avoid that we make the is delet as false
        const dltProduct =await Product.findByIdAndUpdate(id,{isDeleted:true})

        if(!dltProduct){
            return res.status(404).json({message:"page Not Found"})
        }
        res.status(201).json({message:"Product Deletd",
            data:dltProduct
        })

    }
    catch(err){
        console.error(err,"error in deleting product")
        res.status(500).json({message:"Server Error",error:err.message})
    }
}


