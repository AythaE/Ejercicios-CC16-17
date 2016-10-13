const assert = require('assert');
const mongoose = require('mongoose');
const db = require('../db');
const Empresa = require('../Empresa');
const Calificacion = require('../Calificacion');

describe('Mongoose', function () {
  //Comprueba si se ha cargado la librería que maneja la base de datos
  describe('Carga Mongoose', function () {
    it('Debe de estar cargada', function () {
      assert(mongoose, "Cargado Mongoose");
    });
  });
});

describe('Base de datos', function () {
  //Comprueba si se ha cargado la librería que se conecta a la base de datos
  describe('Conexion DB', function () {
    it('Debe de estar conectada', function () {
      assert(db, "Cargado DB");
    });
  });
});

var nueva_empresa;
describe('Empresa', function () {
  //Comprueba si se ha cargado la librería
  describe('Carga Empresa', function () {
    it('Debe de estar cargada', function () {
      assert(Empresa, "Cargado Empresa");
    });
  });

  //Comprueba si crea empresas correctamente
  describe('Crea Empresa', function () {
    it('Debe de crear empresas correctamente', function () {
      nueva_empresa = new Empresa({ _id: 'Apple', ciudad:'Cupertino', pais:'EEUU' });
      assert(nueva_empresa, "Creada empresa");
      assert.equal(nueva_empresa.toString(), "Apple (Cupertino, EEUU)", "Empresa.toString Fail");

    });
  });
});

describe('Calificacion', function () {
  //Comprueba si se ha cargado la librería
  describe('Carga Calificacion', function () {
    it('Debe de estar cargada', function () {
      assert(Calificacion, "Cargado Calificacion");
    });
  });

  //Comprueba si crea calificaciones correctamente
  describe('Crea Calificaciones', function () {
    it('Debe de crear Calificaciones correctamente', function () {
      var nueva_calificacion = new  Calificacion({
        empresa: nueva_empresa._id,
        valoracion: 10,
        estudiante: 'Roberto Guzmán'});

      assert(nueva_calificacion, "Creada calificación");
      assert.equal(nueva_calificacion.toString(), "Apple tiene una calificación de "+
        "10 hecha por Roberto Guzmán", "Calificacion.toString Fail");
    });
  });
});
