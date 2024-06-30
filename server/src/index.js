import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/error-middleware.js'
import router from './router/index.js'
import geoip from 'geoip-lite'

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // Ваш клиентский URL
    credentials: true // Разрешить использование cookies
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

app.get('/', async (req, res) => {
    res.send(`Hello`);
});

const start = async () => {
	try {
		await mongoose.connect(MONGO_URL)
		app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
	} catch (err) {
		console.log(err)
	}
}

start()
