/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API shoudl return  const carsMockData*/
app.get('/cars', (req, res) => {
    res.json(carsMockData);
});

/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */
app.post('/cars', (req, res) => {
    const newCar = req.body;
    newCar.id = parseInt(newCar.id);
    const carExists = carsMockData.find(car => car.id === newCar.id);
    if (carExists) {
        res.sendStatus(500, 'Car already exists');
    } else {
        carsMockData.push(newCar);
        res.json(carsMockData);
    }
});


/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */
 app.put('/cars/:id', (req, res) => {
    // const { id } = req.params;
    const updatedCar = req.body;
    updatedCar.id = parseInt(updatedCar.id);
    const { id } = req.body;
    const carExists = carsMockData.find(car => car.id === updatedCar.id);
    if (!carExists) {
        res.sendStatus(500, 'No car with given id exist');
    } else {
        carsMockData = carsMockData.map(car => car.id === updatedCar.id ? updatedCar : car);
        res.json(carsMockData);
    }
});



/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/
app.delete('/cars/:id', (req, res) => {
    const { id } = req.params;
    const carExists = carsMockData.find(car => car.id === parseInt(id));
    if (!carExists) {
        res.sendStatus(404, 'No car with give id exists');
    } else {
        carsMockData = carsMockData.filter(car => car.id !== parseInt(id));
        res.json(carsMockData);
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});