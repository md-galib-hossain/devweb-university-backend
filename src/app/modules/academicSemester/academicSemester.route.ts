import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemeterValidation } from './academicSemester.validation'
const router = express.Router()

//* flow of request
//* client -> route -> controller -> service -> model

router.post('/create-academic-semester',validateRequest(AcademicSemeterValidation.createAcademicSemesterValidationSchema),AcademicSemesterControllers.createAcademicSemester)
router.get('/', AcademicSemesterControllers.getAcademicSemesters);
router.get('/:semesterId',AcademicSemesterControllers.getSingleAcademicSemester)
router.patch('/:semesterId',validateRequest(AcademicSemeterValidation.updateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateAcademicSemester)

// router.get('/', StudentControllers.getAllStudents)
// router.get('/:studentId', StudentControllers.getSingleStudent)
// router.delete('/:studentId', StudentControllers.deleteStudent)
// router.patch('/:studentId', StudentControllers.updateStudent)


export const AcademicSemesterRoutes = router