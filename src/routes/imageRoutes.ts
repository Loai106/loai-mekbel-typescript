import  express  from "express";
import multer ,{Multer}from 'multer';
import path from "path";


import { ResizeImage , CropImage, UploadImage, BlurImage, GreyscaleImage, WatermarkImage, DownloadImage } from "../controllers/imageController";

const router = express.Router();




const sotrage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

const upload = multer({storage:sotrage}); 




router.post('/upload',upload.single('image'),UploadImage)
router.post('/resize/:imageName',ResizeImage);
router.post('/crop/:imageName',CropImage);
router.post('/blur/:imageName',BlurImage);
router.post('/greyscale/:imageName',GreyscaleImage);
router.post('/watermark/:imageName',WatermarkImage);
router.get('/download/:imageName',DownloadImage)


export {router as ImageRouter};