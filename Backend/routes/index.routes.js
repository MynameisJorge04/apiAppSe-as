const express = require('express');
const { pool } = require('../db');

const router = express.Router();

router.get('/ping', async(req, res) =>{
    const result = await pool.query('SELECT 1 * 1 as nombre');
    console.log(result);
    res.json('ping');
})

module.exports = router;
