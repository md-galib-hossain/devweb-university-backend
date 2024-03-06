import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  ).sort({createdAt : -1})
  .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
};

//year semesterCode 4 digit number
export const generateStudentId =async (payload: TAcademicSemester) => {
  const currentId = await findLastStudentId() || (0).toString();
  //2030010001
  let incremenentId = (Number(currentId) + 1).toString().padStart(4, "0");
  incremenentId = `${payload.year}${payload.code}${incremenentId}`;
  return incremenentId;
};
