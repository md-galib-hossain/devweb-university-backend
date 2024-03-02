import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import { studentValidations } from "./student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


const getAllStudents = async (req : Request, res : Response,next : NextFunction) => {

try{
const result = await StudentServices.getAllStudentsFromDb()

sendResponse(res,{
  success : true,
  statusCode : httpStatus.OK,
  message : 'Student retrieved successfully',
  data : result
})
}catch(e:any){
  next(e)
 
}

}
const getSingleStudent = async (req : Request, res : Response, next : NextFunction) => {
  try{

    const {studentId} = req.params

    const result = await StudentServices.getSingleStudent(studentId)
    sendResponse(res,{
      success : true,
      statusCode : httpStatus.OK,
      message : 'Single student retrieved',
      data : result
    })
  }catch(e:any){
   next(e)
  }

}
const deleteStudent = async (req : Request, res : Response,next : NextFunction) => {
  try{

    const {studentId} = req.params

    const result = await StudentServices.deleteStudentFromDb(studentId)
 
    sendResponse(res,{
      success : true,
      statusCode : httpStatus.OK,
      message : 'Student Deleted',
      data : result
    })
  }catch(e:any){
    next(e)

  }

}
const updateStudent = async(req : Request,res : Response,next : NextFunction)=>{
  try{

    const student = req.body
    const result = await StudentServices.updateStudentIntoDb(student)
 
    sendResponse(res,{
      success : true,
      statusCode : httpStatus.OK,
      message : 'Student updated successfully',
      data : result
    })
  }catch(e){
    next(e)


  }

}


export const StudentControllers = {
  getAllStudents,getSingleStudent,deleteStudent,updateStudent
};
