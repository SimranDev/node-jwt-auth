import mysql from 'mysql2'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

export const registerController = (req, res) => {
    console.log(req.body)
    const { name, email, password, password_confirmation } = req.body
    db.query(
        'SELECT email from users WHERE email = ?',
        [email],
        async (error, results) => {
            if (error) {
                console.log(error)
            }

            if (results?.length > 0) {
                return res.render('register', {
                    message: 'That email is already in use',
                })
            } else if (password !== password_confirmation) {
                return res.render('register', {
                    message: 'Passwords do not match',
                })
            }

            // let hashedPassword = await bcrypt.hash(password, 1)
            // console.log({ hashedPassword })

            db.query(
                'INSERT INTO users SET ?',
                { name, email, password },
                (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(results)
                        return res.render('register', {
                            message: 'User registered',
                        })
                    }
                }
            )
        }
    )
}
