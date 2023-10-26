"use strict";

const express = require('express');
const app = express();

const membersController = require('../controllers/membersController');

const router = express.Router();

// router.get('/login', (req, res) => {
// 	res.send({message: 'Hello Login!'});
// });

//로그인
router.get('/login', membersController.login);
router.post('/login', membersController.loginProc);

//회원가입
router.get('/join', membersController.join);
router.get('/joinProc', membersController.joinProc);

module.exports = router;