// Imports
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const path = require('path');

const app = express();
const port = process.env.PORT || 4500

// Esta es la conexion con la base de datos
const { conexionDB } = require('./database');
conexionDB()

// Middlewares
// TODO: Implementar middlewares
//app.use(helmet())
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    return res.status(404).render('404');
})

// Starting the server
app.listen(port, () => console.log(`El servidor se encuentra en http://localhost:${port}`));