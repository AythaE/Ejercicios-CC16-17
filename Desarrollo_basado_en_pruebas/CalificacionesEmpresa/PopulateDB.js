//Script que se encarga de crear 3 empresas para guardarlas en la base de datos y tras esto crea 6 calificaciones de alumnos para estas empresas
const Empresa = require('./Empresa.js');
const Calificacion = require('./Calificacion.js');

var empresas = new Array(3);

empresas[0] = new Empresa({ _id: 'Apple', ciudad:'Cupertino', pais:'EEUU' });
empresas[1] = new Empresa({ _id: 'Google', ciudad:'Mountain View', pais:'EEUU' });
empresas[2] = new Empresa({ _id: 'Microsoft', ciudad:'Redmond', pais:'EEUU' });

empresas.forEach(function (e) {
  e.save (function (err, empresa) {
    if (err) {
      return console.error(err);
    }
  });
});

var calificaciones = new Array(6);

calificaciones[0] = new Calificacion({
  empresa: empresas[0]._id,
  valoracion: 8.76,
  estudiante: 'Roberto Guzmán'});

calificaciones[1] = new Calificacion({
  empresa: empresas[0]._id,
  valoracion: 6.32,
  estudiante: 'Juan Pérez'});

calificaciones[2] = new Calificacion({
  empresa: empresas[1]._id,
  valoracion: 9.2,
  estudiante: 'Roberto Guzmán'});

calificaciones[3] = new Calificacion({
  empresa: empresas[1]._id,
  valoracion: 7.75,
  estudiante: 'Juan Pérez'});

calificaciones[4] = new Calificacion({
  empresa: empresas[2]._id,
  valoracion: 4.45,
  estudiante: 'Roberto Guzmán'});

calificaciones[5] = new Calificacion({
  empresa: empresas[2]._id,
  valoracion: 6.7,
  estudiante: 'Juan Pérez'});

calificaciones.forEach(function (c) {
  c.save (function (err, calificacion) {
    if (err) {
      return console.error(err);
    }
  });
});
