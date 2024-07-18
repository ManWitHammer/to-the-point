import 'dotenv/config'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-errors.js'
import tasksService from '../services/tasks-service.js'

class TasksController {
	async postTask(req, res, next) {
		try {
			const { task } = req.body
			const { refreshToken } = req.cookies
            const taskData = await tasksService.postTask(task, refreshToken)
            return res.json(taskData)
		} catch (err) {
			next(err)
		}
	}

	async deleteTask(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const { taskId } = req.params
            const deletesTask = await tasksService.deleteTask(refreshToken, taskId)
			return res.json(deletesTask)
		} catch (err) {
			next(err)
		}
	}

	async patchTask(req, res, next) {
		try {
			const { taskId } = req.params
			const { refreshToken } = req.cookies
			const { newTask } = req.body
            const taskData = await tasksService.patchTask(taskId, refreshToken, newTask)
            return res.json(taskData)
		} catch (err) {
			next(err)
		}
	}

	async patchDescription(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const { taskId } = req.params
			const { newDescription } = req.body
            const taskData = await tasksService.patchDescription(refreshToken, newDescription, taskId)
            return res.json(taskData)
		} catch (err) {
			next(err)
		}
	}

    async getTasks(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await tasksService.getTasks(refreshToken)
			return res.json(userData)
		} catch (err) {
			next(err)
		}
	}
}

export default new TasksController()
