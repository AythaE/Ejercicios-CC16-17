#Ejercicio 2
>En la aplicación que se ha usado como ejemplo en el ejercicio anterior, ¿podría usar diferentes lenguajes? ¿Qué almacenes de datos serían los más convenientes?
>
>[Enlace al tema](http://jj.github.io/CC/documentos/temas/Arquitecturas_para_la_nube)

La aplicación [Demos](https://github.com/AythaE/Demos_Documentation) utiliza en su paquete Firma [OpenCV](http://opencv.org/) para el tratamiento de imagenes usando un wrapper en Java, pero esta librería está escrita originalmente el C\++ y la cantidad de documentación disponible en este lenguaje es mucho mayor. Ademas tambien emplea la librería [Tesseract-OCR](https://github.com/tesseract-ocr/tesseract) para el reconocimiento óptico de caracteres que tambien está escrita en C\++.

El cliente Android está escrito en Java, que es lo indicado para esta plataforma. Ademas emplea un servlet desplegado en un servidor Tomcat que también esta escrito en Java.

Respecto a los almacenes de datos, teniendo en cuenta que se almacenan campañas de firmas y firmas de estas que tienen diversos atributos como imagenes, atributos numéricos, fechas, strings... y que las recuperaciones son escasas. Lo interesante sería emplear bases de datos NoSQL basadas en documentos que permitieran la recuperacion de instancias de objetos directamente y facilitaran el cambio de atributos en caso de ser necesario al no ser tipadas y basarse en ficheros JSON, esto ultimo tambien serviría para reducir el tamaño de la base de datos en disco.