# Descripción
````
Aplicación MEAN (Mongo, Express, Angular y Node) de registro de médicos y hospitales. 
Proyecto final del curso: 1570 Desarrollo de aplicaciones con tecnología web
````

# Instrucciones
Al clonar el repositorio en el servidor se debe:
```
1 - Definir las variables de entorno
en un archivo .env situado en /express-server/
Contenido de .env:
* PORT=3000
* DB_CNN=Conexion a base de datos
* JWT_KEY=clave para generar tokens (generar de manera random)
* GOOGLE_ID=Clave del proyecto de Google para consumir sus Apis (Google Cloud)
```
```
2 - En express-server/uploads crear las carpetas users, hospitals y doctors
/express-server/uploads/users
/express-server/uploads/doctors
/express-server/uploads/hospitals
Para la persistencia de imagenes
```
```
3 - Dentro del directorio principal ejecutar: docker-compose up --build
```
