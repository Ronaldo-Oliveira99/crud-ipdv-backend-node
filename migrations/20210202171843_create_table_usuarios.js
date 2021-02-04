exports.up = knex => knex.schema.createTable('usuarios', table =>{
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('email').notNull().unique()
    table.string('password').notNull()
    table.boolean('admin').notNull().defaultTo(false)

    table.integer('cargoId').unsigned().index().references('id')
        .inTable('cargo')
        table.integer('departamentoId').unsigned().index().references('id')
        .inTable('departamento')

      
})

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('usuarios')
};

