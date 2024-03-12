import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.validation'
const router = express.Router()

//* flow of request
//* client -> route -> controller -> service -> model

router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)
router.patch('/:studentId',validateRequest(studentValidations.UpdateStudentValidationSchema), StudentControllers.updateStudent)


export const StudentRoutes = router