import express from 'express'
import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { studentValidations } from './student.validation'
const router = express.Router()

//* flow of request
//* client -> route -> controller -> service -> model

router.get('/', StudentControllers.getAllStudents)
router.get('/:id', StudentControllers.getSingleStudent)
router.delete('/:id', StudentControllers.deleteStudent)
router.patch('/:id',validateRequest(studentValidations.UpdateStudentValidationSchema), StudentControllers.updateStudent)


export const StudentRoutes = router