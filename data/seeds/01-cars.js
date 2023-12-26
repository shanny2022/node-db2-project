/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    await knex('cars').truncate();
    await knex('cars').insert([
      {
        vin: "123456789",
        make: "Honda",
        model: "Civic",
        mileage: 95000,
        transmission: "CVT"
      },
      {
        vin: "2020202",
        make: "Toyota",
        model: "Rav4",
        mileage: 55000,
        transmission: "automatic"
      },
      {
        vin: "90A90A",
        make: "VW",
        model: "GTI",
        mileage: 20000,
        transmission: "manual"
      },
      {
        vin: "AJD83J",
        make: "Lamborghini",
        model: "Murcielago",
        mileage: 55000,
        transmission: "manual"
      },
      {
        vin: "ASD830VN",
        make: "Bugatti",
        model: "Chiron",
        mileage: 9500,
        transmission: "automatic"
      }
    ]);
  };
