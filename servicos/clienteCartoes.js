let restify = require('restify');
let clients = require('restify-clients');

//pegar a url do cliente. Criando um cliente
let cliente = clients .createJsonClient({
  url:'http://localhost:3001',
  version: '~1.0'
});

cliente.post('/cartoes/autoriza',
  function(erro, req, res, retorno) {
      console.log('consumindo serviço de cartoes');
      console.log(retorno);
  }
)