import mongoose from "mongoose"

const productScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    }
}, {
    timestamps : true
})

const Product = mongoose.model("product", productScheme)

export default Product