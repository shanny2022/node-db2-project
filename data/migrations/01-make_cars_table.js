exports.up = function(knex) {
  return knex.schema.createTable('cars', function(table) {
    table.increments('id');
    table.string('vin').unique();
    // add other columns as needed
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cars');
};
