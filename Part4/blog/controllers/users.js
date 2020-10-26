const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.username === undefined || body.username === null) {
        return response.status(400).json({ error: 'Username missing' })
    }

    if (body.username.length < 3) {
        return response.status(400).json({ error: 'Username too short, min length is 3 characters' })
    }

    if (body.password === undefined || body.password === null) {
        return response.status(400).json({ error: 'Password missing' })
    }

    if (body.password.length < 3) {
        return response.status(400).json({ error: 'Password too short, min length is 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
