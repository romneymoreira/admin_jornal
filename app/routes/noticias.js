module.exports = function(app) {
    app.get("/noticias", function(req, resp) {
        var connection = app.config.dbConnection();
        var noticiasModel = new app.app.models.NoticiasDAO(connection);

        noticiasModel.getNoticias(function(error, result) {
            resp.render("noticias/listar_noticias", { noticias: result });
        });
    });

    app.post("/noticias/cadastrar", function(req, resp) {
        var noticia = req.body;
        req.assert("idCategoria", "Categoria deve ser preenchido").notEmpty();
        req.assert("corpo", "Noticia deve ser preenchido").notEmpty();
        var erros = req.validationErrors();
        console.log(erros);
        if (erros) {
            resp.render("noticias/cadastrar", { validacao: erros, noticia: noticia });
            return;
        }

        var connection = app.config.dbConnection();
        var noticiaModel = new app.app.models.NoticiasDAO(connection);
        if (parseInt(noticia.Id) > 0) {
            noticiaModel.editarNoticia(noticia, function(error, result) {
                resp.redirect("/noticias");
            });
        } else {
            noticiaModel.salvarNoticia(noticia, function(error, result) {
                resp.redirect("/noticias");
            });
        }

    });


    app.get("/noticia", function(req, resp) {
        //resp.render("noticias/cadastrar_noticia");
        var parametros = req.query;
        var connection = app.config.dbConnection();
        var noticiaModel = new app.app.models.NoticiasDAO(connection);

        var categorias = [];
        var autores = [];

        if (parametros.id > 0) {
            noticiaModel.getCategorias(function(error, result) {
                categorias = result;
                noticiaModel.getAutores(function(error, result) {
                    autores = result;
                    noticiaModel.getNoticia(parametros, function(error, result2) {
                        console.log(result2);
                        resp.render("noticias/cadastrar_noticia", { noticia: result2, categorias: categorias, autores: autores, validacao: null });
                    });
                });
            });

        } else {
            var model = [{
                Id: 0,
                Titulo: '',
                IdCategoria: 0,
                IdAutor: 0
            }];
            noticiaModel.getCategorias(function(error, result) {
                categorias = result;
                noticiaModel.getAutores(function(error, result) {
                    autores = result;
                    resp.render("noticias/cadastrar_noticia", { noticia: model, categorias: categorias, autores: autores, validacao: null });
                });
            });

        }


    });
};