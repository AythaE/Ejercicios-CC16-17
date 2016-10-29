#Ejercicio 1
>Buscar una aplicación de ejemplo, preferiblemente propia, y deducir qué patrón es el que usa. ¿Qué habría que hacer para evolucionar a un patrón tipo microservicios?
>
>[Enlace al tema](http://jj.github.io/CC/documentos/temas/Arquitecturas_para_la_nube)

He elegido la aplicación [Demos](https://github.com/AythaE/Demos_Documentation), se podria clasificar como un sistema distribuido que sigue un modelo cliente- servidor y emplea la API [JAX-RS](https://jax-rs-spec.java.net/) ofrecida por Java para comunicaciones de tipo REST.

Dentro de las arquitecturas software estudiadas se clasificaría como una arquitectura de capas basada en el patrón MVC con 3 capas principales (las correspondientes al MVC) y una auxiliar formada por librerías y componentes de terceros utilizados para la comunicación, formateo de datos o procesamiento de imagenes. En la siguiente imagen se aprecia la separación en capas que se menciona.

![alt text](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Arquitecturas_para_la_nube/Arquitectura%20Demos.jpg "Arquitectura Demos")

Para evolucionar a un patron basado en microservicios habría que ir descomponiendo la arquitectura de la aplicación para desplegarla como servicios independientes. Una descomposición inicial factible sería a nivel de funcionalidad, separando en los paquetes Campaña y Firma y desplegandolos como servicios independientes, cada uno con su DataSource.

Habria que tener cuidado con los elementos que usan objetos de ambos paquetes como aquellos que se encuentran en componentes o en utilidades y desplegarlos junto a estos servicios o incluso en caso de existir mucha replicación se podría crear otro microservicio auxiliar que usaran Campaña y Firma.