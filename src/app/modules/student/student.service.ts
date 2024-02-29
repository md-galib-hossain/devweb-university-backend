import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const updateStudentIntoDb = async(payload : Partial<TStudent>)=>{
    if(!await Student.isUserExists(payload.id!)){
        throw new Error(`Student ${payload.id} doesn't exists`)
    }
    const result = await Student.findOneAndUpdate({
        id: payload.id
    },{
        payload
    })
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
    updateStudentIntoDb,getAllStudentsFromDb,getSingleStudent,deleteStudentFromDb
}