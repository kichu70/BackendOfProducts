import express from "express";
import {
  AddUser,
  AllUserdata,
  DeletUser,
  Login,
  UpdateUser,
} from "../controller/UserControler.js";
import { check } from "express-validator";
import { verifyToken } from "../JWT/verifyToken.js";
import dotenv from 'dotenv'

dotenv.config()


const router = express.Router();
router.post(
  "/login",
  [
    check("username")
      .notEmpty()
      .withMessage("username must Required")
      .isLength({ min: 3 })
      .withMessage("name must contain at least 3 charecters"),
    check("password")
      .notEmpty()
      .withMessage("Password is Reqierd")
      .isLength({ min: 8 })
      .withMessage("must contain atleast 8 charecter"),
  ],
  Login
);


router.post(
  "/add-user",
  [
    check("username")
    .notEmpty()
    .withMessage("username must Required")
    .isLength({ min: 3 })
    .withMessage("name must contain at least 3 charecters"),
    check("password")
    .notEmpty()
    .withMessage("Password is Reqierd")
    .isLength({ min: 8 })
    .withMessage("must contain atleast 8 charecter"),
    check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email format"),
  ],
  AddUser
);
router.get("/", AllUserdata);
router.use(verifyToken);
router.put("/delete-user/:id", DeletUser);
router.put("/update-user/:id", UpdateUser);

export default router;
