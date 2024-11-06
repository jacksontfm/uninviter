const knex = require('../knex.js');
const USERS_TABLE = 'users';

class Users {
    constructor() {}

    static getUser(email) {
        return knex(USERS_TABLE).where("user_email", "=", email).first();
    }

    static addUser(email) {
        return knex(USERS_TABLE).insert({user_email: email})
    }
}

module.exports = Users;