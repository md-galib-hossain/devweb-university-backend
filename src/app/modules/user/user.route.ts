import express from 'express'
import { UserControllers } from './user.controller'
const router = express.Router()

//* flow of request
//* client -> route -> controller -> service -> model

router.post('/create-student',UserControllers.createStudent)



export const UserRoutes = router