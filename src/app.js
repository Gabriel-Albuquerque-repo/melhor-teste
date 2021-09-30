const express = require('express');
// Carregando o model Phones
const Phones = require('./models/Phones');
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// Conectando ao db
const dbConnection = require('./database/dbConnection');
// Carregando as rotas
const cellRoute = require('./routes/cell-route');

app.use('/', cellRoute);


module.exports = app;