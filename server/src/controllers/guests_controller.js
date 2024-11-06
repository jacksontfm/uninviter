const knex = require('../knex.js');
const GUESTS_TABLE = 'guests';

const getGuests = async (req, res) => {
    const user_id = req.body.user_id;
    try {
        const guests = await knex(GUESTS_TABLE).where({ user_id: user_id });
        return res.status(200).send(guests)
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot get guests"
        });
    }
}

const addGuest = async (req, res) => {
    const { user_id, guest_email } = req.body;
    try {
        await knex(GUESTS_TABLE).insert({
            user_id: user_id,
            guest_email: guest_email
        })
        res.status(201).send("New guest added");
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot add guest"
        });
    }
}

const deleteGuest = async (req, res) => {
    const guest_id = req.body.id;
    try {
        await knex(GUESTS_TABLE).where({ id: guest_id }).del()
        return res.status(200).send("Guest deleted");
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot delete guest"
        });
    }
}

module.exports = { getGuests, addGuest, deleteGuest }