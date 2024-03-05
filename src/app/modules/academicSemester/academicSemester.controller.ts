import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
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
  }
);

export const AcademicSemesterControllers = { createAcademicSemester };
