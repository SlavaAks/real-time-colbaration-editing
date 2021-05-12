'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const response = require('../response')
const db = require('../setting/db')
const config = require('../setting/config')

exports.getAllUsers = (req, res) => {

    db.query('SELECT `id`, `name`, `second_name`, `email` FROM `users`', (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else {
            response.status(200, rows, res)
        }
    })

}

exports.signup = (req, res) => {
    console.log("req.body.email", req.body.email)
    db.query("SELECT `id`, `email`, `name` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if (typeof rows !== 'undefined' && rows.length > 0) {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(302, { message: `Пользователь с таким email - ${rw.email} уже зарегстрирован!` }, res)
                return true
            })
        } else {
            const email = req.body.email
            const name = req.body.name
            const secondName = req.body.second_name !== '' ? req.body.second_name : 'Не указано'

            const salt = bcrypt.genSaltSync(15)
            const password = bcrypt.hashSync(req.body.password, salt)

            const sql = "INSERT INTO `users`(`name`, `second_name`, `email`, `password`) VALUES('" + name + "', '" + secondName + "', '" + email + "', '" + password + "')";
            db.query(sql, (error, results) => {
                if (error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, { message: `Регистрация прошла успешно.`, results }, res)
                }
            })

        }
    })

}

exports.signauth = async (req, res) => {
    try {
    console.log(config.jwt)
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log(req.user.userId)

    db.query("SELECT `id`, `email`, `name` , `second_name`, `password` FROM `users` WHERE `id` = '" + req.user.userId + "'", (error, rows, fields) => {
        console.log(rows)
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                    //Если true мы пускаем юзера и генерируем токен
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.jwt, { expiresIn: 120 * 120 })

                    // res.cookie('authorization', token); // add cookie here
                    response.status(200, { token,
                        user: {
                            id: rw.id,
                            email: rw.email,
                            name:rw.name,
                            second_name:rw.second_name
                        } }, res)

                return true
            })
        })
    }   catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }

}

exports.signin = async (req, res) => {
    try {

    db.query("SELECT `id`, `email`, `password`, `name`, `second_name` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
        if (error) {
            response.status(400, error, res)
        } else if (rows.length <= 0) {
            response.status(401, { message: `Пользователь с email - ${req.body.email} не найден. Пройдите регистрацию.` }, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if (password) {
                    //Если true мы пускаем юзера и генерируем токен
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.jwt, { expiresIn: 120 * 120 })

                    // res.cookie('authorization', token); // add cookie here

                    response.status(200, { token,
                        user: {
                            id: rw.id,
                            email: rw.email,
                            name:rw.name,
                            second_name:rw.second_name
                        } }, res)

                } else {
                    //Выкидываем ошибку что пароль не верный
                    response.status(401, { message: `Пароль не верный.` }, res)

                }
                return true
            })
        }
    })   } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }

}