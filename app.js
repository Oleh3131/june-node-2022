const express = require('express');

const app = express();

const carsDb = require('./carsDb/cars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/cars", (req, res) => {

    res.status(201).json(carsDb);

    console.log('Data received')

});


app.get('/cars/:carId', (req, res) => {

    const carId = +req.params.carId;

    if (typeof carId === "number") {

        const car = carsDb.find((car, index) => {

            if (index === carId) {

                return car;

            }
        });

        if (car) {

            res.json(car);

        } else {

            res.json('Car not found');

        }
    } else {

        res.json('Value is not a number');

    }
});


app.post('/cars', (req, res) => {

    const carInfo = req.body;

    if(typeof carInfo["model"] !== "undefined" && typeof carInfo["year"] !== "undefined"){

        carsDb.push(carInfo);

        res.status(201).json('Created');

    } else {

        res.json('These properties do not exist');

    }
});


app.put('/cars/:carId', (req, res) => {

    const carId = +req.params.carId;

    if (typeof carId === "number") {

        let car = carsDb.find((car, index) => {

            if (index === carId) {
                return car;
            }
        });

        if (car) {

            const newCarInfo = req.body;

            if(typeof newCarInfo["model"] !== "undefined" && typeof newCarInfo["year"] !== "undefined"){

                carsDb[carId] = newCarInfo;

                res.json('Updated');

            } else {

                res.json('These properties do not exist');

            }
        } else {

            res.json('Car not found');

        }
    } else {

        res.json('Value is not a number');

    }
});


app.delete('/cars/:carId', (req, res) => {

    const carId = +req.params.carId;

    if (typeof carId === "number") {

        const car = carsDb.find((car, index) => {

            if (index === carId) {

                return car;

            }
        });

        if (car) {

            carsDb.splice(carId, 1);

            res.status(201).json('Deleted');

        } else {

            res.json('Car not found');

        }
    } else {

        res.json('Value is not a number');

    }
});


app.listen(5000, () => {

    console.log("Sever listen 5000");

});