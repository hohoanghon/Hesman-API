const knex = require("../../../sqlite3connection/db.config");

function getPrice() {
    return knex("data").select("*");
}

function updatePrice(id, value) {
    return knex("data").where("id", id).update(value);
}

function insertPrice(value) {
    return knex("data").insert(value);
}

module.exports = {
    getPrice,
    updatePrice,
    insertPrice
};