import { Model } from "mongoose";

export type TGuardian = {
    
    fatherName : string;
    fatherOccupation : string;
    fatherContactNo : string;
    motherName : string;
    motherOccupation : string;
    motherContactNo? : string

}

export type TUserName = {
firstName : string;
middleName? : string;
lastName : string;
}

export type TLocalGuardian = {
name : string;
occupation : string;
contactNo : string;
address : string
}

export type TStudent = {
name : TUserName;
email : string;
id : string;
password: string
gender : "male" | "female";
dateOfBirth? : string;
contactNo : string;
emergencyContactNo: string;
bloodGroup? : "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-" ;
presentAddress : string;
permanentAddress : string;
guardian:TGuardian;
localGuardian : TLocalGuardian;
profileImg? : string;
isActive : "active" | "blocked";
isDeleted : boolean;

}

export interface TStudentModel extends Model<TStudent>{
isUserExists (id : string):Promise<TStudent | null>
}

