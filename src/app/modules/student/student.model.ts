import { Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  
  TStudentModel,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true,"First Name is required"],
    trim:true,
    maxlength: [20,"First name can not be more than length 20 characters"],
    validate : {
      validator : function(firstname:string){
        const firstnameStr = firstname.charAt(0).toUpperCase()+firstname.slice(1)
        return firstnameStr === firstname;
      },
      message : "{VALUE} is not in capitalize format"
    }
  },  

  middleName: {
    type: String,
    trim:true,
  },

  lastName: {
    type: String,
    required: [true,"Last Name is required"],
    trim:true,
    maxlength: [20,"Last name can not be more than length 20 characters"],
  },
});


const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true,"fatherName is required"] },
  fatherOccupation: { type: String, required: [true,"fatherOccupation is required"] },
  fatherContactNo: { type: String, required: [true,"fatherContactNo is required"] },
  motherName: { type: String, required: [true,"motherName is required"]},
  motherOccupation: { type: String, required: [true,"motherOccupation is required"] },
  motherContactNo: { type: String },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true,"Name is required"],
  },
  occupation: {
    type: String,
    required: [true,"occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true,"contactNo is required"],
  },
  address: {
    type: String,
    required: [true,"address is required"],
  },
});

const studentSchema = new Schema<TStudent,TStudentModel>({
  id: {
    type: String,
    required : [true,"student id is required"],
    unique: true,
  },
  name: {
    type : userNameSchema,
    required : [true,"name is required"]
  },
  gender: {
    type: String,
    enum : {
     values :  ["male", "female"],
     message : "{VALUE} is not valid.The gender field can only be 'male' or 'female"
    },
   
  },
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: [true,"email is required"],
    unique: true,

  },
  contactNo: {
    type: String,
    required: [true,"contactNo is required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true,"emergencyContactNo is required"],
  },
  bloodGroup:{
    type : String,
    enum :   {
      values : ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    message : "Only valid blood types are allowed"},

  },
  
  presentAddress: {
    type: String,
    required: [true,"presentAddress is required"],
  },
  permanentAddress: {
    type: String,
    required: [true,"permanentAddress is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true,"guardian is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true,"localGuardian is required"],

  },
  profileImg: {
    type: String,
  },
  isActive: {
    type : String,
    enum : ["active", "blocked"],
    default: "active"
  },
});


studentSchema.statics.isUserExists =async function(id:string){
const existingUser = await Student.findOne({id});
return existingUser
}




export const Student = model<TStudent,TStudentModel>('Student', studentSchema) 