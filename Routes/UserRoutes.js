import express from"express"
import { AddUser, AllUserdata, DeletUser, UpdateUser } from "../controller/UserControler.js";


const router =express.Router();


router.get("/",AllUserdata)
router.post("/Adduser",AddUser)
router.delete("/delete/:id",DeletUser)
router.put("/updata/:id",UpdateUser)

export default router