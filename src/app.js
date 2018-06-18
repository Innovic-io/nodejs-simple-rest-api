// http://localhost:3000/pets
// REST stands for Representational State Transfer

const express = require('express');
const bodyParser = require('body-parser');

const petRoutes = require('./pets/pets.router').Router;
const examinationsRoutes = require('./examinations/examinations.routes').Router;

const app = express();
app.use(bodyParser.json());

app.use('/pets', petRoutes);
app.use('/pets', examinationsRoutes);

app.listen(3000, () => console.log('Listening on port 3000!')); // eslint-disable-line
