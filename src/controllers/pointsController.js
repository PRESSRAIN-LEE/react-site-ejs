"use strict";

//DB연결 설정
const mysqlConn = require('../../db/DbConn')();
const db = mysqlConn.init();

//포인트
const insertPoint = require('../modules/point/pointSql');

//환경설정
const setConfig = require('../modules/config');

//리스트
exports.main1 = (req, res) => {
	//res.send("A");
	res.redirect("/point/list");
};
exports.main2 = (req, res) => {
	//res.send("B");
	res.redirect("list");
};
exports.list = (req, res) => {
	const memberSeq = req.session.M_SEQ;

	//오늘, 이달 1일, 이달 말일 구하기
	let date = new Date();
	let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
	lastDay = lastDay.toISOString().slice(0, 10);
	let firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1);
	let firstDay = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() + 1));
	firstDay = firstDay.toISOString().slice(0, 10);
	let today = new Date().toISOString().slice(0, 10);
	//console.log("today: ", today);
	//console.log("lastDay: ", lastDay.toISOString().slice(0, 10));

	let {searchText, page} = req.query;
	searchText = searchText ? searchText : "";
	page = page ? page : 1;

	const pageSize = 5;		//한페이지에 보여줄 리스트 row수
	const pageBlock = 5;	//한페이지에 보여줄 페이징 갯수

	let startLimit = 0;
	if (page === "" || page === undefined || typeof page === "undefined" || page === null) {
		startLimit = 0 * pageSize; // 1페이지는 무조건 0부터 시작
	}else{
		startLimit = (page - 1) * pageSize; // 1페이지는 무조건 0부터 시작
	}

	const sqlFrom = `TBL_POINT A INNER JOIN TBL_MEMBER B ON A.M_SEQ = B.M_SEQ `;
	const sqlWhere = `WHERE 1 = 1 AND A.M_SEQ = ? `;
	const sql = `SELECT * 
	, (
		SELECT CASE P_PART WHEN '1' THEN '로그인'
							WHEN '2' THEN '출석'
							WHEN '3' THEN '구매 포인트'
							WHEN '4' THEN '구매 사용'
							WHEN '89' THEN '탈퇴'
							WHEN '99' THEN '관리자'
		END) AS P_PART_VALUE
		, DATE_FORMAT(P_DATE, '%Y-%m-%d') AS P_DATE
	FROM ${sqlFrom} 
	${sqlWhere}
	AND P_EXP_DATE >= '${today}'
	ORDER BY P_SEQ DESC 
	LIMIT ?, ? ;

	SELECT COUNT(*) AS TOTAL_CNT 
	FROM  ${sqlFrom}
	${sqlWhere}
	AND P_EXP_DATE >= '${today}'
	; 
	
	SELECT SUM(P_POINT) AS SUM_POINT
	FROM  ${sqlFrom}
	${sqlWhere}
	AND P_EXP_DATE >= '${today}'
	;

	SELECT IFNULL(SUM(P_POINT), 0) AS VANISHING_POINT
	FROM  ${sqlFrom}
	${sqlWhere}
	AND P_EXP_DATE BETWEEN '${firstDay}' AND '${lastDay}'
	; `;

	const exec = db.query(sql, [memberSeq, startLimit, pageSize, memberSeq, memberSeq, memberSeq], (err, rows) => {
		if(err) throw err;
		try{
			const pageCount = Math.ceil(rows[1][0].TOTAL_CNT/pageSize);
			
			res.render("point/pointList", { rows: rows[0], totalCnt: rows[1][0].TOTAL_CNT, searchText: searchText
				, pagination: {
					pageSize: pageSize,
					pageBlock: pageBlock,
					pageCount: Number(pageCount),
					page: page,
					pageBlock: pageBlock,
				},
				sumPoint: rows[2][0].SUM_POINT,
				vanishingPoint: rows[3][0].VANISHING_POINT,
				pageTitle: "포인트"});
		}catch(e){
			console.log(e);
		}
	});
	//console.log("SQL: ", exec.sql);
};

//포인트 사용 & 적립
exports.pointProc = (req, res) => {
	const { pointAmount, pointMemo, pointPart } = req.body;
	const memberSeq = req.session.M_SEQ;
	const pointValidityDate = setConfig.pointValidityDate();
	const validityDate = setConfig.validityDate(pointValidityDate);

	//포인트
	//insertPoint.fnPointInsert("99", result[0].M_SEQ, loginPoint, pointValidityDate, "MEMO");
	//insertPoint.fnPointInsert(result[0].M_SEQ, "로그인", loginPoint, pointValidityDate, 1, "I");

	console.log("pointValidityDate:", pointValidityDate);
	console.log("validityDate: ", validityDate);
	//console.log(setConfig.validityDate());

	const sql = `INSERT INTO TBL_POINT SET M_SEQ = ?, P_POINT = ?, P_EXP_DATE = ?, P_PART = ?, P_TYPE = ?, P_MEMO = ? `;
	const exec = db.query(sql, [memberSeq, pointAmount, validityDate, pointPart, "I", pointMemo], (err, result) => {
		if(err) throw err;
		try{
			req.session.alertMsg = {
				type: 'success',
				intro: '[포인트 등록 성공]',
				message: '포인트가 등록되었습니다.',
			};
		}catch(e){
			console.log(e);
			req.session.alertMsg = {
				type: 'danger',
				intro: '[포인트 등록 에러]',
				message: '포인트 등록 중 오류가 발생하였습니다.',
			};
		}
		res.redirect(303, '/point/list');
	});
	//console.log("SQL: ", exec.sql);
};