#Ejercicio 2
>Crear una receta para instalar [nginx](http://nginx.org/), tu editor favorito y algún directorio y fichero que uses de forma habitual.

>Ver [tutorial](http://www.mechanicalfish.net/configure-a-server-with-chef-solo-in-five-minutes/)

Continuando con la maquina virtual en la que se ha instalado chef en el [ejercicio 1](https://github.com/AythaE/Ejercicios-CC16-17/blob/master/Gestion_de_configuraciones/Ejercicio1.md). Usare [`chef-solo`](https://docs.chef.io/chef_solo.html), una versión más simple de chef que ejecuta chef-client en modo local sin necesidad de tener un chef-server. Creo el directorio para la "receta" de nginx con `mkdir -p ~/chef/cookbooks/nginx/recipes` y la dicha receta mediante:
```
$ echo "
package 'nginx'
" > ~/chef/cookbooks/nginx/recipes/default.rb
```

Hago lo mismo con un editor, en este caso emacs
```
$ mkdir -p ~/chef/cookbooks/emacs/recipes

$ echo "
package 'emacs'
" > ~/chef/cookbooks/emacs/recipes/default.rb
```

Y con un directorio y ficheros que usare para intercambio de archivos por sftp
```
$ mkdir -p ~/chef/cookbooks/sftp/recipes
$ echo "
directory '/home/ubuntu/sftp'
file \"/home/ubuntu/sftp/README.txt\" do
  owner \"ubuntu\"
  group \"ubuntu\"
  mode 00544
  action :create
  content \"Directorio para intercambio de archivos usando sftp\"
end
" > ~/chef/cookbooks/sftp/recipes/default.rb
```

Tras crear todas las recetas es necesario indicarle a chef que es lo que tiene que configurar, un "run list" mediante el fichero `node.json`
```
$ echo '
{
  "run_list": [ "recipe[nginx]", "recipe[emacs]", "recipe[sftp]" ]
}' > ~/chef/node.json
```

Por último crearé un fichero `solo.rb` para decirle a chef-solo donde encontrar las recetas, el fichero `node.json` y directorio de chef
```
$ echo '
  file_cache_path "/home/ubuntu/chef"
  cookbook_path "/home/ubuntu/chef/cookbooks"
  json_attribs "/home/ubuntu/chef/node.json"
' > ~/chef/solo.rb
```

Es necesario indicar las rutas absolutas en el fichero anterior, he comprobado que indicando las rutas con `~/chef` el comando chef-solo tiene problemas para leer los ficheros. Por ello sera necesario cambiar el nombre de dicha ruta en funcion del directorio del usuario desde el que se esté ejecutando.

Una vez está todos los ficheros creados para ejecutar chef-solo basta con emplear el comando `sudo chef-solo -c ~/chef/solo.rb` lo que da como resultado:

![Imagen](https://raw.githubusercontent.com/AythaE/Ejercicios-CC16-17/master/Gestion_de_configuraciones/imagenes/Ejercicio%202.png)

Puede encontrar los ficheros creados durante este ejercicio en el siguiente [enlace](https://github.com/AythaE/Ejercicios-CC16-17/tree/master/Gestion_de_configuraciones/chef)