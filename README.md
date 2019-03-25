# CodeFoo-NodeJS

In this repository is a RESTful API that help two users send mesages to each other in real time. Using express, and socket.io, triggers on the postgres create notifications which and the content is sent to the front end.

This NodeJS project is already running on a private server inside a docker container along with a postgres instance.

**CodeFoo Programming questions in ./CodeFooProgrammingQuestions **

------------

#### To run 
###### If using docker
- Make sure that SERVER_IP_ADDRESS on line 3 in app.js is 'db' . This is for the docker-compose
- Create a new docker image using the Dockerfile in the root directory
- Download an image of postgres in docker
- Run docker-compose using the docker-compose.yml file
- Once the containers are running, execute the createTables.sql script to set up tables, functions and triggers.

###### If using local host
- Change SERVER_IP_ADDRESS on line 2 in app.js appropriately. You can choose to use the postgres instance that is already running on a private server or you can create your own.
- Run node app.js
- If you create your own postgres instance, execute the createTables.sql script to set up tables, functions and triggers.

------------



#### Things to improve on
- When setting up messages tables in postgres, figure out how to add a message id using sequences. Other tables have that implemented, but messages tables are created from a trigger of a new session and I still need to figure out how to give them their own sequence.
- Use rooms in SocketIO instead of different session id names as events
- Use NGINX to encrypt the NodeJS app
