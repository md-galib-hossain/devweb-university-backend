import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.Constant";
import {
  TAcademicSemester,
  TacademicSemesterNameCodeMapper,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND,"Academic semester name & code mismatched");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result
};

const updateAcademicSemesterIntoDB = async (id:string,payload :Partial<TAcademicSemester>)=>{
if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new AppError(httpStatus.NOT_FOUND,'Academic Semester name & code mismatch')
}
const result = await AcademicSemester.findOneAndUpdate({_id : id},payload,{
    new : true
})
return result


}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemestersFromDB,getSingleAcademicSemesterFromDB,updateAcademicSemesterIntoDB
};
