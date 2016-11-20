#Ejercicio 6
>Desplegar la aplicación que se haya usado anteriormente con todos los módulos necesarios usando un playbook de [Ansible](http://docs.ansible.com/index.html).
>
>Ver [tutorial](http://www.mechanicalfish.net/start-learning-ansible-with-one-line-and-no-files/)

Siguiendo con la misma maquina virtual en AWS y entorno configurado del [ejercicio previo](https://github.com/AythaE/Ejercicios-CC16-17/blob/master/Gestion_de_configuraciones/Ejercicio5.md) voy a instalar los modulos necesarios para desplegar la [práctica 2 de la asignatura de DSS](https://github.com/AythaE/DSS16-17/tree/master/Practica_2), en concreto necesitaremos instalar Java en su version 1.8, un servidor de aplicaciones web Tomcat en su version 8, para ello añadiré los elementos necesarios al [playbook previo](https://github.com/AythaE/Ejercicios-CC16-17/blob/master/Gestion_de_configuraciones/ansible/playbookEj5.yml) creando el siguiente [playbook](https://github.com/AythaE/Ejercicios-CC16-17/blob/master/Gestion_de_configuraciones/ansible/playbookEj6.yml):
```
---
# This playbook deploys a simple standalone Tomcat 7 server.

- hosts: server
  remote_user: ubuntu
  become: yes
  become_method: sudo

  vars:
    repoLocation: /home/ubuntu/project/
    projectLocation: /home/ubuntu/project/Practica_2/Programacion\ OO\ con\ persistencia\ de\ entidades/
    scriptLocationLocal: /home/aythae/Escritorio/Cloud Computing/Ejercicios-CC16-17/Gestion_de_configuraciones/ansible/compileJavaProjectAndGenerateWar.sh
    scriptLocationRemote: /home/ubuntu/compileJavaProjectAndGenerateWar.sh
    tomcatWebAppLocation: /var/lib/tomcat8/webapps/


  tasks:

    - name: apt-get update and upgrade
      apt: update_cache=yes upgrade=yes

    - name: Install Java 1.8 JRE
      apt: pkg=openjdk-8-jre state=latest install_recommends=yes

    - name: Install java 1.8 JDK
      apt: pkg=openjdk-8-jdk state=latest install_recommends=yes

    - name: install tomcat8
      apt: pkg=tomcat8 state=latest install_recommends=yes

    - name: install Git
      apt: pkg=git state=latest install_recommends=yes

    - name: clone the repository
      git: repo=https://github.com/AythaE/DSS16-17.git dest={{repoLocation}} accept_hostkey=yes force=yes
      become: no

    - name: Upload the script for compiling project
      copy: src={{scriptLocationLocal}} dest=~/
      become: no

    - name: Correct script permissions
      file: dest={{scriptLocationRemote}} mode=0776
      become: no

    - name: compile java project
      shell: "{{ scriptLocationRemote }}"
      become: no

    - name: Mv .war to tomcat
      command: mv {{projectLocation}}WebContent/project.war {{tomcatWebAppLocation}}

    - name: Delete script
      command: rm {{scriptLocationRemote}}
      become: no

    - name: restart tomcat8
      service: name=tomcat8 state=restarted enabled=yes
```

Para ejecutarlo se emplea el comando `ansible-playbook -i hosts playbookEj6.yml --key-file=~/.ssh/awsAythae.pem`. En la siguiente imagen se puede ver el resultado.

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/Ejercicio6.png)