import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";

const updateStudentIntoDb = async (payload: Partial<TStudent>) => {
  if (!(await Student.isUserExists(payload.id!))) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Student ${payload.id} doesn't exists`
    );
  }
  const result = await Student.findOneAndUpdate(
    {
      id: payload.id,
    },
    {
      payload,
    }
  );
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const getSingleStudent = async (id: string) => {
  // const result = await Student.findOne({id})
  const result = await Student.findById(id)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  console.log(id);
  if (!(await Student.isUserExists(id))) {
    throw new AppError(httpStatus.BAD_REQUEST, "This student does not exist");
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete Student");
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to Delete User");
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  updateStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudent,
  deleteStudentFromDb,
};
