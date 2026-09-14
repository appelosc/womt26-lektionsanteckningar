const express = require('express')
const router = express.Router()


//temporär db, ersätts senare med riktig databas
const tempNotes = [
    {   title: 'Hushåll', content: 'Diska' },
    {  title: 'Skola', content: 'Göra klart ml-projekt' },
    {  title: 'Köp', content: 'Köpa mjölk' }
]

router.get('/', (req, res) => {
    res.send(tempNotes)
})

router.post('/', (req, res) => {
    console.log('Inkommande note:', req.body)
    tempNotes.push( req.body)
    res.send('Note skapad', "id: " + tempNotes.length )
})

router.put('/:id', (req, res) => {
    console.log(`Updaterar note med id ${req.params.id}:`, req.body)
    tempNotes[req.params.id] = req.body
    res.send(`Note med id ${req.params.id} uppdaterad`)
})

router.delete('/:id', (req, res) => {
   console.log(`Tar bort note med id ${req.params.id}`)
    tempNotes.splice(req.params.id, 1)
   res.send(`Note med id ${req.params.id} borttagen`)
})
module.exports = router