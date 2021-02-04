const config = require('../knexfile.js')
// instancia o knex, passando o arquivo de configuração(config)
const knex = require('knex')(config)

//knex.migrate.latest([config])

// acessar o knex no arquivo index
module.exports = knex