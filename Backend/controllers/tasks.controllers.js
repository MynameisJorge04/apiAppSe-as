const { pool } = require("../db");

const getTasks = async (req, res) => {
  try {
    const query = "SELECT * FROM pokedex";
    const [rows, fields] = await pool.query(query); // Modificación: Desestructurar las filas y los campos

    res.status(200).json(rows); // Modificación: Enviar solo las filas como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { nombre, descripcion} = req.body; // Obtén los datos de la tarea del cuerpo de la solicitud

    const query = "INSERT INTO pokedex (nombre, descripcion) VALUES (?, ?)";
    await pool.query(query, [nombre, descripcion]); // Ejecuta la consulta SQL para insertar los datos en la tabla

    res.status(201).json({ message: "Formulario creada exitosamente" }); // Devuelve una respuesta de éxito
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const selectTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Obtén el ID de los parámetros de la solicitud

    const query = "SELECT * FROM pokedex WHERE id = ?";
    const tasks = await pool.query(query, [taskId]); // Ejecuta la consulta SQL para seleccionar la tarea correspondiente en la tabla

    if (tasks.length === 0) {
      res.status(404).json({ message: "Tarea no encontrada" }); // Si no se encontró ninguna tarea con el ID especificado, devuelve una respuesta de error
    } else {
      res.status(200).json(tasks[0]); // Devuelve la tarea seleccionada en la respuesta
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getTasks, createTask, selectTask };

