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

const createTemplate = async (req, res) => {
    console.log(req.body);
    try {
        await knex(TEMPLATES_TABLE).insert({text: req.body});
        res.status(200).send("Template created");
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot create template"
        });
    }
};

const editTemplate = async (req, res) => {
    try {
        res.status(200).send("Template edited");
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot edit template"
        });
    }
};

const deleteTemplate = async (req, res) => {
    try {
        res.status(200).send("Template deleted");
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot delete template"
        });
    }
};

module.exports = { getTemplates, createTemplate, editTemplate, deleteTemplate }