let restify = require('restify');
let clients = require('restify-clients');

//funçao construtora
function CartoesClient() {

  //pegar a url do cliente. Criando um cliente
  this._cliente = clients.createJsonClient({
    url: 'http://localhost:3001'//,
    //version: '*'
  });
}

CartoesClient.prototype.autoriza = function (cartao, callback) {
    this._cliente.post('/cartoes/autoriza', cartao, callback);
    };

    module.exports = function() {
      return CartoesClient;
    };