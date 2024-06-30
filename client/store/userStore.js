import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import { PREFIX } from '../src/config/api.config'

export const useUserStore = create(set => ({
	userName: '',
	userSurname: '',
	userColor: '',
	userEmail: '',
	userId: '',
	userIsActivated: false,

	login: async (email, password, ip, date) => {
		try {
			console.log(`${PREFIX}/api/login`)
			const { data } = await axios.post(`${PREFIX}/api/login`, {
				email,
				password,
				ip,
				date: date.toLocaleString()
			}, { withCredentials: true })
			set({
				userEmail: data.user.email,
				userId: data.user.id,
				userIsActivated: data.user.isActivated,
				userName: data.user.name,
				userSurname: data.user.surname,
				userColor: data.user.avatarColor
			})
			return data.accessToken
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

	registration: async (email, password, name, surname) => {
		try {
			const { data } = await axios.post(`${PREFIX}/api/registration`, {
				email,
				password,
				name,
				surname
			}, { withCredentials: true })
            set({
				userEmail: data.user.email,
				userId: data.user.id,
				userIsActivated: data.user.isActivated,
				userName: data.user.name,
				userSurname: data.user.surname,
				userColor: data.user.avatarColor
			})
			return data.accessToken
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

	checkAuth: async () => {
		try {
			const { data } = await axios.get(`${PREFIX}/api/checkAuth`, {
				withCredentials: true
			})

			set({
				userEmail: data.user.email,
				userId: data.user.id,
				userIsActivated: data.user.isActivated,
				userName: data.user.name,
				userSurname: data.user.surname,
				userColor: data.user.avatarColor
			})

			return true
		} catch (err) {
			set({
				userName: '',
				userSurname: '',
				userEmail: '',
				userId: '',
				userColor: '',
				userIsActivated: false
			})

			return false
		}
	}
}))