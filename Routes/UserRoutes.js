import express from"express"
import { AddUser, AllUserdata, DeletUser, UpdateUser } from "../controller/UserControler.js";


const router =express.Router();


router.get("/",AllUserdata)
router.post("/add-user",AddUser)
router.put("/delete-user/:id",DeletUser)
router.put("/updata-user/:id",UpdateUser)

export default router