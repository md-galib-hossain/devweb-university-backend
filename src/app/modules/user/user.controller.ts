import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { UserValidation } from "./user.validation";

const createStudent = async (req: Request, res: Response) => {
    //data validation schema with zod
    
    const {password,student : studentData} = req.body
    
    try {
     
        const result = await UserServices.createStudentIntoDb(password,studentData);
    
        //send response
        res.status(200).json({
          success: true,
          message: "Student created successfully",
          data: result,
        });
      } catch (e:any) {
        res.status(500).json({
          success : false,
          message : e.message || "Something went wrong",
          error : e
        })  }
    };

    export const UserControllers = {createStudent}