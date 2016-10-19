//Programa principal que permite manejar la base de datos
//@Ref http://javabeat.net/nodejs-mongodb/
const readline = require('readline');
const db = require('./db.js');
const Empresa = require('./Empresa.js');
const Calificacion = require('./Calificacion.js');

const rl = readline.createInterface ({
  input: process.stdin,
  output: process.stdout
});

var addEmpresa = function () {
  console.log("\nCrear empresa");
  rl.question("Introduzca el nombre de la empresa: ", function (empresaName) {
    Empresa.find({ _id: empresaName }, function (err, empresa) {
      if (err) {
        return console.error(err);
      }
      if (empresa.length > 0) {
        console.log("Esa empresa ya existe en la base de datos\n\n");
        printMenu();
      }
      rl.question("Introduzca la ciudad de la empresa: ", function (empresaCity) {
        rl.question("Introduzca el pais de la empresa: ", function (empresaCountry) {
          var nuevaEmpresa = new Empresa({
            _id: empresaName,
            ciudad: empresaCity,
            pais: empresaCountry });
          nuevaEmpresa.save (function (err, empresa) {
            if (err) {
              return console.error(err);
            }
            console.log("Empresa guardada correctamente\n\n");
            printMenu();
          });

        });
      });
    });
  });
}

var listCalificaciones = function () {
  console.log("\nListar calificaciones de una empresa");
  rl.question("Introduzca el nombre de la empresa: ", function (empresaName) {
    Empresa.find({ _id: empresaName }, function (err, empresa) {
      if (err) {
        return console.error(err);
      }
      if (!(empresa.length > 0)) {
        console.log("Esa empresa NO existe en la base de datos\n\n");
        printMenu();

      }
      else {
        Calificacion.find ({ empresa: empresa[0]._id }, function (err, calificaciones) {
          if (err) {
            return console.error(err);
          }
          if (calificaciones.length == 0) {
            console.log("Esa empresa no tiene calificaciones en la base de datos\n\n");
            printMenu();
          }
          else {
            console.log();
            calificaciones.forEach(function (calif) {
              console.log(calif.toString());
            });
            printMenu();
          }

        });
      }
    });
  });
}

var addCalificacion = function () {
  console.log("\nCrear calificación");
  rl.question("Introduzca el nombre de la empresa: ", function (empresaName) {
    Empresa.find({ _id: empresaName }, function (err, empresaRecuperada) {
      if (err) {
        return console.error(err);
      }
      if (!(empresaRecuperada.length > 0)) {
        console.log("Esa empresa NO existe en la base de datos\n\n");
        printMenu();
      }
      rl.question("Introduzca el nombre del estudiante que hará la calificación: ",
        function (estudianteName) {
          Calificacion.find({ empresa: empresaRecuperada[0]._id, estudiante: estudianteName},
            function (err, calificaciones) {
              if (err) {
                return console.error(err);
              }
              if (calificaciones.length > 0) {
                console.log("El estudiante "+estudianteName+" ya ha calificado a la "+
                "empresa "+empresaName);
                printMenu();
              }
              else {
                rl.question("Introduzca la calificación numérica dada a esta empresa "+
                "(entre 0 y 10): ", function (valoracion) {
                  var nuevaCalificacion = new Calificacion({
                    empresa: empresaName,
                    valoracion: valoracion,
                    estudiante: estudianteName});
                  nuevaCalificacion.save(function (err, empresa) {
                    if (err) {
                      return console.error(err);
                    }
                    console.log("Calificacion guardada correctamente");
                    printMenu();
                  });
                });

              }

            });
      });
    });
  });
}

var deleteCalificacion = function () {
  console.log("\nBorrar calificación");
  rl.question("Introduzca el nombre de la empresa calificada: ", function (empresaName) {
  Empresa.find({ _id: empresaName }, function (err, empresa) {
    if (err) {
      return console.error(err);
    }
    if (!(empresa.length > 0)) {
      console.log("Esa empresa NO existe en la base de datos\n\n");
      printMenu();
    }
    rl.question("Introduzca el nombre del estudiante que hizo la calificación: ",
      function (estudianteName) {
        Calificacion.find({ empresa: empresa[0]._id, estudiante: estudianteName},
          function (err, calificaciones) {
            if (err) {
              return console.error(err);
            }
            if (calificaciones.length == 0) {
              console.log("El estudiante "+estudianteName+" NO ha calificado a la "+
              "empresa "+empresaName);
              printMenu();

            }
            else {
              calificaciones.forEach(function (calif) {
                calif.remove();
              });
              console.log("Calificación borrada correctamente");
              printMenu();
            }
          }
        );
      });

    });
  });
}

var rankingEmpresas = function () {
    console.log("\nRanking de empresas por calificación");

    Calificacion.find(function (err, calificaciones) {
      if (err) {
        return console.error(err);
      }
      if (calificaciones.length == 0) {
        console.log("No existen calificaciones en la base de datos");
      }
      else {
        Empresa.find(function (err, empresas) {
          if (err) {
            return console.error(err);
          }
          if (empresas.length !=0) {
            var ranking = new Array (empresas.length);
            for (var i = 0; i < ranking.length; i++) {
              ranking[i] = new Array(2);
            }
            var i=0;
            empresas.forEach(function (emp) {
              var numCalif = 0
              var mediaCalif=0;
              ranking[i][0] = emp._id;
              calificaciones.forEach(function (cal) {
                if (cal.empresa == emp._id) {
                  numCalif++;
                  mediaCalif+=cal.valoracion;
                }
              });

              ranking[i][1] = mediaCalif/numCalif;
              i++;
            });
            ranking.sort(function (a,b) {
              return b[1] - a[1];
            });

            for (var i = 0; i < ranking.length; i++) {
              console.log((i+1)+ "º "+ ranking[i][0]+"\tValoración: "+ranking[i][1]);

            }
            printMenu();
          }

        });
      }

    });
}

var printMenu = function () {
  console.log("\n\nCRUD CalificacionesEmpresa");
  console.log("\t1) Crear empresa");
  console.log("\t2) Listar calificaciones de una empresa");
  console.log("\t3) Crear calificación");
  console.log("\t4) Borrar calificación");
  console.log("\t5) Ranking de empresas por calificación\n");
  console.log("\t6) Salir\n\n");

  rl.question('Seleccione una opción: ', function (option) {
    console.log("\nOpcion seleccionada: "+option);
    switch (option) {
      case "1":
        addEmpresa();
        break;
      case "2":
        listCalificaciones();
        break;
      case "3":
        addCalificacion();
        break;
      case "4":
        deleteCalificacion();
        break;
      case "5":
        rankingEmpresas();
        break;
      case "6":
        rl.close();
        console.log("Pulse Ctrl+C para salir del programa");

        break;
      default:
        console.log("Opcion incorrecta\n\n");
        printMenu();
    }


  });
}

printMenu();
