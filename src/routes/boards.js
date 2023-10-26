"use strict";

const express = require('express');
const app = express();

//전역 세션
app.use(function (req, res, next) {
	//console.log("req.session.isLogin : ", req.session.isLogin);
	res.locals.isLogin = false;
	res.locals.loginInfo = "";
	res.locals.loginSeq = "0";
	res.locals.loginName = "";
	if(req.session.isLogin){
		res.locals.isLogin = req.session.isLogin;
		res.locals.loginInfo = req.session.loginInfo;
		res.locals.loginSeq = req.session.loginInfo.M_SEQ;
		res.locals.loginName = req.session.loginInfo.M_NAME;
	}
	
	res.locals.session = req.session;

	//메시지 창
	res.locals.alertMsg = req.session.alertMsg;
	delete req.session.alertMsg;
	next();
});

const boardsController = require('../controllers/boardsController');

const router = express.Router();

// router.get('/', (req, res) => {
// 	res.send({message: 'Hello board'});
// });

//####################게시판####################
//리스트
router.get('', boardsController.main1);
router.get('/', boardsController.main2);
router.get('/list', boardsController.list);

//읽기 - 조횟수 증가
router.get('/view/:id', boardsController.view);
//읽기
router.get('/read/:id', boardsController.readCnt);

//글 쓰기
router.get('/write', boardsController.write);
//글 쓰기 저장
router.post('/write', boardsController.writeProc);

//수정
router.get('/edit/:id', boardsController.edit);
//수정 저장
router.post('/edit/:id', boardsController.editProc);

//답변
router.get('/reply/:id', boardsController.reply);
//답변 저장
router.post('/reply/:id', boardsController.replyProc);

//삭제
//router.delete('/', (req, res) => {
//	console.log(req.body);
//});
router.get('/delete/:id', boardsController.deleteProc);

//첨부파일 다운로드
router.get('/attach/:id/:order', boardsController.fileDownload);
//첨부파일 삭제
router.get('/fileDelete/:id/:order', boardsController.fileDelete);
//####################게시판####################

//####################게시판 - 댓글####################
//댓글 저장
router.post('/commentWrite/:seq', boardsController.commentWriteProc);
//댓글 삭제
router.get('/commentDelete/:seq/:id', boardsController.commentDeleteProc);
//####################게시판 - 댓글####################

//####################게시판 - 좋아요####################
//좋아요
router.get('/good/:id', boardsController.goodLike);
//좋아요 취소
router.get('/goodCancel/:id', boardsController.goodLikeCancel);
//####################게시판 - 좋아요####################

module.exports = router;