var mysql = require('mysql');

function createDBConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rafa123',
    port: '3306',
    database: 'payfast',
    insecureAuth : true
  });
}

module.exports = function () {
  return createDBConnection;
}


/*var sql = require("mssql");

var config = {
  user: 'IBGE\rafaela.m.allen',
  password: '',
  server: '((LocalDB)\MSSQLLocalDB)',
  database: 'Payfast',
  port: '1433'
};

//var connection = new sql.Connection(config);

function createDBConnection() {

  return sql.connect(config, function(err) {
    console.log(err);
  });
}

module.exports = function () {
  return createDBConnection;
}*/


