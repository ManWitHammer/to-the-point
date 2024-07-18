import { create } from 'zustand'
import axios, { AxiosError } from 'axios'
import { PREFIX } from '../src/config/api.config'

export const useTasksStore = create(set => ({
	tasks: [],
	choosedTask: {},

	addTaskToStore: async (task) => {
		try {
			const { data } = await axios.post(`${PREFIX}/api/addTask`, {
				task
			}, {
				withCredentials: true
			})
			if (data.userTask) {
				set(state => ({
					tasks: [...state.tasks, {
						title: data.userTask.title,
						description: data.userTask.description,
						time: data.userTask.time,
						_id: data.userTask.id
					}]
				}))
				return "Сигма, харош"
			}
			else {
				throw new Error('Ошибка добавления задачи')
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			} else if (err.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка соединения');
            }
		}
	},
	deleteTaskFromStore: async (task) => {
		try {
			const { data } = await axios.delete(`${PREFIX}/api/deleteTask/${task._id}`, {
				withCredentials: true
			})
			if (data.userTask) {
				set(state => ({
					tasks: state.tasks.filter(t => t !== task)
				}))
				return "Сигма, харош"
			}
			else {
				throw new Error('Ошибка добавления задачи')
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			} else if (err.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка соединения');
            }
		}
	},

    changeTaskFromStore: async (oldTask, newTask, taskId) => {
		try {
			const { data } = await axios.patch(`${PREFIX}/api/patchTask/${taskId}`, {
				newTask
			}, {withCredentials: true})
			if (data.userTask) {
				set(state => ({
					tasks: state.tasks.map(t => (t.title === oldTask && t._id == taskId ? {...t, title: newTask} : t))
				}))
				return "Сигма, харош"
			}
			else {
				throw new Error('Ошибка добавления задачи')
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			} else if (err.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка соединения');
            }
		}
	},
	setChoosedTask: (task) => {
		set({
			choosedTask: task
		})
	},
	changeDescriptionOfTask: async(newDescription, taskId) => {
		try {
			await axios.patch(`${PREFIX}/api/patchDescription/${taskId}`, {
				newDescription
			}, {withCredentials: true})
			if (data.userTask) {
				set(state => ({
					tasks: state.tasks.map(t => (t._id === taskId ? {...t, description: newDescription} : t))
				}))
				return "Сигма, харош"
			}
			else {
				throw new Error('Ошибка добавления задачи')
			}
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			} else if (err.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка соединения');
            }
		}
	},
	getTasks: async () => {
		try {
			const { data } = await axios.get(`${PREFIX}/api/getTasks`, {
				withCredentials: true
			}) 
			set({
				tasks: data.tasks
			})
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			} else if (err.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка соединения');
            }
		}
	}
}))