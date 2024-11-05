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
      text: "Hey! I'm having a party. Come to it I guess?"
    },
    {
      id: 2,
      text: "I hate people but you're okay. So congrats, you're invited."
    },
    {
      id: 3,
      text: "What up! We're three cool guys looking for other cool guys who wanna hang out in our party mansion. Nothing sexual. Dudes in good shape encouraged. If you're fat, you should be able to find humor in the little things. Again, nothing sexual."
    }
  ]);
};
