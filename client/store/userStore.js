import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import { PREFIX } from '../src/config/api.config'
import avatarNotFined from '../src/assets/avatar-not-fined.png'

export const useUserStore = create(set => ({
	userName: '',
	userSurname: '',
	userColor: '',
	userEmail: '',
	userId: '',
	userAvatar: avatarNotFined,
	userIsActivated: false,

	login: async (email, password, ip, date) => {
		try {
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
			console.log(err)
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			} else if (err.request) {
                throw new Error('Нет ответа от сервера');
            } else {
                throw new Error('Ошибка соединения');
            }
		}
	},

	logout: async () => {
		try {
			const { data } = await axios.post(`${PREFIX}/api/logout`, {}, { 
				withCredentials: true 
			})
			if (data) {
				return data
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

	setAvatar: async (avatar) => {
		try {
			const { data } = await axios.post(`${PREFIX}/api/setAvatar`, avatar, { 
				headers: { 'Content-Type': 'multipart/form-data' },
				withCredentials: true 
			})
			set({
				userAvatar: `${PREFIX}/${data.user}`
			})
		} catch (err) {
			console.log(err)
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
			const avatarXD = data.user.avatar ? `${PREFIX}/${data.user.avatar}` : avatarNotFined;
			set({
				userEmail: data.user.email,
				userId: data.user.id,
				userIsActivated: data.user.isActivated,
				userName: data.user.name,
				userSurname: data.user.surname,
				userColor: data.user.avatarColor,
				userAvatar: avatarXD
			})

			return true
		} catch (err) {
			set({
				userName: '',
				userSurname: '',
				userEmail: '',
				userId: '',
				userColor: '',
				userAvatar: avatarNotFined,
				userIsActivated: false
			})

			return false
		}
	}
}))