/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pets', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.integer('age').notNullable();
    table.text('race').notNullable();
    table.boolean('castrated').notNullable().defaultTo(false);
    table.text('port').notNullable();
    table.text('type').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('pets');
};
