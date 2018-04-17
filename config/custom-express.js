//arquivo específico pra escrever códigos do express

var express = require('express');
var consign = require('consign');

//retorna uma instancia do express
module.exports = function(){
    var app = express();

    consign()
    .include('controllers') //passa tudo de controller pro index, assim pode ser invocada a rota de pagamento
    .into(app);

    return app;
}