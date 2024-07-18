import { Router } from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user-controller.js'
import tasksController from '../controllers/tasks-controller.js'
import { upload } from '../middlewares/multer-middleware.js'

const router = Router()

router.post(
	'/registration',
	body('name').isLength({ min: 2, max: 20 }),
	body('surname').isLength({ min: 2, max: 20 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6, max: 20 }).custom((value) => {
		if (!/\d/.test(value) || !/[a-zA-Zа-яА-Я]/.test(value)) {
		  throw new Error('Пароль должен содержать буквы(английские или русские), и цифры')
		}
		return true
	  }),
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/checkAuth', userController.checkAuth)
router.post(
	'/setAvatar', 
	upload.single('avatar'),
	userController.setAvatar
)
router.get('/getTasks', tasksController.getTasks)
router.post('/addTask', tasksController.postTask)
router.delete('/deleteTask/:taskId', tasksController.deleteTask)
router.patch('/patchTask/:taskId', tasksController.patchTask)
router.patch('/patchDescription/:taskId', tasksController.patchDescription)

export default router
