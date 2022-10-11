/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('persons_token', table => {
    table.increments('id').primary();
    table.text('token').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('person_id').unsigned();
    table.foreign('person_id').references('id').inTable('persons');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('persons_token');
};
