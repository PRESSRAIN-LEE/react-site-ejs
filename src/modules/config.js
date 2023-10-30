//환경설정 파일 호출
const setConfig = require('./config');

//####################포인트 설정####################
//포인트 유효기간
exports.pointValidityDate = () => {
	return "10D";	//1년 - 단위는 Y,M,D,H...로 표시 
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