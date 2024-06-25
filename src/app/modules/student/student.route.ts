import { StudentControllers } from './student.controller';
import express from "express";
const router = express.Router()

router.post("/create-student", StudentControllers.createStudent);
router.get('/get-student', StudentControllers.getAllStudents)
router.get('/get-student/:id', StudentControllers.getStudentById)

export const StudentRoutes = router;