const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const authorize = require('../middleware/authorize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

router.post('/',  async (req, res) => {
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = await prisma.users.create({
        data: { 
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        }
    })
    
    res.send({
        msg: "User created",
        id: user.id
    })
    
})

router.post('/login',  async (req, res) => {
    const reqUser = await prisma.users.findUnique({
        where: { email: req.body.email }
    })
    if (!reqUser) {
        return res.status(404).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(req.body.password, reqUser.password)
    if (!isMatch) {
        console.log("Invalid credentials")
        return res.status(401).json({ message: "Invalid credentials" })
    }
    const token = jwt.sign({ 
        sub: reqUser.id, 
        name: reqUser.name,
        email: reqUser.email 
    },process.env.JWT_SECRET, { expiresIn: '30d' })
    res.send({
        msg: "User logged in",
        id: reqUser.id,
        token: token
    })
})

module.exports = router