import mongoose from "mongoose";
import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentId(admissionSemester!);
    //create new user (transaction - 1)
    const newUser = await User.create([userData], { session });
    //recived new user in an array
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create User");
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    //create new student (transaction - 2)

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Student");
    }
    //commit the session
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = { createStudentIntoDb };
