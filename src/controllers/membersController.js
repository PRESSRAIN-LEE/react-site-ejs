"use strict";

const bcrypt = require('bcrypt');

//DB연결 설정
const mysqlConn = require('../../db/DbConn')();
const db = mysqlConn.init();

//로그인
exports.login = (req, res) => {
	//console.log(req.originalUrl);
	//req.flash('success','성공메시지');
	const flashMessages=req.flash('success');
	console.log("flashMessages: ", req.flash("loginMessage"));

	res.render('member/login', {pageTitle: "로그인", flashMessages});
	//req.flash({"flashMessages":"성공메시지"}); //res.locals.flashMessages.success= "성공메시지"
};

//로그인 처리
exports.loginProc = (req, res) => {
	//res.render('member/loginProc', {pageTitle: "로그인"});
	const { memberID, memberPass, returnUrl } = req.body;
	
	// if(!req.session){
	// 	//req.session = {}
	// }

	const sql = `SELECT * 
	FROM TBL_MEMBER
	WHERE 1 = 1 
	AND M_AUTH = 1 
	AND M_ID = ?`;
	db.query(sql, [memberID], (err, result) => {
		//if(err) return res.json({err, Message: "Error"});
		if(err){
			req.session.alertMsg = {
				type: 'danger',
				intro: 'ERROR',
				message: '에러가 발생하였습니다.',
			};
		}
		if(result.length > 0){
			const isMatch = bcrypt.compareSync(memberPass, result[0].M_PASS);
			if(isMatch){
				//console.log("session1 : ", req.session);
				// if(req.session.authenticated){
				// 	res.json(req.session);
				// }else{
				// 	//
				// }
				req.session.isLogin = true;
				req.session.loginInfo = result[0];
				req.session.M_SEQ = result[0].M_SEQ;
				req.session.M_NAME = result[0].M_NAME;
				// req.session.loginInfo = {
				// 	myInfo: result[0]
				// }
				
				//console.log("session2 : ", req.session.M_NAME);
				//console.log("result : ", req.session.isLogin);
				//console.log("result : ", res.json(req.session).isLogin);
				
				//res.render('../views/home', {login: result[0], isLogin: true});
				if(returnUrl){
					//res.send(`<script>alert('로그인 되었습니다.');location.href='${returnUrl}'</script>`);
					res.send(`<script>location.href='${returnUrl}'</script>`);
				}else{
					//res.send(`<script>alert('로그인 되었습니다.');location.href='/'</script>`);
					res.send(`<script>location.href='/'</script>`);
				}
				
				//res.redirect('/');
				//return res.json({Login: true, M_SEQ: req.session.M_SEQ, M_NAME: req.session.M_NAME});

				// if(!err){
				// 	res.render('edit-user', { rows });
				// }else{
				// 	console.log(err);
				// }
			}else{
				req.session.alertMsg = {
					type: 'warning',
					intro: 'WARNING',
					message: '비밀번호가 일치하지 않습니다.',
				};
				// const alertMsg = {
				// 	type: 'warning',
				// 	intro: 'WARNING',
				// 	message: '비밀번호가 일치하지 않습니다.',
				// };

				//const flashMessages=req.flash("alertMsg");
				//console.log("flashMessages1: ", flashMessages);
				//req.flash('flashMessages', 'flash 메시지');

				//req.flash('message', 'flash 메시지'); //저장
				//console.log("비밀번호 불일치");
				//res.render('member/login', {flashMessages: req.flash() });
				res.redirect('/member/login');
				// return res.json({
				// 	loginSuccess: false,
				// 	message: "비밀번호가 일치하지 않습니다."
				// });
			}
		}else{
			req.session.alertMsg = {
				type: 'warning',
				intro: 'WARNING',
				message: '아이디가 일치하지 않습니다.',
			};
			//return res.json({Login: false});
			//console.log("아이디 불일치");
			res.redirect(303, '/member/login');
			// return res.json({
			// 	loginSuccess: false,
			// 	message: "아이디가 일치하지 않습니다."
			// });
		}
	});
};

//아이디 찾기
exports.forgotId = (req, res) => {
	res.send("forgotId");
};

//비번 분실
exports.forgotPw = (req, res) => {
	res.send("forgotPw");
};


//로그아웃
exports.logout = (req, res) => {
	req.session.destroy();
	//res.redirect("/")
	res.send("<script>alert('로그아웃 되었습니다.');location.href='/member/login'</script>");
};

//회원가입
exports.join = (req, res) => {
	res.render('member/join', {pageTitle: "회원가입"});
};

//회원가입 > 아이디 중복 체크
exports.dupId = (req, res) => {
	//res.send("dupId");
	const {memberId} = req.body;
	const sql = 'SELECT COUNT(*) AS count FROM TBL_MEMBER WHERE M_ID = ? ';
	db.query(sql, [memberId], (err, result) => {
		if(!err){
			const count = result[0].count;
			const idExists = count > 0;
			res.json({ idExists })
		}else{
			console.log(err);
		}
	});
};

