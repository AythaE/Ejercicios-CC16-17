#!/bin/sh

cd "/home/ubuntu/project/Practica_2/Programacion OO con persistencia de entidades/"

find -name "*.java" > .paths
mkdir -p WebContent/WEB-INF/classes/

find WebContent/WEB-INF/lib/ -name "*.jar"| tr '\n' ':' >.libs



if [ -n $(find src/ -name "persistence.xml") ]; then
  mkdir WebContent/WEB-INF/classes/META-INF
  cp $(find src/ -name "persistence.xml") WebContent/WEB-INF/classes/META-INF
fi

javac -d "WebContent/WEB-INF/classes/" -cp @.libs @.paths
rm .paths .libs
cd WebContent
jar cvf project.war .
