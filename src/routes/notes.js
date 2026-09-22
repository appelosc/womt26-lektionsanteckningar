const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const authorize = require('../middleware/authorize')

const prisma = new PrismaClient()

router.use(authorize)


router.get('/', async (req, res) => {
    const notes = await prisma.notes.findMany({
        orderBy: {created_at: 'desc'}
    })
    res.send(notes)
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const notes = await prisma.notes.findUnique({
        where: {id: Number(id), 
        author_id: Number(req.authUser.sub)}
    })
    if (!notes) {
        return res.status(404).json({ message: "Note not found" })
    }
    res.send(notes)
})

router.post('/',  async (req, res) => {
    console.log(req.body)

    const note = await prisma.notes.create({
        data: { 
            author_id: 1, 
            note: req.body.note
        }
    })
    
    res.send({
        msg: "Note created",
        id: note.id
    })
    
})


router.put('/:id', async (req, res) => {
    const { note } = req.body;
    const {id} = req.params
    const updateNote = await prisma.notes.update({
        where: {id: Number(id)},
        data: {
            note,
            updated_at: new Date()
        }
    })
    res.json(updateNote)
})

router.delete('/:id', async (req, res) => {
   const {id} = req.params
   const deleteNote = await prisma.notes.delete({
    where: {id: Number(id)},
   })
   res.send("Note deleted")
})
   
module.exports = router