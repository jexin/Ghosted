const router = require('express').Router()
let Entry = require('../models/entry.model')

router.route('/').get((req, res) => {
    Entry.find().sort({createdAt: -1})
        .then(entries => res.json(entries))
        .catch(err => res.status(400).json('Error: ' + err))
})

// C
router.route('/add').post((req, res) => {
    const username = req.body.username
    const name = req.body.name
    const company = req.body.company
    const status = req.body.status
    const notes = req.body.notes

    const newEntry = new Entry({
        username,
        name,
        company,
        status,
        notes
    })

    newEntry.save()
        .then(entry => res.json(entry))
        .catch(err => res.status(400).json('Error: ' + err))
})

// R
router.route('/:id').get((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => res.json(entry))
        .catch(err => res.status(400).json('Error: ' + err))
})

// U
router.route('/update/:id').post((req, res) => {
    Entry.findById(req.params.id)
        .then(entry => {
            entry.username = req.body.username
            entry.name = req.body.name
            entry.company = req.body.company
            entry.status = req.body.status
            entry.notes = req.body.notes

            entry.save()
                .then(() => res.json(entry))
                .catch(err => res.status(400).json('Error: ' + err)) 
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

// D
router.route('/:id').delete((req, res) => {
    Entry.findByIdAndDelete(req.params.id)
        .then(entry => res.json(entry))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router