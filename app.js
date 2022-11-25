const express = require('express');
const mongoose = require('mongoose');
const configs = require('./config/config');
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

app.listen(configs.PORT, async () => {

    await mongoose.connect(`${configs.MONGO_URL}`);

    console.log(`Server listen ${configs.PORT}`);

});

