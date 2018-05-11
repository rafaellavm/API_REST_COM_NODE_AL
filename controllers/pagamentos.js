
//fica disponível pra ser utilizado (module.exports)
module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {

        console.log('Recebida requisição de teste na porta 4800');
        //dando uma reposta para página
        res.send('OK');
    });

    //receber os dados para criar o pagamento
    app.post('/pagamentos/pagamento', function (req, res) {

        //validação do json
        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();
        var erros = req.validationErrors();

        if(erros){
            console.log("Erros de validação encontrados");
            res.status(400).send(erros);
            return;
        }

        //o pagamento é recebido pelo body
        var pagamento = req.body;
        console.log('processando a requisicao de um novo pagamento');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        var connection = app.persistencia.connectionFactory(); //caminho do arquivo do connectionFactory, é invocada através do app. Aqui é instanciada a conexão com o banco
        var pagamentoDAO = new app.persistencia.PagamentoDao(connection); //Criando uma nova instância do pagamentodao. Caminho do arquivo do PagamentoDao, é invocada através do app

        pagamentoDAO.salva(pagamento, function (erro, resultado) {

            if (erro) {
                console.log('Erro ao inserir no banco:', erro);
                res.status(400).send(erro);
            } else {
                console.log('Pagamento criado');
                res.json(pagamento)
            }
        });

    });
}

