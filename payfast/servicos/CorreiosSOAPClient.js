var soap = require('soap');

function CorreiosSOAPClient() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

module.exports = function () {
    return CorreiosSOAPClient;
}

CorreiosSOAPClient.prototype.calculaPrazo = function (args, callback) {
    console.log('entrou')
    soap.createClient(this._url, function (erro, cliente) {

        console.log('Cliente soap criado');

        //args: vem do método dentro do correios.js
        cliente.CalcPrazo(args, callback);

    });
}