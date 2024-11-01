const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = require('./app');
const { json } = require('express');

dotenv.config({path :'./config.env'})


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() =>console.log("DB concoction successful!"));


// console.log(process.env);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}.....`);
});
