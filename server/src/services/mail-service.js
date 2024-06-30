import 'dotenv/config'
import nodemailer from 'nodemailer'

class mailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			}
		})
	}

	async sendActivationMail(email, link) {
		try {
			await this.transporter.sendMail({
				from: process.env.SMTP_USER,
				to: email,
				subject: `Активация аккаунта на ${process.env.CLIENT_URL}`,
				text: '',
				html: `
					<div>
						<h1>Активация аккаунта</h1>
						<p>Для активации аккаунта перейдите по ссылке ниже:</p>
						<a href="${link}">Перейди по мне:)</a>
					</div>
				`
			})
		} catch (err) {
			console.error('Error sending email:', err)
			throw err
		}
	}

	async warnAboutLogging(email, userIp, userName, date) {
		try {
			await this.transporter.sendMail({
				from: process.env.SMTP_USER,
				to: email,
				subject: `Новый вход на ваш аккаунт`,
				text: '',
				html: `
					<div>
						<h1>Привет! ${userName} </h1>
						<p>Мы заметили новый вход на вашу учётную запись</p>
						<p>Местоположение: ${userIp.country}, ${userIp.city}</p>
						<p>Время входа: ${date}</p>
						<p>Если вы делали это, то проигнорийте данное сообщение и больше не вспоминайте про него НИКОГДА.</p>
						<p>Если вы не делали это, то БЫСТРО ПОМЕНЯЙТЕ ПАРОЛЬ!!! А стоп, у нас такой функции... Ну хз тогда.</p>
					</div>
				`
			})
		} catch (err) {
			console.error('Error sending email:', err)
			throw err
		}
	}
}

export default new mailService()
