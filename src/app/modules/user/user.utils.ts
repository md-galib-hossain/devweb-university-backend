import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

  //year semesterCode 4 digit number
 export const generateStudentId = (payload :TAcademicSemester)=>{
    const currentId = (0).toString()
    //2030010001
    let incremenentId = (Number(currentId) + 1).toString().padStart(4,'0')
    incremenentId = `${payload.year}${payload.code}${incremenentId}`
    return incremenentId
  }