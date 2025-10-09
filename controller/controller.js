import Product from "../models/product.js"




// ---------viewAllProduct--------------------
export const allproduct = async(req,res)=>{
    try{
        const data =await Product.find()
        res.json(data)
    }
    catch(err){
        console.log(err)
    }
}

// ------------AddProduct------------------------
export const AddProduct =async(req,res)=>{
    try{

        const { title, description, price } = req.body
        const newProduct =await Product.create({title,description,price})


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
export const EditProduct =async (req,res)=>{
    try{
        const{id}=req.params;
        const {title,description,price}=req.body
        const UpdatedProduct =await Product.findByIdAndUpdate(id,{title,description,price},{
            new:true,
            runValidators:true
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
    const {id}=req.params;
    try{
        const dltProduct=await Product.findByIdAndDelete(id);
    
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