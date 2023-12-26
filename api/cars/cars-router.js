const router = require('express').Router();
const Cars = require('./cars-model');
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkCarId, (req, res) => {
  res.json(req.car);
});

router.post(
  '/',
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const car = await Cars.create(req.body);
      res.status(201).json(car);
    } catch (err) {
      next(err);
    }
  }
);
router.put('/:id', checkCarId, checkCarPayload, async (req, res, next) => {
    try {
      const updatedCar = await Cars.update(req.params.id, req.body);
      res.json(updatedCar);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', checkCarId, async (req, res, next) => {
    try {
      await Cars.remove(req.params.id);
      res.json(req.car);
    } catch (err) {
      next(err);
    }
  });
module.exports = router;
