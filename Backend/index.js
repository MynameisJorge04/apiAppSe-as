const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');
const indexRoutes = require('./routes/index.routes');
const taskRoutes = require('./routes/tasks.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use(indexRoutes);
app.use(taskRoutes);

// Servir la página HTML en la ruta raíz ('/')
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Hola el servidor esta corriendo`);
});
