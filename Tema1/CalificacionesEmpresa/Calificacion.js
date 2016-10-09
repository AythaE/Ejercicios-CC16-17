//Crea objeto Calificacion a partir de su Schema
//@Ref http://mongoosejs.com/docs/guide.html#indexes
//@Ref http://mongoosejs.com/docs/populate.html
var mongoose = require ('mongoose');
var Empresa =  require('./Empresa.js');

var calificacionSchema = new mongoose.Schema({
  empresa: { type: String, ref: 'Empresa' },
  valoracion: { type: Number, min: 0, max: 10},
  estudiante: String
});

calificacionSchema.index({ empresa: 1, estudiante: 1 }, { unique: true });

calificacionSchema.methods.toString = function () {
  return this.empresa + " tiene una calificación de "+this.valoracion+" hecha por "+ this.estudiante;
}


module.exports = mongoose.model('Calificacion', calificacionSchema);
