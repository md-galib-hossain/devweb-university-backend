import { RequestHandler, Request, Response, NextFunction } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import { studentValidations } from "./student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDb();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Students retrieved successfully",
    data: result,
  });
});
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudent(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single student retrieved",
    data: result,
  });
});
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDb(studentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student Deleted",
    data: result,
  });
});
const updateStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const student = req.body;
  const result = await StudentServices.updateStudentIntoDb(student);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student updated successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
