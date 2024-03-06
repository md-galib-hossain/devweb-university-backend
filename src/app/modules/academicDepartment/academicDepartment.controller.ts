import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body
  );

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department created successfully",
    data: result,
  });
});
const getAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAcademicDepartmentsFromDB();

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Departments retrieved successfully",
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department retrieved successfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId,req.body);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Academic Department updated successfully",
    data: result,
  });
});

export const AcademicDepartmentControllers = { getSingleAcademicDepartment,getAcademicDepartments,createAcademicDepartment,updateAcademicDepartment };
