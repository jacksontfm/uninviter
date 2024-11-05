const TEMPLATES_TABLE = 'templates';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex(TEMPLATES_TABLE).del()
  await knex(TEMPLATES_TABLE).insert([
    {
      id: 1,
      text: 'template1'
    },
    {
      id: 2,
      text: 'template2'
    },
    {
      id: 3,
      text: 'template3'
    }
  ]);
};
