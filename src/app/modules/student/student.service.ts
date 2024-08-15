import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async(studentData: TStudent) => {
    // const result = await StudentModel.create(student)
    const student = new Student(studentData);
    if(await student.isUserExist(studentData.id)){
        throw new Error("User already exists")
    }

    const result = await student.save()//built in instance method
    return result;
}

const getAllStudentsFromDB = async () => {
    const result = await Student.find()
    return result;
}

const getStudentById = async(id: string) => {
    const result = await Student.findOne({id: id});
    return result;
}
const deleteStudentById = async(id: string) => {
    const result = await Student.updateOne({id: id}, {isDeleted: true});
    return result;
}

export const StudentServices = {
    createStudentIntoDb,
    getAllStudentsFromDB,
    getStudentById,
    deleteStudentById
}