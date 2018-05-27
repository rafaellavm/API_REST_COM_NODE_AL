//fica disponível pra ser utilizado (module.exports)
module.exports = function (app) {
    app.get('/pagamentos', function (req, res) {

        console.log('Recebida requisição de teste na porta 4800');
        //dando uma reposta para página
        res.send('OK');
    });

    app.put('/pagamentos/pagamento/:id', function (req, res) {

        var pagamento = {};

        var id = req.params.id; //id que vem da url

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDAO = new app.persistencia.PagamentoDao(connection);

        pagamentoDAO.atualiza(pagamento, function (erro) {

            if (erro) {
                res.status(500).send(erro);
                return;
            }

            res.send(pagamento);
        });
    });

    app.delete('/pagamentos/pagamento/:id', function (req, res) {

        var pagamento = {};
        var id = req.params.id;

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, function (erro) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log('pagamento cancelado');
            res.status(204).send(pagamento);
        });

    });

    //receber os dados para criar o pagamento
    app.post('/pagamentos/pagamento', function (req, res) {

        //validação do json
        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatório").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório e deve ser um decimal").notEmpty().isFloat();
        var erros = req.validationErrors();

        if (erros) {
            console.log("Erros de validação encontrados");
            res.status(400).send(erros);
            return;
        }

        //o pagamento é recebido pelo body
        var pagamento = req.body['pagamento'];
        console.log('processando a requisicao de um novo pagamento');

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        var connection = app.persistencia.connectionFactory(); //caminho do arquivo do connectionFactory, é invocada através do app. Aqui é instanciada a conexão com o banco
        var pagamentoDAO = new app.persistencia.PagamentoDao(connection); //Criando uma nova instância do pagamentodao. Caminho do arquivo do PagamentoDao, é invocada através do app

        pagamentoDAO.salva(pagamento, function (erro, resultado) {

            if (erro) {

                console.log('Erro ao inserir no banco:', erro);
                res.status(500).send(erro); //erro interno do servidor

            } else {

                pagamento.id = resultado.insertId; //guarda o id salvo

                //verifica se no json do pagamento tem o cartão
                if (pagamento.forma_de_pagamento = 'cartao') {

                    var cartao = req.body['cartao'];
                    
                    var clienteCartoes = new app.servicos.clienteCartoes;
                    clienteCartoes.autoriza(cartao, function (exception, request, response, retorno) {
                        
                        console.log(retorno);

                        res.status(201).json(retorno); //status 201 = created
                        return;

                    });


                } else {

                    res.location('/pagamentos/pagamento/' + pagamento.id); //retorna o id do registro criado

                    var response = {
                        dados_do_pagamento: pagamento,
                        links: [{
                                href: "http://localhost:4800/pagamentos/pagamento/" + pagamento.id,
                                rel: "confirmar",
                                method: "PUT"
                            },
                            {
                                href: "http://localhost:4800/pagamentos/pagamento/" + pagamento.id,
                                rel: "cancelar",
                                method: "DELETE"
                            }
                        ]

                    };

                    console.log('Pagamento criado');

                    res.status(201).json(response); //status 201 = created
                }

            }
        });

    });

}