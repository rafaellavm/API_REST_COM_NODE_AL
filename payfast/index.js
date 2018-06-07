var app = require('./config/custom-express')();

app.listen(4800, function(){
  console.log('Servidor rodando na porta 4800.');
});
