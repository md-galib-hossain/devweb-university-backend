import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import { studentValidations } from "./student.validation";


const getAllStudents = async (req : Request, res : Response,next : NextFunction) => {

try{
const result = await StudentServices.getAllStudentsFromDb()
res.status(200).json({
  success : true,
  message : 'Students retrieved successfully',
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
    res.status(200).json({
      success : true,
      message : "single student retrieved",
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
    res.status(200).json({
      success : true,
      message : " Student Deleted",
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
    res.status(200).json({
      success : true,
      message : "Student updated successfully",
      data : result
    })
  }catch(e){
    next(e)


  }

}


export const StudentControllers = {
  getAllStudents,getSingleStudent,deleteStudent,updateStudent
};
