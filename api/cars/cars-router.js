const Cars = require("./cars-model");
const router = require("express").Router();
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require("./cars-middleware");

router.get("/", (req, res, next) => {
    Cars.getAll()
        .then( cars => res.json(cars))
        .catch(next);
});

router.get("/:id", checkCarId, (req, res, next) => {
    Cars.getById(req.params.id)
        .then( car => res.json(car))
        .catch(next);
});
router.post('/', async (req, res) => {
    const { vin, make, model, mileage } = req.body;
    if (!vin || !make || !model || !mileage) {
      return res.status(400).json({ message: 'vin, make, model and mileage are required' });
    }
    try {
      const existingCar = await Cars.getByVin(vin);
      if (existingCar) {
        return res.status(400).json({ message: `vin ${vin} already exists` });
      }
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create new car' });
    }
  });
router.post("/",
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,

    (req, res, next) => {
        Cars.create(req.body)
            .then( newCar => res.status(201).json(newCar))
            .catch(next);
    }
);

module.exports = router;
