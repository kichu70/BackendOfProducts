import express from"express"
import { AddUser, AllUserdata, DeletUser, UpdateUser } from "../controller/UserControler.js";
import { body } from "express-validator";


const router =express.Router();



router.get("/",AllUserdata)
router.post("/add-user",[
    body("username")
        .notEmpty().withMessage("username must Required")
        .isLength({min:3}).withMessage("name must contain at least 3 charecters"),
    body("password")
        .notEmpty().withMessage("Password is Reqierd")
        .isLength({min:8}).withMessage("must contain atleast 8 charecter"),
    body("email")
        .notEmpty().withMessage("Email required")
        .isEmail().withMessage("Invalid email format"),
],AddUser)
router.put("/delete-user/:id",DeletUser)
router.put("/updata-user/:id",UpdateUser)

export default router