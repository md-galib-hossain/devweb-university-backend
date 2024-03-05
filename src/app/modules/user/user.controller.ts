import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import { UserValidation } from "./user.validation";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";

const createStudent : RequestHandler = async (req, res ,next ) => {
    //data validation schema with zod
    
    const {password,student : studentData} = req.body
    
    try {
     
        const result = await UserServices.createStudentIntoDb(password,studentData);
    
        //send response
        sendResponse(res,{
          success : true,
          statusCode : httpStatus.OK,
          message : 'Student created successfully',
          data : result
        })
      } catch (e:any) {
        next(e)
      }
    };

    export const UserControllers = {createStudent}