require('dotenv').config();
const connectDB = require('./config/db');

// Conecta ao MongoDB
connectDB();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api', routes);

// Rota de teste
app.get('/', (req, res) => {
  res.send({ message: 'API de Frete Online funcionando!' });
});

module.exports = app;
