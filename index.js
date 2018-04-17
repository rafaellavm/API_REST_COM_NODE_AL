var express = require('express');
var app = express();

app.listen(4800,function(){
    console.log('Servidor rodando na porta 4800');
});

app.get('/teste',function(req,res){
   
   console.log('Recebida requisição de teste na porta 4800');
    //dando uma reposta para página
    res.send('OK');
});