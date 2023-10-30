//let boarddCommon = {};

//DB연결 설정
const mysqlConn = require('../../../db/DbConn')();
const db = mysqlConn.init();

exports.fnInsert = function(val1, val2, val3) {
	const historySql = `INSERT INTO TBL_BOARD_HISTORY SET B_SEQ = ?, M_SEQ = ?, BH_WORK = ? ;`;
	const exec = db.query(historySql, [val1, val2, val3], (err, result) => {
		//console.log("A: ", exec.historySql);
		//console.log("err: ", err);
		//console.log("result: ", result);
		//con.release();
		if (err) return console.log(err);
		//callback(null, result);
	});
}

// module.exports = function (val1, val2, val3) {
// 	return {
// 	  select: function(callback){
// 		pool.getConnection(function(err, con){
// 			const historySql = `INSERT INTO TBL_BOARD_HISTORY SET B_SEQ = ?, M_SEQ = ?, BH_WORK = ? ;`;
// 		  	con.query(historySql, [val1, val2, val3], function (err, result, fields) {
// 			con.release();
// 			if (err) return callback(err);
// 			callback(null, result);
// 		  });
// 		});
// 	  },
// 	  pool: pool
// 	}
//   };