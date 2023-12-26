const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const car = await Cars.getById(req.params.id);
  if (!car) {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` });
  } else {
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({ message: "<field name> is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  if (!vinValidator.validate(req.body.vin)) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const car = await Cars.getByVin(req.body.vin);
  if (car) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
