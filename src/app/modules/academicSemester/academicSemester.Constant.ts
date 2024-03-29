import { TAcademicSemesterCode, TAcademicSemesterName, TMonth, TacademicSemesterNameCodeMapper } from "./academicSemester.interface";

export const Months: TMonth[] = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  
export const AcademicSemesterName: TAcademicSemesterName[] = [
    "Autumn",
    "Summer",
    "Fall",
  ];
export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];
export const academicSemesterNameCodeMapper : TacademicSemesterNameCodeMapper={
  Autumn : '01',
  Summer : '02',
  Fall : '03'
}