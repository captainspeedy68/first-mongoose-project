import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async(req: Request, res: Response) => {
    // const {student} = req.body;
    // console.log(student)
    try{
        const {student} = req.body;

    //call service function to send data
    const result = await StudentServices.createStudentIntoDb(student);
    res.status(200).json({
        success: true,
        message: "student created successfully",
        data: result
    })
    }catch(err){
        console.log(err);
        res.status(200).json({
            success: false,
            message: "failed",
            
        })
    }
}

const getAllStudents = async(req: Request, res: Response) => {
    try{
        const result = await StudentServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: "student fetched successfully",
            data: result
        })
    }catch(error){
        console.log(error);
        res.status(200).json({
            success: false,
            message: "failed to get",
            
        })
    }
}
const getStudentById = async(req: Request, res: Response) => {
    try{
        const studentId = req.params.id;
        const result = await StudentServices.getStudentById(studentId);
        res.status(200).json({
            success: true,
            message: "student fetched successfully",
            data: result
        })
    }catch(error){
        console.log(error);
        res.status(200).json({
            success: false,
            message: "failed to get",
            
        })
    }
}



export const StudentControllers = {
    createStudent,
    getAllStudents,
    getStudentById
}