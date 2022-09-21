require('dotenv').config();

const express = require('express');
const mongo = require('./src/Helpers/mongo');
const routes = require('./src/Routes');

const app = express();
app.use(express.json());

app.use('/api', routes);

const port = 3000;


app.listen(port, async () => {
    await mongo.connect();
    console.log(`Example app listening on port ${port}`);
})