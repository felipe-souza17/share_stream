import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

router.get('/getUser/:user_id', UserController.getUser)
router.post('/userLogin', UserController.userLogin)
router.post('/createUser', UserController.registerUser)

export default router