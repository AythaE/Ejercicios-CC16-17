//Crea objeto Empresa a partir de su Schema
//@Ref http://mongoosejs.com/docs/index.html
var mongoose = require('mongoose');
var db = require('./db'); //Establece la conexion con la base de datos


var empresaSchema = new mongoose.Schema({
  _id: String,
  ciudad: String,
  pais: String
});

empresaSchema.methods.toString = function () {
  return this._id + " ("+this.ciudad+", "+this.pais+")";
}


module.exports = mongoose.model('Empresa', empresaSchema);
