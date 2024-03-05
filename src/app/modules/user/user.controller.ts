import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import { UserValidation } from "./user.validation";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent : RequestHandler = catchAsync(async (req, res ,next ) => {
  //data validation schema with zod
  
  const {password,student : studentData} = req.body
  
  
   
      const result = await UserServices.createStudentIntoDb(password,studentData);
  
      //send response
      sendResponse(res,{
        success : true,
        statusCode : httpStatus.OK,
        message : 'Student created successfully',
        data : result
      })
    
  })

    export const UserControllers = {createStudent}