const Empresa = require('../Empresa');
const Calificacion = require('../Calificacion');
assert= require("assert");

var nueva_empresa = new Empresa({ _id: 'Apple', ciudad:'Cupertino', pais:'EEUU' });
assert(nueva_empresa, "Creada empresa");
assert.equal(nueva_empresa.toString(), "Apple (Cupertino, EEUU)", "Empresa.toString Fail");

var nueva_calificacion = new  Calificacion({
  empresa: nueva_empresa._id,
  valoracion: 10,
  estudiante: 'Roberto Guzmán'});

assert(nueva_calificacion, "Creada calificación");
assert.equal(nueva_calificacion.toString(), "Apple tiene una calificación de "+
  "10 hecha por Roberto Guzmán", "Calificacion.toString Fail");
console.log("Si has llegado aquí, han pasado todos los tests");
