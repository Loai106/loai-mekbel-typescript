import {Request,Response ,NextFunction } from "express";
import ValidationError from "../errors/ValidationError";

export const errorHandler = (error:Error, req:Request,res:Response , next : NextFunction)=>{


    if(error instanceof ValidationError){
         res.status(error.errorCode).send({errors:error.serializeErrors()})
    }

     res.status(500).send({errors:[{message:error.message,errorCode:500}]})


}

