module.exports = (app) => {
    const { existsOrError, notExistsOrError } = app.api.validation;
  
    const save = async (req, res) => {
      const cargo = { ...req.body };
      if (req.params.id) cargo.id = req.params.id;
      try {
        // validações para inserir um usuário, gerando erros na falta de informações 
        existsOrError(cargo.name, "Cargo não informado");
      } catch (msg) {
        // erro 400 falta de informações
        // manda as menssagens correspondentes as validações
        return res.status(400).send(msg);
      }
  
      // validaçoes ok,  
      if (cargo.id) {
        app
          .db('cargo')
          .update(cargo)
          // confirma o id existente
          .where({ id: cargo.id })
          // tudo certo, sem retorno de dados
          .then((_) => res.status(204).send())
          // se caso der erro, erro 500 no servidor.
          .catch((err) => res.status(500).send(err));
      } else {
        // caso o id não esteja insertado, incluir no BD
        app
          .db('cargo')
          .insert(cargo)
          .then((_) => res.status(204).send())
          .catch((err) => res.status(500).send(err));
      }
    };
  
    const remove = async (req, res) => {
        try{
            const usuario = await app.db('usuarios')
            .where({cargoId: req.params.id})
            notExistsOrError(usuario, 'cargo possui usuários')

            const rowsDeleted = await app.db('cargo')
            .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, 'cargo não foi encontrado')
        
          res.status(204).send()
        }catch(msg){
          res.status(400).send(msg)
        }
      
    };
  
    const get = (req, res) => {
      app
        .db('cargo')
        .then((cargo) => res.json(cargo))
        .catch((err) => res.status(500).send(err));
    };
  
    const getById = (req, res) => {
      app
        .db('cargo')
        .where({ id:  req.params.id })
        .first()
        .then((cargo) => res.json(cargo))
        .catch((err) => res.status(500).send(err));
    };
    const getByUserDept= (req, res) => {
      app
        .db("cargo","usuarios")
        .join("departamento",  "departamento.id",  "cargo.departamentoId")
        .where({ departamentoId:  req.params.id })
        .select( "cargo.id ", "departamento.name as departamento")
        .whereRaw("?? = ??", ["usuarios.cargoId", "cargo.id"])

        //join("usuarios", "usuarios.cargoId" , "cargo.id" )
        .then((cargo) => res.json(cargo))
        .catch((err) => res.status(500).send(err));


    };
  
  
    return { save, get, remove, getById, getByUserDept};
  };