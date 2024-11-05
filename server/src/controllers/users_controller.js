const knex = require('../knex.js');
const USERS_TABLE = 'users';

const getUser = async (req, res) => {
    const email = req.body.user_email;
    console.log(email);
    try {
        const userExists = await knex(USERS_TABLE).where("user_email", "=", email).first();
        console.log(userExists);
        if (!userExists) {
            const newUser = knex(USERS_TABLE).insert({user_email: email});
            return res.status(200).send(newUser);
        }
        res.status(200).send(userExists);
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot proceed"
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        res.status(200).send("you did it");
    } catch (err) {
        res.status(500).send({
            message: "Error: cannot delete user"
        });
    }
}

module.exports = { getUser, deleteUser }