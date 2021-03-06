//Crea una empresa, la imprime, posteriormente la guarda en la base de datos y acaba recuperando todas las empresas de esta
//@Ref https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
var Empresa = require('./Empresa.js');
var empresa = new Empresa({ _id: 'Apple', ciudad:'Cupertino', pais:'EEUU' });

console.log(empresa.toString());



empresa.save (function (err, empresa) {
  if (err) {
    return console.error(err);
  }
  console.log("Empresa guardada correctamente");
  Empresa.find(function (err, empresas) {
    if (err) {
      return console.error(err);
    }
    console.log("Empresas recuperadas: ");
    console.log(empresas.toString());
  });
});
