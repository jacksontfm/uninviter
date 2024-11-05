const GUESTS_TABLE = 'guests';
const USERS_TABLE = 'users';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(GUESTS_TABLE, function (table) {
        table.increments('id');
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable(USERS_TABLE).onDelete('CASCADE');
        table.string('guest_email').notNullable();
        table.boolean('invited');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(GUESTS_TABLE);
};
