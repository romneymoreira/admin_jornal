function NoticiasDAO(connection) {
    this._connection = connection;
}
NoticiasDAO.prototype.getNoticia = function(parametros, callback) {
    var IdNoticia = parseInt(parametros.id);
    this._connection.query("select Id, IdCategoria, Titulo, TRIM(Corpo) as Corpo, IdAutor, Data, Status from noticia where Id =  ?", [IdNoticia], callback);
};

NoticiasDAO.prototype.getCategorias = function(callback) {
    this._connection.query("select * from categoria where Status = 'A' ORDER BY Descricao", callback);
};

NoticiasDAO.prototype.getAutores = function(callback) {
    this._connection.query("select * from autor ORDER BY Nome", callback);
};

NoticiasDAO.prototype.gerarVizualizacoes = function(vizualizacoes, callback) {
    this._connection.query('insert into vizualizacoes set ? ', vizualizacoes, callback);
};


NoticiasDAO.prototype.getNoticias = function(callback) {
    this._connection.query("select C.Descricao as categoria, N.Titulo as titulo, A.Nome as autor, N.`Status` as status, N.Id as id, N.`Data` as datanoticia " +
        " from noticia N, categoria C, autor A " +
        " where N.IdCategoria = C.Id " +
        " and N.IdAutor = A.Id " +
        " order by N.`Data` desc", callback);
};

// NoticiasDAO.prototype.salvarNoticia = function(noticia) {
//     this._connection.query('insert into noticia set ? ', noticia, function(
//         err, result) {
//         console.log(result.insertId);
//         console.log('5a64d65as456ds4a65s');
//         var visualizacoes = { IdNoticia: result.insertId, Quantidade: 0 };
//         this._connection.query('insert into visualizacoes set ? ', visualizacoes);
//     });
// };

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback) {
    this._connection.query('insert into noticia set ? ', noticia, callback);
};


NoticiasDAO.prototype.editarNoticia = function(noticia, callback) {
    this._connection.query('UPDATE noticia SET ? WHERE ?', [noticia, { Id: noticia.Id }], callback);
};


module.exports = function() {
    return NoticiasDAO;
};