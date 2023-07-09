import express from 'express'

const pagesRouter = express.Router()

pagesRouter.get('/', (req, res) => {
    res.render('index')
})

pagesRouter.get('/register', (req, res) => {
    res.render('register')
})

pagesRouter.get('/login', (req, res) => {
    res.render('login')
})

export default pagesRouter
