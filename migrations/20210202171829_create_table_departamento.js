exports.up = function(knex, Promise) {

    return knex.schema.createTable('departamento', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        //autorelacionamento
        table.integer('centroId').unsigned().index().references('id')
        .inTable('centrocusto')
    })
  
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTable('departamento')
  
};