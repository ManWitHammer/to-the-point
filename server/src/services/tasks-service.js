import { ApiError } from '../exceptions/api-errors.js'
import { TasksModel } from '../models/tasks-model.js'
import { TaskDto } from '../dto/task-dto.js'
import tokenService from './token-service.js'

class TasksService {
	async postTask(taskObj, refreshToken) {
        if (!refreshToken) throw ApiError.UnauthorizedError()

        const userData = await tokenService.validateRefreshToken(refreshToken)
        const userId = userData.Id
        
        if (taskObj.title == '' || taskObj.time == '') {
            throw new ApiError('Заполните все поля:)')
        }
		const candidate = await TasksModel.findOne({ userId })
		if (!candidate) {
            const taskData = await TasksModel.create({
                userId,
                tasks: taskObj
            })
            return { task: taskData.tasks[0] }
        }
        else {
            const taskData = await TasksModel.findOne({ userId })
            taskData.tasks.push(taskObj)
            await taskData.save()

            const filterData = taskData.tasks.find(task => task.title == taskObj.title && task.time == taskObj.time)
            const taskDto = new TaskDto(filterData)

            return { userTask: taskDto }
        }
	}

	async deleteTask(refreshToken, taskId) {
        if (!refreshToken) throw ApiError.UnauthorizedError()

        const userData = await tokenService.validateRefreshToken(refreshToken)

        const tasksData = await TasksModel.findOne({ userId: userData.id })

        if (!tasksData) throw ApiError.BadRequest('Задача не найдена')
        else {
            let foundObjectIndex = tasksData.tasks.findIndex(obj => obj.id === taskId);
            
            if (foundObjectIndex !== -1) {
                let foundObject = tasksData.tasks[foundObjectIndex];
                
                tasksData.tasks.splice(foundObjectIndex, 1);
                await tasksData.save()
                return { userTask: foundObject }
            } else {
                throw ApiError.BadRequest('Задача не найдена')
            }
            
        }
	}

	async patchTask(taskId, refreshToken, newTask) {
        if (!refreshToken) throw ApiError.UnauthorizedError()
        if (!newTask || newTask == '') throw ApiError.BadRequest('Не указано новое название')

        const userData = await tokenService.validateRefreshToken(refreshToken)
        const tasksData = await TasksModel.findOne({ userId: userData.id })
        tasksData.tasks.forEach(task => {
            if (task._id.toString() == taskId.toString()) {
                task.title = newTask
            }
        })
        await tasksData.save()
        const patchedTask = tasksData.tasks.find(task => task._id == taskId)
        return { tasks: patchedTask }
	}

    async getTasks(refreshToken) {
		if (!refreshToken) throw ApiError.UnauthorizedError()

		const taskData = await tokenService.validateRefreshToken(refreshToken)
		const task = await TasksModel.findOne({ userId: taskData.id })

		if (!taskData || !task) throw ApiError.UnauthorizedError()

		return { tasks: task.tasks }
	}

}

export default new TasksService()