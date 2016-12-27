# Ejercicio 3
>Provisionar un contenedor LXC usando Ansible o alguna otra herramienta de configuración que ya se haya usado

Para ello es necesario instalar el [plugin de Vagrant para lxc](https://github.com/fgrehm/vagrant-lxc) con el siguiente comando, es necesario ejecutarlo con permisos de superusuario para poder ejecutarlo más tarde con permisos de superusuario (necesario para usar LXC)

```
sudo vagrant plugin install vagrant-lxc
```

Ahora ya podemos trabajar con vagrant como se hace en los ejercicios del tema [Orquestación de máquinas virtuales](https://github.com/AythaE/Ejercicios-CC16-17/tree/master/Orquestacion_de_maquinas_virtuales). Primero es necesario descargar un box que utilice como proveedor LXC como por ejemplo el siguiente

```
vagrant init fgrehm/trusty64-lxc
```

Para arrancar la máquina basta con ejecutar el comando

```
sudo vagrant up --provider=lxc
```

Desde el directorio donde se ejecutó el `vagrant init` previamente. Esto arranca el contenedor pero debido a las peculiaridades de la instalación de LXC en Debian no he sido capaz de asignarle interfaz de red virtual puente a los contenedores LXC por lo que el acceso por ssh a estos o su provisionamiento se hacen imposibles.
