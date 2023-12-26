const express = require('express');
const Cars = require('./cars-model'); // Assuming you have a cars-model.js file that exports the model functions
const router = express.Router();


// [POST] /api/cars
router.post('/', async (req, res) => {
    const { vin, make, model, mileage } = req.body;
    if (!vin || !make || !model || !mileage) {
      return res.status(400).json({ message: 'vin, make, model and mileage are required' });
    }
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new car' });
    }
  });
// [GET] /api/cars
router.get('/', async (req, res) => {
  try {
    const cars = await Cars.getAll(); // Assuming you have a getAll function in your model
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get cars' });
  }
});

// [GET] /api/cars/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Cars.getById(id); // Assuming you have a getById function in your model
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ message: 'Could not find car with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to get car' });
  }
});


module.exports = router;
