import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { AnyZodObject } from "zod";
import { studentValidations } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

//* flow of request
//* client -> route -> controller -> service -> model


router.post(
  "/create-student",
  validateRequest(studentValidations.CreateStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
