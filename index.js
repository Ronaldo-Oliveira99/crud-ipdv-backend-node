const app = require('express')()
//padrao para gerenciar as dependencias dentro da aplicação -> consign
const consign = require('consign')

//importar o db
const db = require('./config/db') 
// knex configurado para fazer operacoes no bd
app.db = db

consign()
// Carregar as sequências, para ter controle das configs
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api/validation.js')
.then('./api')
.then('./config/routes.js')
.into(app)


app.listen(3000, () =>{
    console.log('Backend executando...')
}) 