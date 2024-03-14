import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import mongoose from "mongoose";
import { User } from "../user/user.model";

const updateStudentIntoDb = async (payload: Partial<TStudent>, id: string) => {
  if (!(await Student.isUserExists(id!))) {
    throw new AppError(httpStatus.NOT_FOUND, `Student ${id} doesn't exists`);
  }
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  //for name field
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  //for guardian field
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  //for name field
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    {
      id,
    },

    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; //copying queries
  const studentSearchableFields = ["email", "name.lastName", "presentAddress"];
  let searchTerm = "";
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });
  //Filtering
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  //raw searching query
  const filterQuery = searchQuery
    .find(queryObj)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  let sort = "-createdAt";
  if (query?.sort) {
    sort = query?.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query?.limit);
  }
  if (query.page) {
    page = Number(query?.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);
  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";
  if (query.fields) {
    fields = (query?.fields as string).split(",").join(" ");
    console.log(fields);
  }
  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
};
const getSingleStudent = async (id: string) => {
  // const result = await Student.findOne({id})
  const result = await Student.findOne({ id })
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
    //deleting student
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
    //deleting the student's user account
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
  } catch (e: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(e);
  }
};

export const StudentServices = {
  updateStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudent,
  deleteStudentFromDb,
};
