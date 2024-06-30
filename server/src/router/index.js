import { Router } from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user-controller.js'
import tasksController from '../controllers/tasks-controller.js'

const router = Router()

router.post(
	'/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 32 }),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/checkAuth', userController.checkAuth)
router.get('/getTasks', tasksController.getTasks)
router.post('/addTask', tasksController.postTask)
router.delete('/deleteTask/:taskId', tasksController.deleteTask)
router.patch('/patchTask/:taskId', tasksController.patchTask)

export default router
