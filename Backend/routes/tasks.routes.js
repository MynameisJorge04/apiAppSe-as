const express = require('express');
const {
    getTasks,
    createTask,
    selectTask
} = require('../controllers/tasks.controllers');
const router = express.Router();

router.get('/pokemones', getTasks);

router.get('/pokemon/:id', selectTask);

router.post('/pokemones', createTask);


module.exports = router;
