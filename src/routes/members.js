"use strict";

const express = require('express');
const app = express();

const membersController = require('../controllers/membersController');

const router = express.Router();

const isAuth = (req, res, next) => {
	if(req.session.isLogin){
		next();
	}else{
		//res.redirect('/member/login');
		res.render('../views/member/login');
	}
}

// router.get('/login', (req, res) => {
// 	res.send({message: 'Hello Login!'});
// 	const flashMessages=req.flash("alertMsg", "alertMsg1");
// 	console.log("flashMessages1: ", flashMessages[0]);
// });

//로그인
router.get('/login', membersController.login);
//로그인 처리
router.post('/login', membersController.loginProc);

//아이디 찾기
router.get('/forgotId', membersController.forgotId);
//비번 - 초기화
router.get('/forgotPw', membersController.forgotPw);

//로그아웃
router.get('/logout', membersController.logout);

//회원가입
router.get('/join', membersController.join);
//회원가입 처리
router.post('/join', membersController.joinProc);

//회원가입 > 아이디 중복 체크
router.post('/join/dupId', membersController.dupId);

//마이페이지
router.get('/myPage', isAuth, membersController.myPage);

//내 정보
router.get('/myInfo', isAuth, membersController.myInfo);
//내 정보 수정 저장
router.post('/myInfo', isAuth, membersController.myInfoProc);

//회원탈퇴
router.get('/withdraw', isAuth, membersController.withdraw);
router.post('/withdraw', isAuth, membersController.withdrawProc);

module.exports = router;