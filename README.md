# NodeJS Simple REST API
This project is an example of implentation of REST API in NodeJS framework with express library. 

Project implements all REST concepts: 
- proper HTTP status code in responses
- proper error message
- RESTful routing
- quering data through URL (filtering and sorting)

Project uses:
- ES6
- eslint
- prettier
- nodemon, as development server
- unit tests as system verification

## Installation instruction
```npm
npm install
```

## Run instruction
```npm 
npm start
```

## Postman collection

https://www.getpostman.com/collections/3faa73530a21e02e081a

## Formatting and linting instruction
```
npm run format
npm run eslint
```

## Routes

Get all pets sorted by ID and filtered by name Dog
[GET] **http://localhost:3000/pets?sort=id&name=Dog**

Get single pet by ID
[GET] **http://localhost:3000/pets/1622147641**

Delete single pet by ID
[DELETE] **http://localhost:3000/pets/1622147641**

## Credits

Ivana Fustar <ivanafustar@hotmail.com>
