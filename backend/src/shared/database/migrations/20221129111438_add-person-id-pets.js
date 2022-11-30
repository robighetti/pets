/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('pets', table => {
    table.integer('person_id_donation').unsigned();
    table.foreign('person_id_donation').references('id').inTable('persons');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('pets', table => {
    table.dropColumn('person_id_donation');
  });
};
