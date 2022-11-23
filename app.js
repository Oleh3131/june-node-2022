const express = require('express');

const clubsRouter = require('./router/clubs.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err, req, res, next)=>{

    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
})

app.use('/clubs', clubsRouter);

app.listen(5000, () => {

    console.log('Server listen 5000');

});

