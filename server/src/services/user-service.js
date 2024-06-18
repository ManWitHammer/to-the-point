import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '../dto/user-dto.js'
import { ApiError } from '../exceptions/api-errors.js'
import { UserModel } from '../models/user-model.js'
import mailService from './mail-service.js'
import tokenService from './token-service.js'

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({ email })
		if (candidate)
			throw ApiError.BadRequest('Пользователь с таким email уже существует')

		const hashPassword = await bcrypt.hash(password, 3)
		const activationLink = uuidv4()

		const user = await UserModel.create({
			email,
			password: hashPassword,
			activationLink
		})
		
		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/activate/${activationLink}`
		)

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink })
		if (!user) throw ApiError.BadRequest('Пользователь с таким email не найден')
		user.isActivated = true
		await user.save()
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email })
		if (!user) throw ApiError.BadRequest('Пользователь с таким email не найден')

		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) throw ApiError.BadRequest('Пароль неверный')

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) throw ApiError.UnauthorizedError()

		const userData = await tokenService.validateRefreshToken(refreshToken)
		const tokenFromDB = await tokenService.findToken(refreshToken)

		if (!userData || !tokenFromDB) throw ApiError.UnauthorizedError()

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	}
}

export default new UserService()
