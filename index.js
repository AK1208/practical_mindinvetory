require('dotenv').config();
require('./src/config/db.config');
const express = require('express');
const app = express();
const indexRoute = require('./src/index.route');

app.use(express.json());

app.use('/v1', indexRoute);

app.listen(process.env.PORT, () => {
    console.log(`App is running on port : ${process.env.PORT}`);
})