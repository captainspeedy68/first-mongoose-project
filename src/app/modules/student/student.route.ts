import { StudentControllers } from './student.controller';
import express from "express";
const router = express.Router();

router.post("/create-student", StudentControllers.createStudent);
router.get('/get-student', StudentControllers.getAllStudents);
router.get('/get-student/:id', StudentControllers.getStudentById);
router.delete('/:id', StudentControllers.deleteStudent);

export const StudentRoutes = router;