import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const Connect = mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Mongodb connected succesfully!'))
.catch((err) => console.log(err, 'connection error'))


// console.log(process.env.MONGO_URL, 'process.env.MONGO_URL')

export default Connect