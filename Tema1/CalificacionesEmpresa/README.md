#Ejercicios del tema 1
[![Build Status](https://travis-ci.org/AythaE/Ejercicios-CC16-17.svg?branch=master)](https://travis-ci.org/AythaE/Ejercicios-CC16-17)

Se puede encontrar la descripcion de ejercicios en el siguiente [enlace](http://jj.github.io/CC/documentos/temas/Desarrollo_basado_en_pruebas).

##Dependencias
Para ejecutar este proyecto es necesario instalar MongoDB, para hacerlo en sistemas Debian se puede emplear el comando:
~~~~~~
	sudo apt-get install mongodb
~~~~~~

Ademas requiere tener instalado Node.js lo que se puede hacer con:
~~~~~~
	sudo apt-get install nodejs
~~~~~~

Tras esto es necesario instalar algunos modulos de NodeJS, ver [package.json](https://github.com/AythaE/Ejercicios-CC16-17/blob/master/Tema1/CalificacionesEmpresa/package.json) para saber cuales son estos módulos. Para ello basta con ejecutar:

~~~~~~
	npm install
~~~~~~

##Descripción de ficheros principales
- `docs/` Contiene la documentacion de los scripts en html generada por [Grunt](http://gruntjs.com/) usando su plugin [Grunt-Docco](https://www.npmjs.com/package/grunt-docco).

- `test/` Contiene los test unitarios usando aserciones y los que emplean [Mocha](http://mochajs.org/).

- `Empresa.js` Contiene la definición del objeto empresa y lo exporta para que pueda ser usado desde los demas.

- `Calificación.js` Contiene la definición del objeto calificación y lo exporta para que pueda ser usado desde los demas.

- `Main.js` Script principal que permite manejar los objetos Calificación y Empresa.

- `PopulateDB.js` Script que rellena la base de datos con un conjunto de datos usados a modo de prueba.

- `db.js` Script encargado de establecer la conexion con la base de datos [MongoDB](https://www.mongodb.com/) usando [Mongoose](http://mongoosejs.com/).

- `test_*.js` Test elaborados para comprobar si los scripts principales se comportan como deberian manejando la base de datos.