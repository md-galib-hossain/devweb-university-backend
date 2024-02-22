import express from 'express'
import { StudentControllers } from './student.controller'
const router = express.Router()

//* flow of request
//* client -> route -> controller -> service -> model

router.post('/create-student',StudentControllers.createStudent)
router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)


export const StudentRoutes = router