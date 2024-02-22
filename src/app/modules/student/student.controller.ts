import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import { studentValidations } from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
//data validation schema with zod

const {student : studentData} = req.body

try {
    const zodParsedData = studentValidations.CreateStudentValidationSchema.parse(studentData)
    const result = await StudentServices.createStudentIntoDb(zodParsedData);

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
const getAllStudents = async (req : Request, res : Response) => {

try{
const result = await StudentServices.getAllStudentsFromDb()
res.status(200).json({
  success : true,
  message : 'Students retrieved successfully',
  data : result
})
}catch(e){
console.log(e)
}

}
const getSingleStudent = async (req : Request, res : Response) => {
  try{

    const {studentId} = req.params

    const result = await StudentServices.getSingleStudent(studentId)
    res.status(200).json({
      success : true,
      message : "single student retrieved",
      data : result
    })
  }catch(e){
   console.log(e)
  }

}


export const StudentControllers = {
  createStudent,getAllStudents,getSingleStudent
};
