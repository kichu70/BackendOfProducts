import express from 'express'
import {  allproduct, AddProduct, EditProduct, DeletProduct } from "../controller/controller.js";

const router = express.Router();

// ---------------product-------------

router.get("/",allproduct)
router.post("/add-product",AddProduct)
router.put("/update-product/:id",EditProduct)
router.put("/delete-product/:id",DeletProduct)



export default router