// interpreta  o body da requisição
const bodyParser = require('body-parser')
// permite o acesso da api por outra aplicação
const cors = require('cors')

// app instancia do express
module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors())
}    