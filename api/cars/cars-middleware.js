const Cars = require('./cars-model');

const vinValidator = require('vin-validator');

const checkCarId = async (request, response, next) => {
  try {
    const car = await Cars.getById(request.params.id);
    if (!car) {
      next({ status: 404, message: `car with id ${request.params.id} is not found` });
    } else {
      request.car = car;
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: 'missing car data' });
  }
  const { vin, model, make, mileage } = req.body;
  if (!vin) {
    return res.status(400).json({ message: 'missing required vin field' });
  }
  if (!model) {
    return res.status(400).json({ message: 'missing required model field' });
  }
  if (!make) {
    return res.status(400).json({ message: 'missing required make field' });
  }
  if (mileage === undefined) {
    return res.status(400).json({ message: 'missing required mileage field' });
  }
  next();
};

const checkVinNumberValid = (request, response, next) => {
  const { vin } = request.body;
  const isValidVin = vinValidator.validate(vin);
  if (!isValidVin) {
    next({ status: 400, message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (request, response, next) => {
  try {
    const { vin } = request.body;
    const existingCar = await Cars.getByVin(vin);
    if (existingCar) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};
