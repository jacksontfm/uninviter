const knex = require('../knex.js');
const TEMPLATES_TABLE = 'templates';

const getTemplates = async (req, res) => {
    try {
        const templates = await knex(TEMPLATES_TABLE).select('*');
        res.status(200).send(templates);
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot get templates"
        });
    }
};

module.exports = { getTemplates }