"use strict";

//모듈
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');		//env
const session = require('express-session');

const app = express();
dotenv.config();

const port = process.env.PORT || 5002;
const secret = process.env.SESSION_SECRET || '시크릿 키';

//세션
app.use(session({
	//secret: process.env.SESSION_SECRET,
	secret: secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60 * 24		//1일
	}
}));

//전역 세션
app.use(function (req, res, next) {
	//console.log("req.session.isLogin : ", req.session.isLogin);
	res.locals.isLogin = false;
	res.locals.loginInfo = "";
	res.locals.loginSeq = "0";
	res.locals.loginName = "";
	res.locals.originalUrl = "";
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

const isAuth = (req, res, next) => {
	//console.log("req.originalUrl: ", req.originalUrl);
	if(req.session.isLogin){
		//console.log("A");
		next();
	}else{
		//console.log("B");
		//res.redirect('/member/login');
		res.render('member/login', {originalUrl: req.originalUrl});
	}
}

//라우팅
const mainRouter = require('./src/routes/index')
const memberRouter = require('./src/routes/members')
const boardRouter = require('./src/routes/boards')

//앱 세팅
app.use(express.static("public"));
app.set("views", __dirname + "/src/views/");
app.set("view engine", "ejs");

//parsing 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//라우터
app.use('/', mainRouter);
app.use('/member', memberRouter);
app.use('/board', isAuth, boardRouter);

//DB연결 설정
// const mysqlConn = require('./db/DbConn')();
// const db = mysqlConn.init();
// db.connect((err) =>{
// 	//console.error(err);
// 	//if(err) throw err;
// 	// if (err) {
// 	// 	console.error("[MYSQL] Error on Connection: " + err);
// 	// 	return;
// 	// }
// 	console.log('Connected AS ID ' + db.threadId);
// });

app.listen(port, () => console.log(`ejb_서버 시작 port ${port}`));
