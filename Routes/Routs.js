import express from 'express'
import {  allproduct, AddProduct, DeletProduct, UpdateProduct } from "../controller/controller.js";
import { check } from 'express-validator';

const router = express.Router();

// ---------------product-------------

router.get("/",allproduct)
router.post("/add-product",[
    check("title")
        .notEmpty().withMessage("title must contain")
        .isLength({min:3}).withMessage("length need morethan 3 character"),
    check("price")
        .notEmpty().withMessage("please give the price"),
    check("description")
        .notEmpty().withMessage("must need a description"),
    check("user")
        .notEmpty().withMessage("user id required")

],AddProduct)

router.put("/update-product/:id",UpdateProduct)
// router.put("/update-product/:id",[
//         check("title")
//         .notEmpty().withMessage("title must contain")
//         .isLength({min:3}).withMessage("length need morethan 3 character"),
//     check("price")
//         .notEmpty().withMessage("please give the price"),
//     check("description")
//         .notEmpty().withMessage("must need a description")
// ],UpdateProduct)



router.put("/delete-product/:id",DeletProduct)



export default router