/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('persons', table => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('email').notNullable().unique();
    table.text('whatsapp').notNullable();
    table.text('password').notNullable();
    table.text('cep');
    table.text('address');
    table.text('city');
    table.text('neighborhood');
    table.text('avatar');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('persons');
};
