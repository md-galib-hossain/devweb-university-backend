import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Faculty created successfully",
    data: result,
  });
});
const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Faculties retrieved successfully",
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Faculty retrieved successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId,req.body);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Faculty updated successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = { getSingleAcademicFaculty,getAcademicFaculties,createAcademicFaculty,updateAcademicFaculty };
