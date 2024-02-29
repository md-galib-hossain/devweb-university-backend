import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

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

  //set manually generated id
  userData.id = "203010001";
  //create a user

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
