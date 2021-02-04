const queries = require("./queries");
// criptografar a senha o usuario ao salvar
module.exports = (app) => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    const departamento = { ...req.body };
    if (req.params.id) departamento.id = req.params.id;

    try {
      // validações para inserir um usuário, gerando erros na falta de informações
      existsOrError(departamento.name, "Nome não informado");
    } catch (msg) {
      // erro 400 falta de informações
      // manda as menssagens correspondentes as validações
      return res.status(400).send(msg);
    }

    // validaçoes ok,
    if (departamento.id) {
      app
        .db("departamento")
        .update(departamento)
        // confirma o id existente
        .where({ id: departamento.id })
        // tudo certo, sem retorno de dados
        .then((_) => res.status(204).send())
        // se caso der erro, erro 500 no servidor.
        .cath((err) => res.status(500).send(err));
    } else {
      // caso o id não esteja insertado, incluir no BD
      app
        .db("departamento")
        .insert(departamento)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const usuario = await app
        .db("usuarios")
        .where({ departamentoId: req.params.id });
        notExistsOrError(usuario, "Departamento possui usuários");

      const rowsDeleted = await app
        .db("departamento")
        .where({ id: req.params.id })
        .del();
         existsOrError(rowsDeleted, "Deletado com sucesso");
         
        } catch (msg) {
          res.status(400).send(msg);
        }
      };

  const get = (req, res) => {
    app
      .db("departamento")
      .then((departamento) => res.json(departamento))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    const departamentoId = req.params.id;
    app
      .db({ u: "usuarios", d: "departamento" })
      .select("d.id", "u.name as funcionario", "d.name as setor")
      .whereRaw("?? = ??", ["u.departamentoId", "d.id"])

      .then((depts) => res.json(depts))

      .catch((err) => res.status(500).send(err));

  };
  
  const byDeptUserId = (req, res) => {
    app
       .db("usuarios")
      // .db({ u: "usuarios", d: "departamento" })
      .join("departamento",  "departamento.id", "usuarios.departamentoId")
      .where({ departamentoId: req.params.id })
      .select( "departamento.id as id","usuarios.name as funcionario", "departamento.name as departamento")
      
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  const byId = (req, res) => {
    app
      .db("departamento")
      .select("id", "name")
      .where({ id: req.params.id })
      .first()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).send(err));
  };

  // juncao de todos usuarios por departamento
  const getByCentroDept = (req, res, next) => {
    try {
      app
        .db("departamento")
        .join("centrocusto",  "centrocusto.id", "departamento.centroId")
        .select( "departamento.id as id","departamento.name as departamento", "centrocusto.name as centro_custo")
        .then((depts) => res.json(depts));
    } catch (error) {
      next(error);
    }
    // const deptId = rqe.params.id
    //  const page = req.query.page || 1
    //const dept =  await app.db.raw(queries.seachByDptm, deptId)

    /*  .limit(limit).offset(page * limit - limit) */
  };
  return { save, get, remove, getById, getByCentroDept, byId, byDeptUserId };
};
