//환경설정 파일 호출
const setConfig = require('./config');

//####################포인트 설정####################
//포인트 유효기간
exports.pointValidityDate = () => {
	return "10D";	//년/월/일 - 단위는 Y,M,D,H...로 표시 
}

//만료일 계산 - 유효기간의 단위(Y/M/D)에 따라서 계산
exports.validityDate = (validityTerm) => {
	const validityTermUnit = validityTerm.slice(-1);
	const validityDate = parseInt(validityTerm.slice(0, (validityTerm.length - validityTermUnit.length)));

	const toDay = setConfig.getTimeStamp();
	const newDate = new Date(toDay);
	let expDate = null;

	switch(validityTermUnit){
		case "Y":
			newDate.setFullYear(newDate.getFullYear() + validityDate);
			expDate = newDate.toISOString().slice(0, 10);
			break;
		case "M":
			newDate.setMonth(newDate.getMonth() + validityDate);
			expDate = newDate.toISOString().slice(0, 10);
			break;
		case "D":
			newDate.setDate(newDate.getDate() + validityDate);
			expDate = newDate.toISOString().slice(0, 10);
			break;
		case "H":
			//유효기간이 시간단위 인것은 없으므로 pass
			break;
	}
	return expDate;

}

//회원가입 포인트 - 최초 한번
exports.memberJoinPoint = () => {
	return 100;
}

//로그인 포인트 - 1일 1회
exports.loginPoint = () => {
	return 10;
}

//출석 포인트 - 1일 1회
exports.attendPoint = () => {
	return 10;
}

//게시판 글쓰기 포인트
exports.boardPoint = () => {
	return 10;
}
//####################포인트 설정####################

//####################날짜 설정####################
//날짜 포멧
exports.getTimeStamp = () => {
	const d = new Date(); 

	let s =
	setConfig.leadingZeros(d.getFullYear(), 4) + '-' +
	setConfig.leadingZeros(d.getMonth() + 1, 2) + '-' +
	setConfig.leadingZeros(d.getDate(), 2); 

	return s;
}

exports.leadingZeros = (n, digits) => {
	var zero = '';
	n = n.toString(); 

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}

	return zero + n;
}
//####################날짜 설정####################