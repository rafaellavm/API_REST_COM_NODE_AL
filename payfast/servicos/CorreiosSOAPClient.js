var soap = require('soap');

soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl', function (erro, cliente) {

    console.log('Cliente soap criado');

    var envio = {
        'nCdServico': '40010',
        'sCepOrigem': '24020075',
        'sCepDestino': '24060010'
    }; 

    cliente.CalcPrazo(envio, function (err, resultado) {
        console.log(JSON.stringify(resultado));
    });

});