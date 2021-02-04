exports.up = function(knex, Promise) {
    return knex.schema.createTable('cargo', table =>{
        table.increments('id').primary()
        table.string('name').notNull()
        // table.integer('departamentoId').unsigned()
        // table.foreign('departamentoId').references('id')
        // .inTable('departamento').notNull()
        table.integer('departamentoId').unsigned().index().references('id')
        .inTable('departamento')
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('cargo')
  };
