#Ejercicio 1
>Instalar [chef](https://www.chef.io/) en la máquina virtual que vayamos a usar

>Ver [tutorial](http://www.mechanicalfish.net/configure-a-server-with-chef-solo-in-five-minutes/)

Para ello primero nos conectamos con la máquina virtual mediante ssh, en mi caso usare una instancia EC2 de [AWS](https://aws.amazon.com/es/?nc2=h_lg) con imagen Ubuntu 16.04.1 LTS, tras desplegar una instancia y conectarme a ella siguiendo estas [indicaciones](https://aws.amazon.com/es/getting-started/tutorials/launch-a-virtual-machine/) actualizo los paquetes de la maquina virtual antes de continuar con los comandos: `sudo apt-get update && 
sudo apt-get upgrade`, tras esto instalo las dependencias de chef con el comando `sudo apt-get install -y ruby ruby2.3-dev build-essential wget libruby2.3 rubygems`

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/Ejercicio%201%20install%20dep.png)

A continuación instalare Chef como una gema, por ello actualizo las gemas con `sudo gem update --no-rdoc --no-ri` e instalo chef y [oahi](https://github.com/chef/ohai) con `sudo gem install ohai chef --no-rdoc --no-ri`

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/Ejercicio%201%20Install%20chef.png)

`