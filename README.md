# Descripción
````
Aplicación MEAN (Mongo, Express, Angular y Node) de registro de médicos y hospitales. 
Proyecto final del curso: 1570 Desarrollo de aplicaciones con tecnología web
````

# Instrucciones
Realizar los siguientes pasos antes de crear las imagenes de docker
```
1 - Clonar el proyecto
```
```
2 - Reconstruir las dependencias mediante npm install en las carpetas
angular-client y express-server
```
```
3 - Definir las variables de entorno
en un archivo .env situado en /express-server/
Contenido de .env:
* PORT=3000
* DB_CNN=Conexion a base de datos
* JWT_KEY=clave para generar tokens (generar de manera random)
* GOOGLE_ID=Clave del proyecto de Google para consumir sus Apis (Google Cloud)
```
```
4 - En express-server/uploads crear las carpetas users, hospitals y doctors
para la carga de imagenes
/express-server/uploads/users
/express-server/uploads/doctors
/express-server/uploads/hospitals
```
```
5 - Crear las imagenes por separado o mediante el docker compose
  Método 1 - Por separado:
    En angular-client/
      docker build -t joelgrod/mean-docker-angular .
    En express-server/
      docker build -t joelgrod/mean-docker-angular .
  Método 2 - Usando docker-compose (archivo.yml ya creado):
    En la carpeta principal del proyecto: 
      docker-compose up --build
    Esto generará las imagenes y desplegará el proyecto en local
```
A partir de aquí guardar las imagenes en docker hub y desplegarlas
en el servidor mediante un docker-compose.yml con el siguiente contenido:
```
version: '3.8' 
services:
  angular: # name of the first service
    image: user-docker-hub/mean-docker-angular
    ports:
      - "4200:4200" # specify port forewarding

  express: #name of the second service
    image: user-docker-hub/mean-docker-express
    ports:
      - "3000:3000" #specify ports forewarding
```
En caso de querer aplicar permanencia de imagenes crear los volumenes
en el archivo anterior para express.
