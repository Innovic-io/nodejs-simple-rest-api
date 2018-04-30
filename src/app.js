//http://localhost:3000/pets
//REST stands for Representational State Transfer

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const pets = require('./pets.js');

app.get('/pets', function (req, res) {
    res.json(pets.pets);
});
app.get('/pets/:id', function (req, res) {
    console.log(req.params.id);
    const [item] = pets.pets.filter(value => value.id === parseInt(req.params.id));
    res.status(200).json(item);
});
app.delete('/pets/:id', function (req, res) {
    const item = pets.pets.splice(pets.pets.findIndex(value => value.id === req.params.id), 1);
    res.status(200).json(item);
});
app.post('/pets', function (req, res) {
    const properties = ["category", "name", "photoUrls", "tags", "status"];

    if (validateDTO(req.body, properties)) {
        const pet = req.body;
        pet.id = generateID();
        pets.pets.push(pet);
        res.status(201).json(pet);
    } else {
        res.sendStatus(400);
    }
});

/* DTO - data transfer object
* Checks if user-input data matches the expected properties.
* */
function validateDTO(reqBody, properties) {
    for (let element of properties) {
        if (!reqBody.hasOwnProperty(element)) {
            return false;
        }
    }
    return true;
}

function generateID() {
    return parseInt(Math.random() * 1000000000);
}

app.listen(3000, () => console.log('Listening on port 3000!'));
