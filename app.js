var express  = require('express');
// cria nossa aplicação Express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// solicitações para log no console (express4)
var logger = require('morgan');
// puxar informações por POST HTML (express4)
var bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
var methodOverride = require('method-override');

// Requisição ao arquivo que cria nosso model Politicos
require('./models/Politicos');

// definindo local de arquivos públicos
app.use(express.static(__dirname + '/dist'));
// definindo o local das views
app.set('views', __dirname + '/dist/views');
// definindo view engine como html
app.set('view engine', 'html');
// logando todas as requisições no console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// start up the server
// conectando ao mongodb no localhost, criando o banco de dados Politicos
mongoose.connect('mongodb://localhost/politicos');
var db = mongoose.connection;
// Caso haja erro ao se conectar emite um log
db.on('error', console.error);
db.once('open', startServer);
function startServer(){
	// Define a porta 8080 onde será executada nossa aplicação
	var server = app.listen(8080, function(){
		var port = server.address().port;
		// Imprime uma mensagem no console na porta em que a aplicação está rodando
		console.log("Aplicação executada na porta: "+port);

		// Definindo nossa rota principal para o ANGULARJS/FRONT-END
		app.get('*', function(req, res) {
		    // Carrega nossa view index.html que será a única da nossa aplicação
		    // O Angular irá lidar com as mudanças de páginas no front-end
		    res.sendFile(__dirname + '/dist/views/index.html');
		});
	});
};

// Incluindo nossas rotas definidas no arquivo routes/index.js
var index = require('./routes/index');
// definindo nossas rotas na aplicação
app.use('/', index);