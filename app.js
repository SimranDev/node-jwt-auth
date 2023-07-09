import express from 'express'
import mysql from 'mysql2'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import pagesRouter from './routes/pages.js'
import authRouter from './routes/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connected to DB!')
})

/* Public directory */
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

/* Parse URL-encoded bodies (as sent by HTML forms) */
app.use(express.urlencoded({ extended: false }))
/* Parse JSON bodies (as sent by API clients) */
app.use(express.json())

/* View engine: Handlebars */
app.set('view engine', 'hbs')

/* Routes */
app.use('/', pagesRouter)
app.use('/auth', authRouter)

app.listen(5000, () => {
    console.log('Example app listening on port 5000!')
})
