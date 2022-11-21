const express = require('express');

require('dotenv').config();

const clothesRouter = require('./router/clothes.router');

// const config = require('./config/config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message:err.message || 'Unknown error',
        status:err.status || 500
    });

});

app.use('/clothes', clothesRouter);


// app.listen(process.env.PORT, () => {
//     console.log(`Server listen ${process.env.PORT}`);
// });

// app.listen(config.PORT, () => {
//     console.log(`Server listen ${config.PORT}`);
// });



app.listen(5000, () => {
    console.log('Server listen 5000');
});


