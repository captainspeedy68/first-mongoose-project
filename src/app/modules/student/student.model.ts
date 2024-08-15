import { Schema, model, connect } from 'mongoose'
import { StudentMethods, StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface'
import validator from 'validator'
import { kMaxLength } from 'buffer'

import bcript from "bcrypt"
import config from '../../config'
import { boolean } from 'joi'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    validate: (value: string) => {
      validator.isAlpha(value)
    },
    message: '{VALUE} is invalid',
  },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherConctactNo: {
    type: String,
    required: true,
  },
})
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true, kMaxLength: 20 },
  name: {
    type: userNameSchema,
    required: true,
    maxlength: 20,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
  },
  conactNumber: {
    type: String,
    required: true,
  },
  emergencyConcactNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanantAddress: {
    type: String,
    required: true,
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})


// pre save middlewire/ hook: will work on create function
studentSchema.pre("save", async function(){
  console.log(this, "this is pre middle wire")
  const user = this;
  user.password = await bcript.hash(user.password, Number(config.bcrypt_salt_rounds))
})
// post hook
studentSchema.post("save", function(doc, next){
  doc.password = "";
  next()
})

// Querry middlewire

studentSchema.pre("find", function(next){
  this.find({isDeleted: {$ne: true}})
  next();
})
studentSchema.pre("findOne", function(next){
  this.find({isDeleted: {$ne: true}})
  next();
})
studentSchema.pre("aggregate", function(next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next();
}) 

studentSchema.methods.isUserExist = async function(id: string){
  const existingUser = await Student.findOne({id: id});
  return existingUser;
}

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
