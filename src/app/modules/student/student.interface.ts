import { Schema, model, connect, Model } from 'mongoose'


export type TGuardian = {
    fatherName: string,
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherConctactNo: string;
  };
export type TUserName = {
    firstName: string
    middleName: string
    lastName: string
  }
export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}
export type TStudent = {
  id: string
  name: TUserName,
  gender: 'male' | 'female'
  dateOfBirth?: string;
  email: string;
  conactNumber: string
  emergencyConcactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanantAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
}


export type StudentMethods = {
  isUserExist(id: string) : Promise<TStudent | null>;
}

export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>