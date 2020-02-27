const db = require('../data/dbConfig');

module.exports = {
    add,
    get,
    getBy,
    getById,
    getByDepartment
}

function get() {
    return db('users').select('id', 'username', 'department');
}

function getBy(filter) {
    return db('users').where(filter);
}

function getByDepartment(department) {
    return db('users').where({department})
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return getById(id);
}

function getById(id) {
    return db('users')
        .where({ id })
        .first();
}