//회원가입 처리
exports.joinProc = (req, res) => {
	//res.render('member/joinProc', {pageTitle: "회원가입"});
	const { memberName, memberId, memberPw, memberMail } = req.body;

	// hash
	//const PW = 'abcd1234'
	//bcrypt.hash(memberPw, 10, (err, encryptedPW) => {
	//callback
	//	console.log("encryptedPW1: ", encryptedPW);
	//})
	//console.log("encryptedPW2: ", encryptedPW);
	// hashSync
	//const PW = 'abcd1234';
	const encryptedPW = bcrypt.hashSync(memberPw, 10); //비밀번호 암호화
	//console.log("encryptedPW3: ", encryptedPW);

	///////////////////////////////////////////
	//const encryptedPW = bcrypt.hashSync(PW, 10);

	//const same = bcrypt.compareSync(memberPw, encryptedPW);
	//console.log("encryptedPW4: ", same); // same = true

	let joinCnt = 0;
	const sqlDup = "SELECT COUNT(*) JOIN_COUNT FROM TBL_MEMBER WHERE M_ID = ? ";
	db.query(sqlDup, [memberId], (err, result, next) => {
		//console.log("완료:", result[0].JOIN_COUNT);
		if(!err){
			joinCnt = result[0].JOIN_COUNT;
			//res.send(joinCnt);
			//res.render("../views/member/join", {joinCnt});
			//console.log("완료1:", joinCnt);

			//let salt = Math.round((new Date().valueOf() * Math.random())) + "";
			//let hashPassword = bcrypt.createHash("sha512").update(memberPw + salt).digest("hex");
			//console.log("hashPassword: ", hashPassword);

			if(joinCnt === 0){
				const sql = `INSERT INTO TBL_MEMBER SET M_ID = ?, M_PASS = ?, M_NAME = ?, M_MAIL = ? `
				db.query(sql, [memberId, encryptedPW, memberName, memberMail], (err, rows, next) => {
					if(!err){
						//res.redirect('/');
						console.log("완료2:", rows);
					}else{
						console.log(err);
					}
					//console.log("완료:", rows);
				});
			}else{
				res.render("../views/member/join", {result});
			}
		}
	});
};

//마이페이지
exports.myPage = (req, res) => {
	res.send("myPage");
};

//마이페이지 - 내 정보 수정
exports.myInfo = (req, res) => {
	//res.render("../views/member/myInfo");
	const mSeq = req.session.M_SEQ;
	const sql = `SELECT * 
	FROM TBL_MEMBER
	WHERE 1 = 1 
	AND M_SEQ = ?`;
	db.query(sql, [mSeq], (err, result, next) => {
		if(!err){
			res.render('../views/member/myInfo', { result: result[0] });
		}else{
			console.log(err);
		}
	});
};

//마이페이지 - 내 정보 수정 저장
exports.myInfoProc = (req, res) => {
	//res.send("myInfoProc");
	const mSeq = req.session.M_SEQ;
	const { memberName, memberPw, memberMail } = req.body;
	//console.log("memberPw: ", memberPw);
	const encryptedPW = bcrypt.hashSync(memberPw, 10); //비밀번호 암호화
	
	const sql = `UPDATE TBL_MEMBER SET M_PASS = ?, M_NAME = ?, M_MAIL = ? 
	WHERE M_SEQ = ? `
	db.query(sql, [encryptedPW, memberName, memberMail, mSeq], (err, result, next) => {
		if(!err){
			//res.redirect('/member/myInfo');
			req.session.alertMsg = {
				type: 'success',
				intro: '[회원정보 수정]',
				message: '회원정보가 수정되었습니다.',
			};
		}else{
			console.log(err);
			req.session.alertMsg = {
				type: 'danger',
				intro: '[ERROR]',
				message: '에러가 발생하였습니다.\n다시 시도 하세요',
			};

		}
		res.redirect(303, '/member/myInfo');
		console.log("완료:", result);
	});
};

//회원탈퇴 페이지
exports.withdraw = (req, res) => {
	const mSeq = req.session.M_SEQ;
	const sql = `SELECT * 
	FROM TBL_MEMBER
	WHERE 1 = 1 
	AND M_SEQ = ?`;
	db.query(sql, [mSeq], (err, result, next) => {
		if(!err){
			res.render('../views/member/withdraw', { result: result[0] });
		}else{
			console.log(err);
		}
	});
};

//회원탈퇴 처리
exports.withdrawProc = (req, res) => {
	const { memberSeq, memberId, withdrawReason } = req.body;

	const sql = `UPDATE TBL_MEMBER SET M_AUTH = 0, M_WITHDRAWAL_DATE = now(), M_WITHDRAWAL_REASON = ? 
	WHERE M_SEQ = ? `
	db.query(sql, [withdrawReason, memberSeq], (err, result, next) => {
		if(!err){
			req.session.destroy();
			res.send("<script>alert('탈퇴 되었습니다.');location.href='/'</script>");
		}else{
			console.log(err);
			req.session.alertMsg = {
				type: 'danger',
				intro: '[ERROR]',
				message: '에러가 발생하였습니다.<br/>다시 시도 하세요',
			};
			res.redirect(303, '/member/withdraw');
		}
	});
};
