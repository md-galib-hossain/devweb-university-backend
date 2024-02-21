import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDb = async(student : TStudent)=>{


//insert student into the student model
const result = await StudentModel.create(student)

//return result to controller
return result

}

const getAllStudentsFromDb = async()=>{
    const result = await  StudentModel.find()
    return result
}
const getSingleStudent = async(id : string)=>{
    const result = await StudentModel.findOne({id})
    return result
}
export const StudentServices = {
    createStudentIntoDb,getAllStudentsFromDb,getSingleStudent
}