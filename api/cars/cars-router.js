const express = require('express')
const Car = require('./cars-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', (req, res) => {
    res.json(`get car by id ${req.params.id}`)
})

router.post('/', (req, res) => {
    res.json('creating new car')
})

module.exports = router;
