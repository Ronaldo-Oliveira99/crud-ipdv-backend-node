module.exports = (app) => {
    const { existsOrError, notExistsOrError } = app.api.validation;
  
    const save = async (req, res) => {
      const centro_custo = { ...req.body };
      if (req.params.id) centro_custo.id = req.params.id;
   
      try {
        // validações para inserir um usuário, gerando erros na falta de informações 
        existsOrError(centro_custo.name, "Centro não informado");
      } catch (msg) {
        // erro 400 falta de informações
        // manda as menssagens correspondentes as validações
        return res.status(400).send(msg);
      }
  
      // validaçoes ok,  
      if (centro_custo.id) {
        app
          .db('centrocusto')
          .update(centro_custo)
          // confirma o id existente
          .where({ id: centro_custo.id })
          // tudo certo, sem retorno de dados
          .then((_) => res.status(204).send())
          // se caso der erro, erro 500 no servidor.
          .cath((err) => res.status(500).send(err));
      } else {
        // caso o id não esteja insertado, incluir no BD
        app
          .db( 'centrocusto')
          .insert(centro_custo)
          .then((_) => res.status(204).send())
          .catch((err) => res.status(500).send(err));
      }
    };
  
    const remove = async (req, res) => {
        try{
            const dpto = await app.db('departamento')
            .where({centroId: req.params.id})
            notExistsOrError(dpto,  'Centro de Custo possui Departameto')
            
        
              const rowsDeleted = await app.db('centrocusto')
              .where({id: req.params.id}).del()
              
              existsOrError(rowsDeleted, 'Centro de Custo não foi encontrado')
        
          res.status(204).send()
        }catch(msg){
          res.status(400).send(msg)
        }
      
    };
  
    const get = (req, res) => {
      app
        .db( 'centrocusto')
        .then((centro_custo) => res.json(centro_custo))
        .catch((err) => res.status(500).send(err));
    };
  
    const getById = (req, res) => {
      app
        .db( 'centrocusto')
        .where({ id:  req.params.id })
        .first()
        .then((centro_custo) => res.json(centro_custo))
        .catch((err) => res.status(500).send(err));
    };
  
  
    return { save, get, remove, getById};
  };