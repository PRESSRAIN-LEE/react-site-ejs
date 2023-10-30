//환경설정 - 날짜
const setDate = require('../../modules/config');

//DB연결 설정
const mysqlConn = require('../../../db/DbConn')();
const db = mysqlConn.init();

//								"작업구분", M_SEQ, loginPoint, pointValidityDate
exports.fnPointInsert = function(WORK_TYPE, val1,	val2,		val3,) {
	//console.log("setDate: ", setDate.getTimeStamp());
	const toDay = setDate.getTimeStamp();
	let pointMemo, pointPart, pointType = "";
	
	const pointValidityDateUnit = val3.slice(-1);
	let pointValidityDate = parseInt(val3.slice(0, (val3.length - pointValidityDateUnit.length)));
	console.log("pointValidityDate: ", pointValidityDate);
	let expDate = "";
	
	const newDate = new Date(toDay);
	//newDate.setFullYear(newDate.getFullYear() + pointValidityDate);
	//date.setFullYear(date.getFullYear() + 1);
	//newDate.toISOString().substring(0,10);
	//console.log("newDate.getFullYear(): ", newDate.getFullYear());
	//console.log("toDay: ", toDay);
	//console.log("newDate: ", newDate);
	//console.log("newDate1: ", newDate.toISOString());
	//console.log("newDate2: ", newDate.toISOString().slice(0, 10));
	

	switch(pointValidityDateUnit){
		case "Y":
			newDate.setFullYear(newDate.getFullYear() + pointValidityDate);
			expDate = newDate.toISOString().slice(0, 10);
			break;
		case "M":
			newDate.setMonth(newDate.getMonth() + pointValidityDate);
			expDate = newDate.toISOString().slice(0, 10);
			break;
		case "D":
			newDate.setDate(newDate.getDate() + pointValidityDate);
			expDate = newDate.toISOString().slice(0, 10);
			break;
		case "H":
			//유효기간이 시간단위 인것은 없으므로 pass
			break;
	}
	console.log("expDate: ", expDate);

	switch(WORK_TYPE){
		case "LOGIN":		//로그인
			pointMemo = "로그인";
			pointPart = "1";
			pointType = "I";
			const pointSql = `SELECT COUNT(*) AS ROW_CNT FROM TBL_POINT WHERE M_SEQ = ? AND P_PART = ? AND DATE_FORMAT(P_DATE, '%Y-%m-%d') = ? `;	//회원/포인트종류(P_PART)/1일/1회
			const exec = db.query(pointSql, [val1, pointPart, toDay], (err, result) => {
				const pointExist = result[0].ROW_CNT;
				if(pointExist === 0){
					const pointInsertSql = `INSERT INTO TBL_POINT SET M_SEQ = ?, P_POINT = ?, P_EXP_DATE = ?, P_PART = ?, P_TYPE = ?, P_MEMO = ? ;`;
					db.query(pointInsertSql, [val1, val2, expDate, pointPart, pointType, pointMemo], (err, result) => {
						//console.log("A: ", exec.pointInsertSql);
						//console.log("err: ", err);
						//console.log("result: ", result);
						//db.end();
						//if (!err) return result[0];
						//if (err) return console.log(err);
						//callback(null, result);
					});
				}
			});
			break;
		case "ATTEND":	//출석
			break;
		default:;
	}
}
