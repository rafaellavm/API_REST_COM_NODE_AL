//arquivo específico pra escrever códigos do express
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

//retorna uma instancia do express
module.exports = function(){
    var app = express();

    app.use(bodyParser.urlencoded({extended: true})); //
    app.use(bodyParser.json()); //faz parser de json

    consign()
    .include('controllers') //a pasta controller deve ser carregada dentro da variável 'app' assim que subir 
    .into(app);

    return app;
}