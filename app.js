const express = require('express');
const bodyParser = require('body-parser');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const path = require('path');

// Configuration for mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Creeds:Creeds2.0@saleobject.0bpslm9.mongodb.net/?retryWrites=true&w=majority&appName=saleObject',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à mongoDB réussie !'))
.catch(() => console.log('Connexion à mongoDB échouée !'));

const app = express();

// Avec ceci, Express prend toutes les requêtes qui ont 
// comme Content-Type  application/json  et met à disposition leur  body
// app.use(express.json());

//CORS Configuratin
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Avec ceci, Express prend toutes les requêtes qui ont 
// comme Content-Type  application/json  et met à disposition leur  body
app.use(bodyParser.json());

// Middlewares
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
// Cela indique à Express qu'il faut gérer la ressource  images de
// manière statique (un sous-répertoire de notre répertoire de base, __dirname
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;