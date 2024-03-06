import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  //create a user object
  let userData: Partial<TUser> = {};

  // if(await User.isUserExists(studentData.id)){
  //     throw new Error(`Student ${studentData.id} already exists`)
  // }

  //if password is not given then use default password
  userData.password = password || (config.DEFAULT_PASS as string);

  //set student role
  userData.role = "student";

  //create a user


  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(studentData.admissionSemester)
  userData.id = generateStudentId(admissionSemester!);
  const newUser = await User.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData)
    return newStudent
  }
};

export const UserServices = { createStudentIntoDb };
