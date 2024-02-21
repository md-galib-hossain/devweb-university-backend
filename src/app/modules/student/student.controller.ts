import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  const {student : studentData} = req.body

  try {
    //send student to service function
    const result = await StudentServices.createStudentIntoDb(studentData);

    //send response
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (e) {
    console.log(e);
  }
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
