module.exports = function(app) {
    app.get("/noticias", function(req, resp) {
        var connection = app.config.dbConnection();
        var noticiasModel = new app.app.models.NoticiasDAO(connection);

        noticiasModel.getNoticias(function(error, result) {
            resp.render("noticias/noticias", { noticias: result });
        });
    });

    app.get("/noticia", function(req, resp) {
        var connection = app.config.dbConnection();
        var noticiaModel = new app.app.models.NoticiasDAO(connection);

        noticiaModel.getNoticia(function(error, result) {
            resp.render("noticias/noticia", { noticia: result });
        });
    });
};