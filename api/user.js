// criptografar a senha o usuario ao salvar
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  // responsavel para encriptogragar a senha
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;

    try {
      // validações para inserir um usuário, gerando mensagens erros na falta de informações
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
      // existsOrError(user.departamentoId, "Departamento não informado");
      existsOrError(user.cargoId, "Cargo não informado");
      // existsOrError(user.password, "Senha não informada");
      // existsOrError(user.confirmPassword, "Confirmação de Senha inválida");
      // equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      //acessar tabela de usuarios para verificar um usuário existente
      // utilizo a instancia knex, db.user ...
      const userFromDB = await app
        .db("usuarios")
        .where({ email: user.email })
        .first();

      // ESTA PARTE PRECISA REVISAR !!!!!
      // se o id não estiver cadastrado, gera uma menssagem
      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      // erro 400 falta de informações
      // manda as menssagens correspondentes as validações
      return res.status(400).send(msg);
    }

    // validaçoes ok, hash da senha do usuário
    user.password = encryptPassword(user.password);
    // deletar a confirmação da senha, para não inserir no bd
    delete user.confirmPassword;

    // se tiver id, fazer um update.
    if (user.id) {
      app
        .db("usuarios")
        .update(user)
        // confirma o id existente
        .where({ id: user.id })
        // tudo certo, sem retorno de dados
        .then((_) => res.status(204).send())
        // se caso der erro, erro 500 no servidor.
        .catch((err) => res.status(500).send(err));
    } else {
      // caso o id não esteja insertado, incluir no BD
      app
        .db("usuarios")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const get = (req, res) => {
    app
      .db("usuarios")
      .select("id", "name", "email", "admin", "password")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("usuarios")
      .select("id", "name", "email", "admin")
      .where({ id: req.params.id })
      .first()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  const remove = async (req, res) => {
    try {

      const rowsUpdated = await app
        .db("usuarios")
       // .update({ deletedAt: new Date() })
        .where({ id: req.params.id })
        .del();
         existsOrError(rowsUpdated, "Usuário não foi encontrado.");

      res.status(204).send();
    } catch (msg) {
      res.status(400).send(msg);
    }
  };

  return { save, get, getById, remove };
};
