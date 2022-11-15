const express = require('express');

const app = express();

const userDb = require('./dataBase/users');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/users', (req, res) => {

    console.log('USERS EMDPOINT');

    //Не мона послати два response
    // res.json({user: 'Olejo'});

    //Приймає лише стрінгу
    // res.end('It is ok');

    // Приймає статус
    // res.status(402).json('It is ok');

    // Посилання файлику(вказуємо шлях до нашого файлу)
    // res.sendFile('./');


    res.json(userDb);

});


app.get('/users/:userId',(req, res)=>{

    console.log(req.params);

    const {userId} = req.params;

    res.json(userDb[userId]);

});


app.post('/users',(req, res)=>{

    const userInfo = req.body;

    userDb.push(userInfo);

    console.log(userInfo);

    res.status(201).json('Created');

});



app.put("/users/:userId",(req,res)=>{

    const newUserInfo = req.body;

    const userId = req.params.userId;

    userDb[userId] = newUserInfo;

    res.json('Updated');

})










app.listen(5000,()=>{

    console.log('Server listen 5000');

})

