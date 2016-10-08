// Comprueba la conexión a la base de datos creada en MongoDB
//@Ref https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calificacion_empresadb');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conexion correcta');
  return;
});
