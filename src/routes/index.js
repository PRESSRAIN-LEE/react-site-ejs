"use strict";

const express = require('express');
const app = express();

const indexesController = require('../controllers/indexesController');

const router = express.Router();

// router.get('/', (req, res) => {
// 	//res.send({message: 'Hello React EJB!'});
// });

router.get('/', indexesController.index);

module.exports = router;