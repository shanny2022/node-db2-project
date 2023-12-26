exports.up = function(knex) {
    return knex.schema.createTable('sales', table => {
      table.increments();
      table.integer('car_id').unsigned().notNullable();
      table.foreign('car_id').references('id').inTable('cars');
      table.string('customer_name').notNullable();
      table.date('sale_date').notNullable();
      // add more columns as needed
    });
  };

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sales');
  };
