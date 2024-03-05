import { Schema, model } from "mongoose";
import {
  TAcademicSemester,

  
  
} from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.Constant";



const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum : AcademicSemesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemester = model<TAcademicSemester>(
  "AcamedicSemester",
  academicSemesterSchema
);
