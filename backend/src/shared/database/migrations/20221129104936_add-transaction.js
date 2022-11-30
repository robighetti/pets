/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', table => {
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('pet_id').unsigned();
    table.foreign('pet_id').references('id').inTable('pets');
    table.integer('person_id_donation').unsigned();
    table.foreign('person_id_donation').references('id').inTable('persons');
    table.integer('person_id_adoption').unsigned();
    table.foreign('person_id_adoption').references('id').inTable('persons');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
