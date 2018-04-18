
//fica disponível pra ser utilizado (module.exports)
module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {

        console.log('Recebida requisição de teste na porta 4800');
        //dando uma reposta para página
        res.send('OK');
    });

    //receber os dados para criar o pagamento
    app.post('/pagamentos/pagamento', function (req,res) {

       //o pagamento é recebido pelo body
       var pagamento =  req.body;
       console.log('processando a requisicao de um novo pagamento');

       pagamento.status = 'CRIADO';
       pagamento.data = new Date();

       res.send(pagamento);
    });
}

