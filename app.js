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

    if(!foundClothes){

        return res.status(404).json(`Clothes with id ${clothesId} not exist`);

    }

    res.json(foundClothes);

});


app.post('/clothes',async (req, res)=>{

    const newClothes = req.body;

    const clothes = await fileService.reader();



})











app.listen(5000,()=>{

    console.log('Server listen 5000');

})


