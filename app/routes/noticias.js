module.exports = function(app) {
    app.get("/noticias", function(req, resp) {
        resp.render("noticias/listar_noticias");
        // var connection = app.config.dbConnection();
        // var noticiasModel = new app.app.models.NoticiasDAO(connection);

        // noticiasModel.getNoticias(function(error, result) {
        //     resp.render("noticias/listar_noticias", { noticias: result });
        // });
    });

    app.get("/noticia", function(req, resp) {
        resp.render("noticias/cadastrar_noticia");

        // var connection = app.config.dbConnection();
        // var noticiaModel = new app.app.models.NoticiasDAO(connection);

        // noticiaModel.getNoticia(function(error, result) {
        //     resp.render("noticias/cadastrar_noticia", { noticia: result });
        // });
    });
};