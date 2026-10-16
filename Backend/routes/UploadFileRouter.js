import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from "streamifier"
import  dotenv from "dotenv"
import { Router } from "express";

dotenv.config()

 cloudinary.config({ 
        cloud_name: process.env.Cloud_name, 
        api_key: process.env.Cloud_APIKEY, 
        api_secret: process.env.Cloud_APISECERT
    });

const storage = multer.memoryStorage();
const upload = multer({storage})
const router = Router();
router.post("/",upload.single("image"),async(req,res)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                message : "NO File Upload"
            })
        }
        const stramupload = (fileBuffer)=>{
            return new Promise((resolve,reject)=>{
                const steam = cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                        resolve(result)
                    }else{
                        reject(error)
                    }
                })
                streamifier.createReadStream(fileBuffer).pipe(steam)
            })
        }
        const result = await stramupload(req.file.buffer)

        return res.status(200).json({
            message : "image url files",
            imageUrl : result.secure_url
        })
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message :" server error "

        })
        
    }
})
export default router;