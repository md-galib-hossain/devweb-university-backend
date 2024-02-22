import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async(studentData : TStudent)=>{

if(await Student.isUserExists(studentData.id)){
    throw new Error(`Student ${studentData.id} already exists`)
}
const result = await Student.create(studentData)
//return result to controller
return result

}

const getAllStudentsFromDb = async()=>{
    const result = await  Student.find()
    return result
}
const getSingleStudent = async(id : string)=>{
    // const result = await Student.findOne({id})
    const result = await Student.aggregate([
        {$match : {id: id}}
    ])
    return result
}
const deleteStudentFromDb = async(id : string)=>{
    console.log(id)
    const result = await Student.updateOne({id},{isDeleted: true})
    return result
}
export const StudentServices = {
    createStudentIntoDb,getAllStudentsFromDb,getSingleStudent,deleteStudentFromDb
}