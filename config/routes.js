// const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    
    // quando vier nesta url, usando post...
    app.route('/usuarios')
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.get)

    app.route('/usuarios/:id')
    .all(app.config.passport.authenticate())
    .put(app.api.user.save)
    .get(app.api.user.getById)
    .delete(app.api.user.remove)

    app.route('/departamento')
    .all(app.config.passport.authenticate())
    .get(app.api.departamento.get)
    // .get(app.api.departamento.getByDept)
    .post(app.api.departamento.save)
    
    app.route('/dpt/:id')
    .all(app.config.passport.authenticate())
    //  .get(app.api.departamento.byDeptUserId)
    //.get(app.api.departamento.getByUserDept)
    // .get(app.api.departamento.byId)
    .post(app.api.departamento.save)

    app.route('/deptwithcentro')
    .all(app.config.passport.authenticate())
     .get(app.api.departamento.getByCentroDept)
    // .get(app.api.departamento.byId)
    .post(app.api.departamento.save)


    app.route('/departamento/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.departamento.getById)
    //.get(app.api.departamento.byId)
    .put(app.api.departamento.save)
    .delete(app.api.departamento.remove)

    app.route('/cargo')
    // .all(app.config.passport.authenticate())
    .get(app.api.cargo.get)
    .post(app.api.cargo.save)

    app.route('/cargo/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.cargo.getByUserDept)
    //.get(app.api.cargo.getById)
    .put(app.api.cargo.save)
    .delete(app.api.cargo.remove)

    app.route('/centrocusto')
    .all(app.config.passport.authenticate())
    .get(app.api.centrocusto.get)
    .post(app.api.centrocusto.save)
    
    app.route('/centrocusto/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.centrocusto.getById)
    .put(app.api.centrocusto.save)
    .delete(app.api.centrocusto.remove)
}   
// module.exports = app => {
//     app.post('/signup', app.api.user.save)
//     app.post('/signin', app.api.auth.signin)
//     app.post('/validateToken', app.api.auth.validateToken)
    
//     // quando vier nesta url, usando post...
//     app.route('/usuarios')
//     .all(app.config.passport.authenticate())
//     .post(admin(app.api.user.save))
//     .get(app.api.user.get)

//     app.route('/usuarios/:id')
//     .all(app.config.passport.authenticate())
//     .put(admin(app.api.user.save))
//     .get(app.api.user.getById)
//     .delete(admin(app.api.user.remove))

//     app.route('/departamento')
//     .all(app.config.passport.authenticate())
//     // .get(app.api.departamento.get)
//     .get(app.api.departamento.getByDept)
//     .post(admin(app.api.departamento.save))

//     app.route('/departamento/:id')
//     .all(app.config.passport.authenticate())
//     .get(app.api.departamento.getById)
//     //.get(app.api.departamento.byId)
//     .put(admin(app.api.departamento.save))
//     .delete(admin(app.api.departamento.remove))

//     app.route('/cargo')
//     .all(app.config.passport.authenticate())
//     .get(app.api.cargo.get)
//     .post(admin(app.api.cargo.save))

//     app.route('/cargo/:id')
//     .all(app.config.passport.authenticate())
//     .get(app.api.cargo.getById)
//     .put(admin(app.api.cargo.save))
//     .delete(admin(app.api.cargo.remove))

//     app.route('/centrocusto')
//     .all(app.config.passport.authenticate())
//     .get(app.api.centrocusto.get)
//     .post(admin(app.api.centrocusto.save))
    
//     app.route('/centrocusto/:id')
//     .all(app.config.passport.authenticate())
//     .get(app.api.centrocusto.getById)
//     .put(admin(app.api.centrocusto.save))
//     .delete(admin(app.api.centrocusto.remove))
// }   


