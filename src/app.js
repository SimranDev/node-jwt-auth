import express from 'express'
import mysql from 'mysql'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

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

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5000, () => {
    console.log('Example app listening on port 5000!')
})
