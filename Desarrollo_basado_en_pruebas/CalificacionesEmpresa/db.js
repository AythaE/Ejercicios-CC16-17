//Script para conectarse a la base de datos
//@Ref http://mongoosejs.com/docs/promises.html
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calificacion_empresadb');
mongoose.Promise = global.Promise;
