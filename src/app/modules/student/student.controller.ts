import { RequestHandler, Request, Response, NextFunction } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import { studentValidations } from "./student.validation";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";



const getAllStudents = catchAsync(async (req, res, next) => {
  console.log(req.query)
  const result = await StudentServices.getAllStudentsFromDb(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Students retrieved successfully",
    data: result,
  });
});
const getSingleStudent= catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudent(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single student retrieved",
    data: result,
  });
});
const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDb(studentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Student Deleted",
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res, next) => {
  const {student} = req.body
 
  const {studentId} = req.params;
  const result = await StudentServices.updateStudentIntoDb(student,studentId);

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
