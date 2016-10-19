//Crea una calificacion, la imprime, posteriormente la guarda en la base de datos y acaba recuperando todas las calificaciones de esa empresa
//@Ref https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
var Empresa = require('./Empresa.js');
var Calificacion = require('./Calificacion.js');

Empresa.findOne({ _id: 'Apple' }, function (err, empresa) {
  if (err) {
    console.error(err);
  }
  if (empresa) {
    console.log("Empresa recuperada: "+empresa.toString());

    var calificacion = new Calificacion({
      empresa: empresa._id,
      valoracion: 10,
      estudiante: 'Roberto Guzmán'});

    console.log(calificacion.toString());

    calificacion.save (function (err, empresa) {
      if (err) {
        return console.error(err);
      }
      console.log("Calificacion guardada correctamente");

      Calificacion.find(function (err, calificaciones) {
        if (err) {
          return console.error(err);
        }
        console.log("Calificaciones recuperadas: ");
        console.log(calificaciones.toString());
      });
    });
  }
});
