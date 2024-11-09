const express = require('express');
const morgan = require('morgan');
require("dotenv").config();



// Correct the import names
const tourRouter = require('./routes/tourRouters');
const userRouter = require('./routes/userRouters');

const app = express();



app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}.....`);
});


// 1) Middleware
if(process.env.NODE_ENV === 'DEVELOPMENT'){
    app.use(morgan('dev'));
}



app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log("Hello From Middleware");
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Use the correctly named variables here
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;