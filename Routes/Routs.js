import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import {  allproduct, AddProduct, DeletProduct, UpdateProduct, productsOfUser } from "../controller/controller.js";
import { check } from 'express-validator';
import { verifyToken } from '../JWT/verifyToken.js';
const router = express.Router();

// ---------------product-------------
router.use(verifyToken)
router.get("/",allproduct)
router.get("/usersProdect",productsOfUser)
router.post("/add-product",[
    check("title")
        .notEmpty().withMessage("title must contain")
        .isLength({min:3}).withMessage("length need morethan 3 character"),
    check("price")
        .notEmpty().withMessage("please give the price"),
    check("description")
        .notEmpty().withMessage("must need a description"),
   
],AddProduct)

router.put("/update-product/:id",UpdateProduct)


router.put("/delete-product/:id",DeletProduct)



export default router