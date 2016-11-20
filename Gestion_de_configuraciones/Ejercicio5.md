#Ejercicio 5
>Desplegar los fuentes de una aplicación cualquiera, propia o libre, que se encuentre en un servidor git público en la máquina virtual Azure (o una máquina virtual local) usando [ansible](http://docs.ansible.com/index.html).
>
>Ver [tutorial](http://www.mechanicalfish.net/start-learning-ansible-with-one-line-and-no-files/)

Primero instalaré ansible, para ello hay que instalar sus dependencias en el ordenador desde el que queramos aprovisionar al servidor. Para instalar las dependencias hay que ejecutar `sudo apt-get install python build-essential software-properties-common python-pip libssl-dev libffi-dev python-dev`, tras esto hay que instalar algunos modulos de python usando el recien instalado `pip`, en concreto hay que ejecutar el comando `sudo pip install paramiko PyYAML Jinja2 httplib2 six nose passlib pycrypto cryptography ansible` como se puede ver con este último módulo instalamos ansible. En caso de problemas al instalar el módulo `cryptography` se puede arreglar actualizando una de sus dependencias que da problemas, esto se hace con el comando `pip install --upgrade cffi` (problema detectado en Debian 8.6).

Ahora que ya está instalado ansible podemos proceder a usarlo. Como servidor a aprovisonar he lanzado una instancia [EC2 de AWS](https://aws.amazon.com/es/) con una imagen de Ubuntu Server 16.04 LTS con el comando `aws ec2 run-instances --image-id ami-0d77397e --security-group-ids sg-d72d9fb1 --count 1 --instance-type t2.micro --key-name CC-key`. Es necesario haber creado antes un grupo de seguridad y un par de claves para poder acceder a la instancia por ssh. Si se usa el comando `aws ec2 describe-instances` podemos ver una salida parecida a la siguiente:

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/Ejercicio5%20Aws%20instancia.png)

Hay que apuntar la IP pública de la instancia para conectarnos con ella (ya sea por ssh o usando ansible). En este caso es: 54.171.205.146

Usar ansible requiere que los servidores objetivo tengan instalado python 2.x, en el caso de la citada imagen de Ubuntu desplegada en AWS no lo tiene por defecto, por ello no queda otra que acceder por ssh a la maquina con `ssh -i [ruta al archivo .pem asociado a la clave con la que se haya lanzado la instancia] ubuntu@[IP Pública]` y hna vez hecho esto ejecutar `sudo apt-get install python`.

Para a empezar a usar ansible lo primero es crear un "inventario" que le diga a ansible cuales son las maquinas a las que conectarse, para eso creo un archivo [`hosts`](https://github.com/AythaE/Ejercicios-CC16-17/blob/master/Gestion_de_configuraciones/ansible/hosts) con el siguiente contenido:
```
[server]
54.171.205.146

```
Donde server es un nick que le doy a la dirección ip donde se encontrará el servidor. Podemos probar que esto funciona usando el módulo de ansible `setup` que da información sobre el sistema destino. En la siguiente imagen podemos ver el resultado de esta invocación.

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/ansible%20modulo%20setup.png)

Es necesario indicarle el nick que esta puesto en el archivo hosts, la ruta del mismo con `-i`, la ruta de la clave privada usada para conectarse con la máquina por ssh con `--key-file`, el usuario en el que conectarse en la máquina con `-u` y el nombre del módulo con `-m`

Para desplegar los fuentes de una aplicación elegire como aplicación un proyecto de la asignatura DSS que se encuentra en este [repositorio](https://github.com/AythaE/DSS16-17.git), en concreto la [práctica 2](https://github.com/AythaE/DSS16-17/tree/master/Practica_2). Para descargar los fuentes en ansible es necesario emplear el módulo [git](http://docs.ansible.com/ansible/git_module.html), por ello es necesario tener git instalado en la maquina remota. Antes de poder realizar estas tareas es necesario instalar `aptitude` y `python-apt`para usar el módulo [apt](http://docs.ansible.com/ansible/apt_module.html) de ansible que sirve para instalar paquetes, para ello ejecuto el siguiente comando:

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/ansible%20aptitude.png)

Una vez hemos cumplido con todas las dependencias previas ya podemos realizar todas las tareas necesarias para desplegar los fuentes del proyecto, para ello he creado un [playbook](https://github.com/AythaE/Ejercicios-CC16-17/blob/master/Gestion_de_configuraciones/ansible/playbookEj5.yml) como el siguiente:
```
---
# Este playbook clona un repositorio GitHub

- hosts: server
  remote_user: ubuntu
  become: yes
  become_method: sudo

  vars:
    repoLocation: /home/ubuntu/project/

  tasks:
    - name: apt-get update and upgrade
      apt: update_cache=yes upgrade=yes

    - name: install Git
      apt: pkg=git state=latest install_recommends=yes

    - name: clone the repository
      git: repo=https://github.com/AythaE/DSS16-17.git dest={{repoLocation}} accept_hostkey=yes force=yes
      become: no
```
Con esto clona el repositorio en `repoLocation` despues de actualizar los paquetes instalados e instalar git. En la siguiente imagen se puede ver el resultado de una ejecución exitosa:

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/playbookEj5.png)
