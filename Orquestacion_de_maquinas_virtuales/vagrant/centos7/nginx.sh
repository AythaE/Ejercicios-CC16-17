#!/usr/bin/env bash
#Referencia: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-centos-7

#Reference: https://danielgibbs.co.uk/2015/05/delta-rpms-disabled/
#Instala deltarpm para descargar solo las diferencias de los paquetes a actualizar reduciendo el tamaño considerablemente
sudo yum install deltarpm -y > /dev/null

sudo yum update -y > /dev/null

#Instalar repositorio nginx
sudo yum install epel-release -y > /dev/null

sudo yum install nginx -y > /dev/null

sudo systemctl enable nginx > /dev/null

sudo systemctl restart nginx > /dev/null
