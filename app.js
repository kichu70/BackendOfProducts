import http from 'http'
import dotenv from 'dotenv'
import Connect from "./connect/connet.js"
import express from "express"
import router from './Routes/Routs.js'
import cors from "cors"
import userRoutes from "./Routes/UserRoutes.js"





const app = express();
const server = http.createServer(app)
app.use(express.json())
app.use(cors())
dotenv.config()

// --------mongoos connection calling from  connect.js---
Connect;


app.use("/product",router)
app.use("/user", userRoutes);

// ----------------port calling from .env---
const PORT = process.env.PORT

server.listen(PORT,()=>{
    console.log('Server listen on: ', PORT)
    console.log(`http://localhost:${PORT}`)
})







