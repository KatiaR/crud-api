# crud-api
Task is to implement simple CRUD API using in-memory database underneath.

    "start": "node dist/server.js",
    "build": "tsc",
    "start:dev": "nodemon src/server.ts",
    "start:prod": "npm run build && node dist/server.js"

To test it, it is necessary to:
npm run start 
open postman
select  (get, post, put, delete) method
indicate 
http://localhost:3000/users
http://localhost:3000/users/id
http://localhost:3000/someUnknown

All info about created users stored in src/users.json
all changes will be displayed in this file

to build - npm run build
different mods

npm run start:dev or npm run  start:prod
