const knex = require('../knex.js');
const USERS_TABLE = 'users';

const getUser = async (req, res) => {
    const email = req.body.user_email;
    try {
        const user = await knex(USERS_TABLE).where({ user_email: email }).first();
        if (!user) {
            await knex(USERS_TABLE).insert({ user_email: email });
            const newUser = await knex(USERS_TABLE).where("user_email", "=", email).first();
            return res.status(201).send(newUser);
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot proceed"
        });
    }
};

const deleteUser = async (req, res) => {
    const user_id = req.body.user_id;
    try {
        await knex(USERS_TABLE).where({ id: user_id }).del();
        return res.status(200).send({ message: "User deleted" });
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot delete user"
        });
    }
}

module.exports = { getUser, deleteUser }