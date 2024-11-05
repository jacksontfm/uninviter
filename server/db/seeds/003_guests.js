const GUESTS_TABLE = 'guests';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(GUESTS_TABLE).del()
  await knex(GUESTS_TABLE).insert([
    {
      id: 1,
      user_id: 1,
      guest_email: 'jackson.merle@gmail.com',
      invited: true
    },
    {
      id: 2,
      user_id: 1,
      guest_email: 'avalanchehobo@gmail.com',
      invited: false
    }
  ]);
};
