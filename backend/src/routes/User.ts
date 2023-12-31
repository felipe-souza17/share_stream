import express from 'express'
import UserController from '../controllers/UserController'

const router = express.Router()

router.get('/getUser/:user_id', UserController.getUser)
router.post('/userLogin', UserController.userLogin)
router.post('/createUser', UserController.registerUser)
router.put('/editUser', UserController.editUser)
router.put('/activeProfile', UserController.activeProfile)

export default router