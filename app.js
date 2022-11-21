const express = require('express');

const {fileService} = require("./services");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/clothes', async (req, res) => {

    const clothes = await fileService.reader();

    res.status(201).json(clothes);

});

app.get('/clothes/:clothesId', async (req, res) => {

    const {clothesId} = req.params;

    const clothes = await fileService.reader();

    const foundClothes = clothes.find(someType => someType.id === +clothesId);

    if (!foundClothes) {

        return res.status(404).json(`Clothes with id ${clothesId} not exist`);

    }

    res.json(foundClothes);

});


app.post('/clothes', async (req, res) => {

    const createdClothes = req.body;

    const clothes = await fileService.reader();

    const newClothes = {
        id: clothes[clothes.length - 1].id + 1,
        type: createdClothes.type,
        price: createdClothes.price
    }

    clothes.push(newClothes);

    await (fileService.writer(clothes));

    res.status(201).json(newClothes);

});


app.put('/clothes/:clothesId', async (req, res) => {

    const {newClothes} = req.body;

    const {clothesId} = req.params;

    const clothes = await fileService.reader();

    const index = clothes.findIndex((someClothes) => someClothes.id === +clothesId);

    if (index === -1) {

        return res.status(404).json(`Clothes with id ${clothesId} not exist`);

    }

    clothes[index] = {...clothes[index], ...newClothes};

    await fileService.writer(clothes);

    res.status(201).json('Updated');

});

app.delete('/clothes/:clothesId',async (req, res)=>{

    const {clothesId} = req.params;

    const clothes = await fileService.reader();

    const index = clothes.findIndex((someClothes) => someClothes.id === +clothesId);

    if (index === -1) {

        return res.status(404).json(`Clothes with id ${clothesId} not exist`);

    }


    clothes.splice(index, 1);

    await fileService.writer(clothes);

    res.sendStatus(204);

})


app.listen(5000, () => {

    console.log('Server listen 5000');

})


