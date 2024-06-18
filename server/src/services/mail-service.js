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
						<a href="${link}">Перейди по мне, дай денег списать с твоей карты пж</a>
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
