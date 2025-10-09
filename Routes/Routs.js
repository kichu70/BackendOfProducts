import express from 'express'
import {  allproduct, AddProduct, EditProduct, DeletProduct } from "../controller/controller.js";

const router = express.Router();

// ---------------product-------------

router.get("/",allproduct)
router.post("/addProduct",AddProduct)
router.put("/updateProduct/:id",EditProduct)
router.delete("/delete/:id",DeletProduct)



export default router