exports.up = function (knex) {
  return knex.schema.createTable('sales', table => {
    table.increments();
    table.integer('car_id').unsigned().notNullable();
    table.foreign('car_id').references('cars.id');
    table.decimal('price').notNullable();
    table.date('sale_date').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('sales');
};
