
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

       var connection = app.persistencia.connectionFactory(); //caminho do arquivo do connectionFactory, é invocada através do app. Aqui é instanciada a conexão com o banco
       var pagamentoDAO = new app.persistencia.PagamentoDao(connection); //Criando uma nova instância do pagamentodao. Caminho do arquivo do PagamentoDao, é invocada através do app

       pagamentoDAO.salva(pagamento, function(erro,resultado){

        if(erro){
            res.send(erro);
        }else{
           console.log('Pagamento criado');
           res.json(pagamento)
        }
       });

    });
}

