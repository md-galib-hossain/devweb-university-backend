import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester created successfully",
    data: result,
  });
});
const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemestersFromDB();

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semesters retrieved successfully",
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester retrieved successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId,req.body);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Semester updated successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = { createAcademicSemester,getAcademicSemesters,getSingleAcademicSemester,updateAcademicSemester };
