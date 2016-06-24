// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Politicos = mongoose.model('Politicos');
var app = express();
var fs = require('fs');
 
// ROTA BUSCAR ============================================
router.get('/api/politicos', ensureAuthorized, function(req, res) {
    // utilizaremos o mongoose para buscar todos os politicos no BD
    Politicos.find(function(err, politicos) {
        // Em caso de erros, envia o erro na resposta
        if (err){
            res.send(err)
        }
        // Retorna todos os politicos encontrados no BD
        res.json(politicos);
    });
});

router.get('/api/getjsondeputados', ensureAuthorized, function(req, res) {
    fs.readFile('deputados.json', 'utf8', function (err,data) {
      if (err) {
          return console.log(err);
      }
      var json_formated = JSON.parse(data);
      res.json(json_formated);
    });
});
 
// ROTA CRIAR =============================================
router.post('/api/politicos', ensureAuthorized, function(req, res) {
    // Cria um politico, as informações são enviadas por uma requisição AJAX pelo Angular
    Politicos.create({
        anexo: req.body.anexo,
        codOrcamento: req.body.codOrcamento,
        condicao: req.body.condicao,
        email: req.body.email,
        fone: req.body.fone,
        gabinete: req.body.gabinete,
        idParlamentar: req.body.idParlamentar,
        ideCadastro: req.body.ideCadastro,
        matricula: req.body.matricula,
        nome: req.body.nome,
        nomeParlamentar: req.body.nomeParlamentar,
        partido: req.body.partido,
        sexo: req.body.sexo,
        uf: req.body.uf,
        urlFoto: req.body.urlFoto
    }, function(err, politicos) {
        if (err){
            res.send(err);
        }
        // Busca novamente todos os politicos após termos inserido um novo registro
        Politicos.find(function(err, politicos) {
            if (err){
                res.send(err)
            }
            res.json(politicos);
        });
    });
 
});
 
// ROTA DELETAR ============================================
router.delete('/api/politicos/:politicos_id', ensureAuthorized, function(req, res) {
    // Remove o politicos no Model pelo parâmetro _id
    Politicos.remove({
        _id : req.params.politicos_id
    }, function(err, politicos) {
        if (err){
            res.send(err);
        }
        // Busca novamente todos os politicos após termos removido o registro
        Politicos.find(function(err, politicos) {
            if (err){
                res.send(err)
            }
            res.json(politicos);
        });
    });
});
 
// ROTA EDITAR =============================================
router.get('/api/politicos/:politicos_id', ensureAuthorized, function(req, res) {
    // Busca o politicos no Model pelo parâmetro id
    Politicos.findOne({
        _id : req.params.politicos_id
    }, function(err, politicos) {
        if (err){
            res.send(err);
        }
        res.json(politicos);
    });
});
 
// ROTA ATUALIZAR ==========================================
router.put('/api/politicos/:politicos_id', ensureAuthorized, function(req, res) {
    // Busca o politicos no Model pelo parâmetro id
    var politicosData = req.body;
    var id = req.params.politicos_id;
 
    Politicos.update({
        _id: id 
    }, politicosData, { 
        upsert: true
    }, function(err, politicos) {
        if (err){
            res.send(err);
        }
        res.json(politicos);
    });
    
});

//Cabeçalhos de requisição são interceptados e o cabeçalho authorization é extraído
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

process.on('uncaughtException', function(err) {
    console.log(err);
});

module.exports = router;