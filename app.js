const express = require('express');
const fs = require('fs/promises');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/cars", async (req, res) => {

    const users = await reader();

    res.status(201).json(users);

});


app.post('/cars', async (req, res) => {

    const carInfo = req.body;

    if (carInfo.model.length < 2 || typeof carInfo.model !== 'string') {

       return res.status(400).json('Wrong model!');

    }

    if (carInfo.year < 1998 || Number.isNaN(+carInfo.year)) {

        return res.status(400).json('Wrong year!');

    }

    const users =await reader();

    const user = {model:carInfo.model,year:carInfo.year, id: users[users.length - 1].id + 1};

    users.push(user);

    //Перезаписуємо маш оновлений масив в нашу базу даних
    await writer(users);

    res.status(201).json(user);

});


app.get('/cars/:carId', async (req, res) => {

    const {carId} = req.params;

    const users = await reader();

    const user = users.find(user => user.id === +carId);

    if (!user) {

        return res.status(404).json(`User with id ${carId} not exist`);

    }

    res.json(user);

});


app.put('/cars/:carId', async (req, res) => {

    const {carId} = req.params;

    const newUserInfo = req.body;

    const users =await reader();

    const index = users.findIndex((user) => user.id === +carId);

    if (index === -1) {

        return res.status(404).json(`User with id ${carId} not exist`);

    }

    users[index] = {...users[index], ...newUserInfo}

    await writer(users);

    res.status(201).json('Updated');

});


app.delete('/cars/:carId', async (req, res) => {

    const {carId} = req.params;

    const users =await reader();

    const index = users.findIndex((user) => user.id === +carId);

    if (index === -1) {

        return res.status(404).json(`User with id ${carId} not exist`);

    }

    users.splice(index, 1);

    await writer(users);

    res.sendStatus(204);

});


app.listen(5000, () => {

    console.log("Sever listen 5000");

});


const reader =async ()=>{

    const buffer = await fs.readFile(path.join(__dirname, 'carsDb', 'cars.json'));

    const stringBuffer = buffer.toString();

    return JSON.parse(stringBuffer);

}


const writer =async (users)=>{

    await fs.writeFile(path.join(__dirname, 'carsDb', 'cars.json'), JSON.stringify(users));

}