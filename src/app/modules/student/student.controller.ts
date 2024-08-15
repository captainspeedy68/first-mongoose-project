import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import Joi from 'joi'
import studentSchema from './student.validation'
const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Joi

    const { student } = req.body

    const { error, value } = studentSchema.validate(student)
    console.log('error:', error)
    if (!error) {
      //call service function to send data
      const result = await StudentServices.createStudentIntoDb(value)
      res.status(200).json({
        success: true,
        message: 'student created successfully',
        data: result,
      })
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'failed',
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'student fetched successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(200).json({
      success: false,
      message: 'failed to get',
    })
  }
}

const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    const result = await StudentServices.getStudentById(studentId)
    res.status(200).json({
      success: true,
      message: 'student fetched successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(200).json({
      success: false,
      message: 'failed to get',
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    const result = await StudentServices.deleteStudentById(studentId)
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(200).json({
      success: false,
      message: 'failed to delete',
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent
}
