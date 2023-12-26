const Cars = require("./cars-model");

const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const { id } = req.params;

  const car = await Cars.getById(id);
  if(car) next();
  else next( {
    status: 404,
    message: `car with id ${id} is not found`
  })
}

const checkCarPayload = (req, res, next) => {
  const errObj = { status: 400 };

  const requiredFields = ["vin", "make", "model", "mileage"];

  for (const field of requiredFields) {
    if(!req.body[field]) errObj.message = `${field} is missing`;
  }

  if(errObj.message) next(errObj);
  else next();
}

const checkVinNumberValid = (req, res, next) => {

  const { vin } = req.body;

  if(vinValidator.validate(vin)) next();
  else next( {
    status: 400,
    message: `vin ${vin} is invalid`
  })
}

const checkVinNumberUnique = async (req, res, next) => {

  const { vin } = req.body;
  const car = await Cars.getByVin (vin);

  if(!car) next();
  else next( {
    status: 400,
    message: `vin ${vin} already exists`
  })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
