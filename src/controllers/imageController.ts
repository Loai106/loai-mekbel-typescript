
import express ,{ Express , NextFunction, Request ,response,Response} from "express";
import multer ,{Multer}from 'multer';
import path, { resolve } from "path";
import sharp from "sharp";
import bodyParser from "body-parser";
import { error } from "console";
import { readFile } from "fs";
import ValidationError from "../errors/ValidationError";


//handle upload image
export const UploadImage = (req:Request,res:Response)=>{

    res.send('image uploaded successfully');


}
//handle resizing the image
export const ResizeImage = async (req:Request,res:Response,next : NextFunction)=>{
    try{
        const imageName = req.params.imageName;
        const height : number = parseInt(req.body.height);
        const width: number = parseInt(req.body.width);

        console.log(`imageName:${imageName}
         height:${height}
         width":${width}`)

         if(!height){
            throw new ValidationError("Height is missing","height");
         }

         if(!width){
            throw new ValidationError("width is missing","width");
         }

        await sharp(`images/${imageName}`).resize(height,width,{fit: "contain" }).toFile(`images/new-${imageName}`);
        const imagePath = path.join(__dirname,"../../images",`new-${imageName}`);
        console.log('image Paht:',imagePath)
        res.sendFile(imagePath,(err)=>{
            if (err) {
               throw new Error('Error sending the image');
              }
        });
    }
    catch(error){
        return next(error);
    }

}

//Crop image
export const CropImage = async (req:Request,res:Response,next: NextFunction)=>{


    try{
        
        const imageName:string = req.params.imageName;
        const {x,y,width,height}:{x:number ,y:number , width:number ,height:number} = {
            x: parseInt(req.body.x, 10),
            y: parseInt(req.body.y, 10),
            width: parseInt(req.body.width, 10),
            height: parseInt(req.body.height, 10),
        }; 
        if(!x){
            throw new ValidationError("x is missing","x");
         }
         if(!y){
            throw new ValidationError("y is missing","y");
         }
         if(!height){
            throw new ValidationError("Height is missing","height");
         }
         if(!width){
            throw new ValidationError("width is missing","width");
         }


        const imageNamePath :string = path.join(__dirname,'../../images',imageName);
        const croppedImagePath : string = path.join(__dirname,'../../images',`new-cropped-${imageName}`);

        await sharp(imageNamePath).extract({left:x,top:y,width:width,height:height}).toFile(croppedImagePath);

        //send it as res
        res.sendFile(croppedImagePath,(error)=>{
            if(error){
                throw new Error('Error sending the image');
            }
        })

    }
    catch(err){
        return next(err)
    }
}


//blur image
export const BlurImage = async(req:Request,res:Response,next: NextFunction)=>{

    try{
        const imageName: string = req.params.imageName;
        const imagePath : string = path.join(__dirname,'../../images',imageName);
        const bluredImagePath : string = path.join(__dirname,'../../images',`new-blured-${imageName}`);
        const sigma:number = parseFloat(req.body.sigma);
        console.log('sigma:',sigma)
        if(sigma>1000 || sigma<0.3){
            //error
            throw new ValidationError('sigam must be between 0.3 and 1000','sigma');
        }
        await sharp(imagePath).blur(sigma).toFile(bluredImagePath);
        console.log('image blured')

        res.sendFile(bluredImagePath,(error)=>{
            if(error){
                throw new Error('Error sending the image');

            }
        })


    }
    catch(error){
        return next(error);
    }


}

//greyscale filter
export const GreyscaleImage =async(req:Request, res: Response , next: NextFunction)=>{

    try{
     const imageName: string = req.params.imageName;
     const imagePath : string = path.join(__dirname,'../../images',imageName);
     const grayImagePath:string = path.join(__dirname,'../../images',`new-grey-${imageName}`);
     await sharp(imagePath).grayscale().toFile(grayImagePath);
     res.sendFile(grayImagePath,(error)=>{
         if(error){
        
            throw new Error('Error sending the image');

         }
     })
 
    }catch(error){
        return next(error);
    }
 
 }

 //image watermark
 export const WatermarkImage = async (req:Request,res:Response, next: NextFunction)=>{

    try{
        const watermarkImagePath : string= path.join(__dirname,'../../images',"watermark.png");
        const imageName : string = req.params.imageName;
        const imagePath : string = path.join(__dirname,'../../images',imageName);
        const waterMarkedImagePath = path.join(__dirname,'../../images',`watermark-${imageName}`);

        await sharp(imagePath).composite([{
            input:watermarkImagePath,
            blend:'over',
            left:50,
            top:50,
          
        }]).toFile(waterMarkedImagePath);

        res.sendFile(waterMarkedImagePath,(error)=>{
            if(error){
                throw new Error('Error sending the image');

            }
        })

    }
    catch(error){
        return next(error);

    }


}

//download image
export const DownloadImage = async(req:Request,res:Response, next: NextFunction)=>{

    try{
 
        const imageName : string = req.params.imageName;
        const imagePath : string = path.join(__dirname,'../../images/',imageName);
    
        res.download(imagePath,(error)=>{
            if(error){
                throw new Error('Error sending the image');

            }

            console.log('image downloaded...');
        })
    }catch(error){
        return next(error);
    }
   

}