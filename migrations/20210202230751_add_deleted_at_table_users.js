exports.up = function (knex, Promise) {
    return knex.schema.alterTable('usuarios', table => {
        table.timestamp('deletedAt')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('usuarios', table => {
        table.dropColumn('deletedAt')
    })
};

