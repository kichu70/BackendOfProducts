import multer, { diskStorage } from "multer";
import path from "path";



const storage =multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/"),//if there is no error then the file will store to uplodas folder (error,save)
    filename:(req,file,cb)=>{
        const ext =path.extname(file.originalname);//ext means extation we make it shoter 
        cb(null,Date.now()+ext)// give a unique name 
    }
})


//now need to filter the file only if image 

const fileFilter=(req,file,cb)=>{  // the file is uploded file details cb check (error,save)
    if(file.mimetype.startsWith('image/'))cb(null,true)
    else cb(new Error("Only images is allowed"),false);
}

export const  upload= multer({
    storage,
    limits:{fileSize:5*1024*1024},
    fileFilter
})