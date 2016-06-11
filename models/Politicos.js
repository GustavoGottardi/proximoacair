// Politicos.js
var mongoose = require('mongoose');
 
// Cria um novo Schema com os campos que iremos utilizar no model Politicos
var PoliticosSchema = new mongoose.Schema({
  anexo: Number,
  codOrcamento: Number,
  condicao: String,
  email: String,
  fone: String,
  gabinete: String,
  idParlamentar: Number,
  ideCadastro: Number,
  matricula: Number,
  nome: String,
  nomeParlamentar: String,
  partido: String,
  sexo: String,
  uf: String,
  urlFoto: String
});
 
//Define o model Politicos
mongoose.model('Politicos', PoliticosSchema);