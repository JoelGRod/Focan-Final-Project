# Basic Backend Template
* node.js - 14.15.0
* MongoDB - Mongo Atlas - mongoose
* express.js - 4.17.1
(See package.json for dependencies details)
```
Rebuild dependencies: npm install
```
```
Install nodemon global for development: sudo npm install -g nodemon
npm run start:dev
```

Create .env at the root with this info:
* PORT=listen port (3000 for Angular App integration)
* DB_CNN=mongodb+srv://user:password@cluster0.m8zru.mongodb.net/hospitaldb
* JWT_KEY=secret key
* GOOGLE_ID=your id project from google api project
* SECRET_GOOGLE=your secret from google api project