import { Router } from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user-controller.js'
import tasksController from '../controllers/tasks-controller.js'
import { upload } from '../middlewares/multer-middleware.js'

const router = Router()

router.post(
	'/registration',
	body('name').isLength({ min: 3, max: 20 }).isAlpha().withMessage('Размер всё таки влияет, ну или ты на русском написал'),
	body('surname').isLength({ min: 3, max: 20 }).isAlpha().withMessage('Размер всё таки влияет, ну или ты на русском написал'),
	body('email').isEmail().withMessage('Бро, ты уверен, что правильно ввел email?'),
	body('password').isLength({ min: 6, max: 32 }).custom((value) => {
		if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
		  throw new Error('Пароль должен содержать и английские буквы, и цифры')
		}
		return true
	  }).withMessage('Пароль должен содержать и английские буквы, и цифры'),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/checkAuth', userController.checkAuth)
router.get('/getTasks', tasksController.getTasks)
router.post('/addTask', tasksController.postTask)
router.post(
	'/setAvatar', 
	upload.single('avatar'),
	userController.setAvatar
)
router.delete('/deleteTask/:taskId', tasksController.deleteTask)
router.patch('/patchTask/:taskId', tasksController.patchTask)

export default router
