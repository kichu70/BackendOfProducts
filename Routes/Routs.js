import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import {  allproduct, AddProduct, DeletProduct, UpdateProduct, productsOfUser } from "../controller/controller.js";
import { check } from 'express-validator';
import { verifyToken } from '../JWT/verifyToken.js';
import { upload } from "../Multer/mulerConfig.js";
const router = express.Router();

// ---------------product-------------
router.get("/",allproduct)

router.use(verifyToken)

router.get("/usersProdect",productsOfUser)
router.post("/add-product",upload.single("image"),[//the image is multer middlerware
    check("title")
        .notEmpty().withMessage("title must contain")
        .isLength({min:3}).withMessage("length need morethan 3 character"),
    check("price")
        .notEmpty().withMessage("please give the price"),
    check("description")
        .notEmpty().withMessage("must need a description"),

],AddProduct)

router.put("/update-product",UpdateProduct)


router.put("/delete-product",DeletProduct)
//i have removed the id from the url now i need to change the req.body to req.query in controller.js too



export default router