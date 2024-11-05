const USERS_TABLE = 'users';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(USERS_TABLE).del()
  await knex(USERS_TABLE).insert([
    {
      id: 1,
      user_email: 'jackson.merle@gmail.com'
    },
    {
      id: 2,
      user_email: 'avalanchehobo@gmail.com'
    }
  ]);
};
