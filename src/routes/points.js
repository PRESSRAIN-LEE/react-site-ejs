"use strict";

const express = require('express');
const app = express();

const pointsController = require('../controllers/pointsController');

const router = express.Router();

const isAuth = (req, res, next) => {
	if(req.session.isLogin){
		next();
	}else{
		//res.redirect('/member/login');
		res.render('../views/member/login', {originalUrl: req.originalUrl});
	}
}

//포인트 리스트
router.get('', pointsController.main1);
router.get('/', pointsController.main2);
router.get('/list', isAuth, pointsController.list);

//포인트 사용 & 적립
router.post('/save', pointsController.pointProc);

module.exports = router;